"use client";

import { ArrowLeft } from "lucide-react";
import Link from 'next/link';


interface BackArrowProps {
  href: string;
  label?: string;
}

export default function BackArrow({ href, label = "Back" }: BackArrowProps) {
  return (
    <Link
      href={href}
      className="inline-flex mt-4 ms-2 items-center gap-2 text-purple-600 dark:text-white hover:text-purple-500 font-medium transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}
