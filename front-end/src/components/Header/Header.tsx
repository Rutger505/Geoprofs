import Image from "next/image";
import Link from "next/link";

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
        <div className={"flex gap-5"}>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="hover:opacity-90">
              {item.name}
            </Link>
          ))}
        </div>
      </header>
    </div>
  );
}
