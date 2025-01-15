import { LeaveRequestStatus } from "@/lib/models/leaveRequest";
import { Check, Clock, X } from "lucide-react";

export function StatusIcon({ status }: { status: LeaveRequestStatus }) {
  const icons = {
    accepted: <Check className={"h-4 w-4 text-green-500"} />,
    denied: <X className={"h-4 w-4 text-red-500"} />,
    pending: <Clock className={"h-4 w-4 text-yellow-500"} />,
  };
  return icons[status];
}
