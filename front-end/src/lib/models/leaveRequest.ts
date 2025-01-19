"use server";
import axios from "@/lib/axios";
import {
  differenceInBusinessDays,
  differenceInHours,
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

function getLeaveDuration(start: Date, end: Date): number {
  if (isSameDay(start, end)) {
    return differenceInHours(end, start);
  }

  return differenceInBusinessDays(end, start) * 8;
}

export async function getUsersLeaveRequests(
  userId: string,
): Promise<LeaveRequest[]> {
  const leaveRequestsResposne = await axios.get<
    Omit<LeaveRequest[], "durationHours">
  >(`/leave/${userId}`);

  return leaveRequestsResposne.data
    .map((leaveRequest) => ({
      ...leaveRequest,
      startDate: new Date(leaveRequest.startDate),
      endDate: new Date(leaveRequest.endDate),
      updatedAt: leaveRequest.updatedAt
        ? new Date(leaveRequest.updatedAt)
        : null,
    }))
    .map((leaveRequest) => ({
      ...leaveRequest,
      durationHours: getLeaveDuration(
        leaveRequest.startDate,
        leaveRequest.endDate,
      ),
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
    startDate,
    endDate,
    reason,
    categoryId,
  });
}
