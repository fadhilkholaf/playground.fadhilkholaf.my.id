"use client";

import Link from "next/link";
import { useState } from "react";

import { Menu } from "@/lib/types";

const menus: Menu[] = [
  { name: "Home", url: "/" },
  { name: "Chat", url: "/chat" },
  { name: "Keyboard Controll", url: "/keyboard-controll" },
  { name: "Badge", url: "/badge" },
  { name: "Floating", url: "/floating" },
  { name: "Trail", url: "/trail" },
  { name: "Scroll", url: "/scroll" },
  { name: "Math", url: "/math" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-2 top-2 z-50 rounded-lg border border-white px-2 py-1 text-white backdrop-blur backdrop-brightness-50"
        >
          Open Menu
        </button>
      ) : (
        <nav className="fixed z-50 flex h-screen w-full flex-col gap-4 overflow-y-auto p-2 text-white backdrop-blur backdrop-brightness-50">
          <button
            onClick={() => setOpen(false)}
            className="sticky top-0 z-50 w-fit rounded-lg border px-2 py-1"
          >
            Close Menu
          </button>
          <ul className="flex w-full flex-col gap-4">
            {menus &&
              menus.map((menu, index) => (
                <li key={index}>
                  <Link
                    href={menu.url}
                    className="text-nowrap text-2xl underline underline-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
