"use server";

import axios from "@/lib/axios";
import { getUserProject, getUserSection } from "@/lib/models/user";
import { mapLeaveRequestDates } from "@/lib/util";
import { format } from "date-fns";

export type LeaveRequestStatus = "accepted" | "denied" | "pending";

export interface LeaveRequestCategory {
  id: number;
  name: string;
  isPaidLeave: boolean;
}

export interface LeaveRequest {
  id: number;
  userId: string;
  status: LeaveRequestStatus;
  reason: string;
  startDate: Date;
  endDate: Date;
  durationHours: number;
  category: LeaveRequestCategory;
  updatedAt: Date | null;
}

export async function getUsersLeaveRequests(
  userId: string,
): Promise<LeaveRequest[]> {
  const leaveRequestsResponse = await axios.get<
    Omit<LeaveRequest[], "durationHours">
  >(`/leave/${userId}`);

  return leaveRequestsResponse.data
    .map(mapLeaveRequestDates)
    .sort(sortLeaveRequestsByDate);
}

export async function getSectionManagerLeaveRequests(
  userId: string,
): Promise<LeaveRequest[]> {
  const section = await getUserSection(userId);

  if (!section) {
    return [];
  }

  const leaveRequestsResponse = await axios.get<LeaveRequest[]>(
    `/sections/leave/${section.id}`,
  );

  return leaveRequestsResponse.data
    .map(mapLeaveRequestDates)
    .sort(sortLeaveRequestsByDate);
}

export async function getProjectManagerLeaveRequests(
  userId: string,
): Promise<LeaveRequest[]> {
  const project = await getUserProject(userId);

  if (!project) {
    return [];
  }

  const leaveRequestsResponse = await axios.get<LeaveRequest[]>(
    `/projects/leave/${project.id}`,
  );

  return leaveRequestsResponse.data
    .map(mapLeaveRequestDates)
    .sort(sortLeaveRequestsByDate);
}

export async function acceptedLeaveRequest(leaverequest: LeaveRequest) {
  return leaverequest.status === "accepted";
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

function sortLeaveRequestsByDate(a: LeaveRequest, b: LeaveRequest) {
  return a.startDate.getTime() - b.startDate.getTime();
}
