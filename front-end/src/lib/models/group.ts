import { LeaveRequest } from "@/lib/models/leaveRequest";
import { Project, ProjectWithUsersWithLeaves } from "@/lib/models/project";
import { Section } from "@/lib/models/section";
import { User } from "@/types/user";

type GroupWithUsersWithLeaves = (Project | Section) & {
  user: User & { leave: LeaveRequest[] }[];
};

export function mapGroupDataToChartItems(
  groupData: ProjectWithUsersWithLeaves[],
) {
  return groupData.map((group, index) => ({
    leaveRequests: group.user.flatMap((user) => user.leave),
    group: group,
  }));
}
