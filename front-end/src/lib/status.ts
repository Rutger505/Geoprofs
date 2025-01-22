import { LeaveRequestStatus } from "@/lib/models/leaveRequest";

export function getStatusTranslation(status: LeaveRequestStatus) {
  const statusMap = {
    accepted: "Geaccepteerd",
    denied: "Geweigerd",
    pending: "In afwachting",
  };
  return statusMap[status];
}
