import { UserRoleName } from "@/types/user";

export function getRoleNameTranslation(role: UserRoleName) {
  switch (role) {
    case "Employee":
      return "Werknemer";
    case "SectionManager":
      return "Afdelingsmanager";
    case "ProjectManager":
      return "Projectmanager";
    case "CEO":
      return "CEO";
    case "Admin":
      return "Admin";
  }
}
