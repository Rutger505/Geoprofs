import { LeaveRequest } from "@/lib/models/leaveRequest";
import {
  differenceInBusinessDays,
  differenceInHours,
  isSameDay,
} from "date-fns";

export function getLeaveDuration(start: Date, end: Date): number {
  if (isSameDay(start, end)) {
    return differenceInHours(end, start);
  }

  return differenceInBusinessDays(end, start) * 8;
}

export function mapLeaveRequestDates(
  leaveRequest: Omit<LeaveRequest, "durationHours">,
): LeaveRequest {
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
