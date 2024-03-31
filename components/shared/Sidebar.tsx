"use client";

import { menuItems } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar z-50">
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
