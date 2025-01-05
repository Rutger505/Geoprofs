import { SignOutButton } from "@/components/Auth/server";
import { HeaderLink } from "@/components/Header/HeaderLink";
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
    { name: "Aanvragen", href: "#" },
    { name: "Verlofsaldo", href: "#" },
  ],
  SectionManager: [
    { name: "Aanvragen", href: "#" },
    { name: "Kalender", href: "#" },
  ],
  ProjectManager: [{ name: "Kalender", href: "#" }],
  CEO: [
    { name: "Presentie Afdeling", href: "#" },
    { name: "Presentie Project", href: "#" },
  ],
  Admin: [
    { name: "Gebruikers", href: "#" },
    { name: "Contracten", href: "#" },
    { name: "Afdelingen", href: "#" },
    { name: "Projecten", href: "#" },
  ],
};

export async function Header() {
  const session = await auth();
  if (!session) {
    return null;
  }

  const roleByPreference = session.preferences.useAsEmployee
    ? "Employee"
    : session.user.roleName;
  const navigation = navigationPerRole[roleByPreference];

  return (
    <div className={"flex w-full justify-center"}>
      <header className="flex h-20 w-full max-w-7xl items-center justify-between px-20">
        <Link href="/">
          <Image src="/logo.webp" alt="Geoprofs Logo" width={42} height={42} />
        </Link>

        <div className={"hidden gap-5 sm:flex"}>
          {navigation.map((item) => (
            <HeaderLink name={item.name} href={item.href} key={item.name} />
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
