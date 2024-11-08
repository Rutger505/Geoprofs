import { HeaderLink } from "@/components/Header/HeaderLink";
import { MobileNavigation } from "@/components/Header/MobileNavigation";
import Image from "next/image";
import Link from "next/link";

export interface Navigation {
  name: string;
  href: string;
}

export const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Aanvragen", href: "#" },
  { name: "Verlofsaldo", href: "#" },
];

export function Header() {
  return (
    <div className={"flex w-full justify-center"}>
      <header className="flex h-20 w-full max-w-7xl items-center justify-between px-20">
        <div>
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="Geoprofs Logo"
              width={42}
              height={42}
            />
          </Link>
        </div>

        <div className={"hidden gap-5 md:flex"}>
          {navigation.map((item) => (
            <HeaderLink name={item.name} href={item.href} key={item.name} />
          ))}
        </div>

        <div className={"md:hidden"}>
          <MobileNavigation navigation={navigation} />
        </div>
      </header>
    </div>
  );
}
