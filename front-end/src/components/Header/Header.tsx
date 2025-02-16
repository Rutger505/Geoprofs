import { SignOutButton } from "@/components/Auth/server";
import { MobileNavigation } from "@/components/Header/MobileNavigation";
import { SwitchMode } from "@/components/Header/SwitchMode";
import { auth } from "@/lib/auth";
import { UserRoleName } from "@/types/user";
import Image from "next/image";
import Link from "next/link";

export interface Navigation {
  name: string;
  href: string;
}

type NavigationPerRole = {
  [key in UserRoleName]: Navigation[];
};

export const navigationPerRole: NavigationPerRole = {
  Employee: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Verlofverzoeken", href: "/leave-requests" },
    { name: "Verlofsaldo", href: "/leave-hours" },
  ],
  SectionManager: [
    { name: "Beheer Verlofverzoeken", href: "/section-manager/leave-requests" },
    { name: "Kalender", href: "/section-manager/section-calendar" },
  ],
  ProjectManager: [
    { name: "Kalender", href: "/project-manager/project-calendar" },
  ],
  CEO: [
    { name: "Afdelingen", href: "/ceo/sections" },
    { name: "Projecten", href: "/ceo/projects" },
  ],
  Admin: [
    { name: "Werknemers", href: "/admin/employees" },
    { name: "Contracten", href: "/admin/contracts" },
    { name: "Afdelingen", href: "/admin/sections" },
    { name: "Projecten", href: "/admin/projects" },
  ],
};

export async function Header() {
  const session = await auth();

  let navigation: Navigation[] = [];

  if (session) {
    const roleByPreference = session.preferences.useAsEmployee
      ? "Employee"
      : session.user.roleName;
    navigation = navigationPerRole[roleByPreference];
  }

  return (
    <div className={"flex w-full justify-center"}>
      <header className="flex h-20 w-full max-w-7xl items-center justify-between px-20">
        <Link href="/">
          <Image src="/logo.webp" alt="Geoprofs Logo" width={42} height={42} />
        </Link>

        <div className={"hidden gap-5 sm:flex"}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={"rounded-sm p-3 hover:opacity-90"}
            >
              {item.name}
            </Link>
          ))}

          <SignOutButton className="rounded-sm p-3 hover:opacity-90">
            Uitloggen
          </SignOutButton>

          <SwitchMode />
        </div>

        <div className="flex items-center sm:hidden">
          <MobileNavigation navigation={navigation} />
        </div>
      </header>
    </div>
  );
}
