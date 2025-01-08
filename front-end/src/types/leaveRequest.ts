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
