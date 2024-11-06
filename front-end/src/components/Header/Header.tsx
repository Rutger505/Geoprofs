export const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export function Header() {
  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex justify-start">
        <span className="text-2xl font-bold">sdfsdfsdf</span>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-500 hover:text-gray-900"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
