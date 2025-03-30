import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto">
        {/* Optional Header */}
        <h1 className="text-3xl font-bold text-center text-[#0F6466] pt-10 mb-6">
          COVO
        </h1>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
