import { LeaveRequestActions } from "@/components/LeaveRequest/LeaveRequestActions";
import { LeaveRequestDetails } from "@/components/LeaveRequest/LeaveRequestDetails";
import { StatusIcon } from "@/components/LeaveRequest/StatusIcon";
import { LeaveRequest as LeaveRequestType } from "@/lib/models/leaveRequest";
import { getStatusTranslation } from "@/lib/status";
import { differenceInHours, format, isSameDay } from "date-fns";

interface Props {
  request: LeaveRequestType;
  expanded?: boolean;
  showActions?: boolean;
}

export function LeaveRequest({
  request,
  expanded = false,
  showActions = false,
}: Readonly<Props>) {
  const formatDateRange = (start: Date, end: Date) => {
    if (isSameDay(start, end)) {
      return `${format(start, "d MMM")} ${differenceInHours(end, start)} uur ${end.getFullYear()}`;
    }

    const startDate = format(start, "d MMM");
    const endDate = format(end, "d MMM");
    return `${startDate} ${start.getFullYear()} t/m ${endDate} ${start.getFullYear()}`;
  };

  return (
    <div className="h-fit max-w-sm rounded-lg border">
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

        <LeaveRequestDetails request={request} expanded={expanded} />

        {showActions && request.status === "pending" && (
          <LeaveRequestActions request={request} expanded={expanded} />
        )}
      </div>
    </div>
  );
}

export default LeaveRequest;
