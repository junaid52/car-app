"use client";
import { signOut } from "@/auth/auth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchInput } from "./search-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellDot } from "lucide-react";
export default function Header() {
  return (
    <header className="bg-white ml-[1px]">
      <div className="p-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <SearchInput onSearch={() => {}}>
            <SearchInput.Icon className="text-gray-400" />
            <SearchInput.Field
              className="border-0 bg-gray-100 w-[360px] rounded-lg"
              placeholder="Search..."
            />
          </SearchInput>
        </div>
        <div className="flex items-center gap-8">
          <BellDot className="text-gray-400" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
