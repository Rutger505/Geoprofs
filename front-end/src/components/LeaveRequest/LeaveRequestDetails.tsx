import { LeaveRequest as LeaveRequestType } from "@/types/leaveRequest";
import { format } from "date-fns";
import { Check, Clock, X } from "lucide-react";

interface LeaveRequestProps {
  request: LeaveRequestType;
}

const StatusIcon = ({
  status,
}: {
  status: "accepted" | "denied" | "pending";
}) => {
  const icons = {
    accepted: <Check className="h-4 w-4 text-green-500" />,
    denied: <X className="h-4 w-4 text-red-500" />,
    pending: <Clock className="h-4 w-4 text-yellow-500" />,
  };
  return icons[status];
};

const StatusText = ({
  status,
}: {
  status: "accepted" | "denied" | "pending";
}) => {
  const statusMap = {
    accepted: "Geaccepteerd",
    denied: "Geweigerd",
    pending: "In afwachting",
  };
  return <span>{statusMap[status]}</span>;
};

export function LeaveRequest({ request }: Readonly<LeaveRequestProps>) {
  const formatDateRange = (start: Date, end: Date) => {
    const startDate = format(start, "d MMM");
    const endDate = format(end, "d MMM");
    return `${startDate} t/m ${endDate}`;
  };

  return (
    <div className="w-full max-w-md">
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">{request.category.name}</span>
          <div className="flex items-center gap-1 text-sm">
            <StatusIcon status={request.status} />
            <StatusText status={request.status} />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {formatDateRange(request.startDate, request.endDate)}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Bericht: {request.reason}</span>
          <button className="text-gray-500 hover:text-gray-700">
            Verberg bericht ∨
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
