import { LeaveRequest } from "@/lib/models/leaveRequest";
import { Project } from "@/lib/models/project";
import { Section } from "@/lib/models/section";
import { User } from "@/types/user";

type GroupWithUsersWithLeaves = (Project | Section) & {
  user: User & { leave: LeaveRequest[] }[];
};
