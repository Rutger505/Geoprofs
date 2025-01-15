import { SwitchModeButton } from "@/components/Header/SwitchModeButton";
import { auth } from "@/lib/auth";
import { getRoleNameTranslation } from "@/lib/role";

export async function SwitchMode() {
  const session = await auth();
  if (!session) {
    return null;
  }

  const role = session.user.roleName;
  if (role === "Employee") {
    return null;
  }

  const roles = [
    getRoleNameTranslation("Employee"),
    getRoleNameTranslation(session.user.roleName),
  ];

  return (
    <SwitchModeButton
      defaultUseAsEmployee={session.preferences.useAsEmployee}
      roles={roles}
    />
  );
}
