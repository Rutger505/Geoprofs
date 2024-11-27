import { HeaderLink } from "@/components/Header/HeaderLink";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Navigation {
  name: string;
  href: string;
}

export const navigation = [
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

        <div className={"right-0 flex gap-5"}>
          {navigation.map((item) => (
            <HeaderLink name={item.name} href={item.href} key={item.name} />
          ))}
        </div>

        <Popover className="relative hidden">
          <PopoverButton>
            <Menu />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            transition
            className="flex origin-top flex-col transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {navigation.map((item) => (
              <HeaderLink name={item.name} href={item.href} key={item.name} />
            ))}
          </PopoverPanel>
        </Popover>
      </header>
    </div>
  );
}
