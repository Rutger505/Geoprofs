"use client";

import { SignOutButton } from "@/components/Auth/client";
import { Navigation } from "@/components/Header/Header";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

interface Props {
  navigation: Navigation[];
}

export function MobileNavigation({ navigation }: Readonly<Props>) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className="relative flex h-6 w-6 items-center"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <Menu
              className={clsx(
                "absolute h-6 w-6 transform transition-transform duration-300 ease-in-out",
                open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
              )}
            />
            <X
              className={clsx(
                "absolute h-6 w-6 transform transition-transform duration-300 ease-in-out",
                open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
              )}
            />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            transition
            className="flex origin-top flex-col transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 hover:bg-gray-100"
              >
                {item.name}
              </a>
            ))}

            <SignOutButton className="px-4 py-2 hover:bg-gray-100">
              Uitloggen
            </SignOutButton>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
