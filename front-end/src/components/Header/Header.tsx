import { SignOutButton } from "@/components/Auth/server";
import { HeaderLink } from "@/components/Header/HeaderLink";
import { MobileNavigation } from "@/components/Header/MobileNavigation";
import { SwitchMode } from "@/components/Header/SwitchMode";
import Image from "next/image";
import Link from "next/link";

export interface Navigation {
  name: string;
  href: string;
}

export const navigation: Navigation[] = [
  { name: "Dashboard", href: "#" },
  { name: "Aanvragen", href: "#" },
  { name: "Verlofsaldo", href: "#" },
];

export function Header() {
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
