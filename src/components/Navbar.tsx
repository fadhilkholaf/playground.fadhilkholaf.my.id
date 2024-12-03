import Link from "next/link";

import { Menu } from "@/lib/types";

const menus: Menu[] = [
  { name: "Home", url: "/" },
  { name: "Keyboard Controll", url: "/keyboard-controll" },
  { name: "Badge", url: "/badge" },
  { name: "Floating", url: "/floating" },
  { name: "Trail", url: "/trail" },
  { name: "Scroll", url: "/scroll" },
];

const Navbar = () => {
  return (
    <nav className="group fixed z-50 w-full">
      <h1 className="sticky left-0 px-8">Hover or click here to see navbar</h1>
      <ul className="flex w-full flex-row gap-x-4 overflow-x-auto bg-white p-8 text-black opacity-0 transition-opacity group-hover:opacity-100">
        {menus &&
          menus.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.url}
                className="text-nowrap underline underline-offset-2"
              >
                {menu.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
