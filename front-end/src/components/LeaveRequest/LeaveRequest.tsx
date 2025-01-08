import { LeaveRequestDetails } from "@/components/LeaveRequest/LeaveRequestDetails";
import { LeaveRequest as LeaveRequestType } from "@/types/leaveRequest";
import { differenceInHours, format, isSameDay } from "date-fns";
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
    if (isSameDay(start, end)) {
      return `${format(start, "d MMM")} ${differenceInHours(end, start)} uur`;
    }

    const startDate = format(start, "d MMM");
    const endDate = format(end, "d MMM");
    return `${startDate} t/m ${endDate}`;
  };

  return (
    <div className="w-80 rounded-lg border">
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{request.category.name}</span>

          <div className="flex items-center gap-1 text-sm">
            <StatusIcon status={request.status} />
            <StatusText status={request.status} />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {formatDateRange(request.startDate, request.endDate)}
        </div>

        <LeaveRequestDetails request={request} />
      </div>
    </div>
  );
}

export default LeaveRequest;
