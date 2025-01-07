type LeaveRequestStatus = "accepted" | "denied" | "pending";

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
  createdAt: Date;
  updatedAt: Date;
}
