import { HeaderLink } from "@/components/Header/HeaderLink";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Menu } from "lucide-react";
import Image from "next/image";

export const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Aanvragen", href: "#" },
  { name: "Verlofsaldo", href: "#" },
];

export function Header() {
  return (
    <div className={"w-full flex justify-center"}>
      <header className="flex items-center justify-between px-20 h-20 max-w-7xl w-full">
        <div>
          <h1>
            <Image
              src="/logo.webp"
              alt="Geoprofs Logo"
              width={42}
              height={42}
            />
          </h1>
        </div>
        <div className={"flex gap-5 hidden right-0"}>
          {navigation.map((item) => (
            <HeaderLink name={item.name} href={item.href} key={item.name} />
          ))}
        </div>

        <Popover className="relative">
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
