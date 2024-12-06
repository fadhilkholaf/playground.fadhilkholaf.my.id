import Link from "next/link";

import { Menu } from "@/lib/types";

const menus: Menu[] = [
  {
    name: "Home page 3D model",
    url: "https://sketchfab.com/3d-models/little-office-2f04d4ac843348ac80d85afc217f1b55",
  },
  {
    name: "Next.js realtime chat",
    url: "https://ably.com/blog/realtime-chat-app-nextjs-vercel",
  },
  {
    name: "Interactive 3D badge",
    url: "https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber",
  },
  {
    name: "Center gravity animation",
    url: "https://codesandbox.io/p/sandbox/xy8c8z?file=%2Fsrc%2FApp.js",
  },
  {
    name: "Math for creative developers",
    url: "https://threejs-workshops.com/",
  },
];

const AttributionPage = () => {
  return (
    <main className="flex h-screen w-full px-2 py-16">
      <ul className="flex w-full flex-col items-center gap-2 overflow-auto">
        {menus &&
          menus.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.url}
                target="_blank"
                className="break-all text-lg underline underline-offset-2"
              >
                {menu.name}
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default AttributionPage;
