"use server";
import axios from "@/lib/axios";
import { getUserSection } from "@/lib/models/section";
import { User } from "@/types/user";
import {
  differenceInBusinessDays,
  differenceInHours,
  format,
  isSameDay,
} from "date-fns";

export type LeaveRequestStatus = "accepted" | "denied" | "pending";

export interface LeaveRequestCategory {
  id: number;
  name: string;
  isPaidLeave: boolean;
}

export interface LeaveRequest {
  id: number;
  status: LeaveRequestStatus;
  reason: string;
  startDate: Date;
  endDate: Date;
  durationHours: number;
  category: LeaveRequestCategory;
  updatedAt: Date | null;
}

interface UserWithLeaveRequests extends User {
  leave: LeaveRequest[];
}

function getLeaveDuration(start: Date, end: Date): number {
  if (isSameDay(start, end)) {
    return differenceInHours(end, start);
  }

  return differenceInBusinessDays(end, start) * 8;
}

function mapLeaveRequestDates(
  leaveRequest: Omit<LeaveRequest, "durationHours">,
): LeaveRequest {
  // First convert the dates to ensure we're working with Date objects
  const startDate = new Date(leaveRequest.startDate);
  const endDate = new Date(leaveRequest.endDate);

  return {
    ...leaveRequest,
    startDate,
    endDate,
    updatedAt: leaveRequest.updatedAt ? new Date(leaveRequest.updatedAt) : null,
    durationHours: getLeaveDuration(startDate, endDate),
  };
}

export async function getUsersLeaveRequests(
  userId: string,
): Promise<LeaveRequest[]> {
  const leaveRequestsResponse = await axios.get<
    Omit<LeaveRequest[], "durationHours">
  >(`/leave/${userId}`);

  return leaveRequestsResponse.data.map(mapLeaveRequestDates);
}

export async function getSectionManagerLeaveRequests(
  userId: string,
): Promise<UserWithLeaveRequests[]> {
  const section = await getUserSection(userId);

  const leaveRequestsResponse = await axios.get<UserWithLeaveRequests[]>(
    `/sections/leave/${section.id}`,
  );

  // Map each user and their leave requests
  return leaveRequestsResponse.data.map((user) => ({
    ...user,
    leave: user.leave.map(mapLeaveRequestDates),
  }));
}

export async function createLeaveRequest(
  userId: string,
  startDate: Date,
  endDate: Date,
  reason: string,
  categoryId: number,
) {
  await axios.post("/leave", {
    userId,
    startDate: format(startDate, "dd-MM-yyyy"),
    endDate: format(endDate, "dd-MM-yyyy"),
    reason,
    categoryId,
  });
}

export async function acceptLeaveRequest(leaveRequestId: number) {
  await axios.put(`/leave/${leaveRequestId}`, {
    status: "accepted",
  });
}

export async function denyLeaveRequest(leaveRequestId: number) {
  await axios.put(`/leave/${leaveRequestId}`, {
    status: "denied",
  });
}
