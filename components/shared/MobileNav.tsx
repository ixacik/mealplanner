"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { menuItems } from "@/lib/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="h-20 flex lg:hidden justify-between items-center px-4 md:px-8 lg:px-16 bg-bg-light z-50 fixed inset-0 bottom-auto">
        <Image
          src="/fuudplan-mobile.svg"
          width={140}
          height={31}
          alt="fuudplan logo"
          loading="eager"
        />
        <Sheet>
          <SheetTrigger>
            <Menu size={24} className="text-white" />
          </SheetTrigger>
          <SheetContent className="bg-bg-light border-l border-white/5 shadow-xl">
            <nav className="w-full mt-12">
              <ul className="w-full flex flex-col gap-8 items-start">
                {menuItems.map((item, index) => (
                  <Link
                    href={item.path}
                    key={index}
                    className={`${
                      pathname === item.path ? "text-lime-300" : "text-inherit"
                    }`}
                  >
                    <SheetTrigger className="focus:ring-0 focus:outline-none">
                      {item.name}
                    </SheetTrigger>
                  </Link>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
export default MobileNav;
