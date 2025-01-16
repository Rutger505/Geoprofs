import { auth } from "@/lib/auth";
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

export function getStatusTranslation(status: LeaveRequestStatus) {
  const statusMap = {
    accepted: "Geaccepteerd",
    denied: "Geweigerd",
    pending: "In afwachting",
  };
  return statusMap[status];
}

function getLeaveDuration(start: Date, end: Date): number {
  if (isSameDay(start, end)) {
    return differenceInHours(end, start);
  }

  return differenceInBusinessDays(end, start) * 8;
}

export async function getUsersLeaveRequests(): Promise<LeaveRequest[]> {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const leaveRequestsResposne = await axios.get<
    Omit<LeaveRequest[], "durationHours">
  >(`/leave/${session.user.id}`);

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
