import { LeaveRequestDetails } from "@/components/LeaveRequest/LeaveRequestDetails";
import { StatusIcon } from "@/components/LeaveRequest/StatusIcon";
import {
  getStatusTranslation,
  LeaveRequest as LeaveRequestType,
} from "@/types/leaveRequest";
import { differenceInHours, format, isSameDay } from "date-fns";

interface Props {
  request: LeaveRequestType;
}

export function LeaveRequest({ request }: Readonly<Props>) {
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
            <span>{getStatusTranslation(request.status)}</span>
          </div>
        </div>

        <div className="text-sm">
          {formatDateRange(request.startDate, request.endDate)}
        </div>

        <LeaveRequestDetails request={request} />
      </div>
    </div>
  );
}

export default LeaveRequest;
