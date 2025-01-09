import { auth } from "@/lib/auth";
import axios from "@/lib/axios";

export type LeaveRequestStatus = "accepted" | "denied" | "pending";

export interface LeaveRequestCategory {
  id: number;
  name: string;
}

export interface LeaveRequest {
  id: number;
  status: LeaveRequestStatus;
  reason: string;
  startDate: Date;
  endDate: Date;
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

export async function getUsersLeaveRequests() {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const leaveRequestsResposne = await axios.get<LeaveRequest[]>(
    `/leave/leave-requests?userId=${session.user.id}`,
  );
  const leaveRequests = leaveRequestsResposne.data;
}
