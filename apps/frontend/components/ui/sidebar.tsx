"use client";

import { useState } from "react";
import Link from "next/link";
import { SideBarProps } from "@/lib/types/sidebar";

export default function SideBar({ sideBarLinks }: SideBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="sm:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-neutral-primary-soft border border-default text-heading shadow-md"
        >
          ☰
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
            fixed top-0 left-0 z-50 h-full w-64
            bg-neutral-primary-soft border-e border-default
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0
          `}
      >
        <div className="flex items-center justify-between p-4 border-b border-default">
          <span className="text-heading font-semibold">Menu</span>

          <button
            onClick={() => setOpen(false)}
            className="sm:hidden text-heading text-xl"
          >
            ✕
          </button>
        </div>

        <nav className="p-3 space-y-2">
          {sideBarLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className="block px-2 py-1.5 rounded-base text-body hover:bg-neutral-tertiary hover:text-fg-brand"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
