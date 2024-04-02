"use client";

import { menuItems } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-bg-light h-dvh flex flex-col items-center p-8 w-64 z-50 fixed inset-0 right-auto">
      <Image
        src="/fuudplan.svg"
        width={201}
        height={45.75}
        alt="fuudplan logo"
        className="mb-12"
      />
      <nav className="w-full">
        <ul className="w-full flex flex-col gap-4 items-start">
          {menuItems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className={
                pathname === item.path ? "text-lime-300" : "text-inherit"
              }
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
