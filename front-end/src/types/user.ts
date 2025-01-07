export type UserRoleName =
  | "Employee"
  | "SectionManager"
  | "ProjectManager"
  | "CEO"
  | "Admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateHired: Date;
  roleId: number;
  roleName: UserRoleName;
  createdAt: Date | null;
  updatedAt: Date | null;
}
