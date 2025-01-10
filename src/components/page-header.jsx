"use client";

import { useSelectedLayoutSegment } from "next/navigation";
export default function PageHeader() {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <h1 className="mb-4 capitalize">{segment ? segment : "Dashboard"}</h1>
    </>
  );
}
