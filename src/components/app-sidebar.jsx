import { twMerge } from "tailwind-merge";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DashboardIcon,
  AssetsIcon,
  MessagesIcon,
  ServicesIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  CarIcon,
  CalendarIcon,
} from "@/assets/icons/Icons";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: DashboardIcon,
  },
  {
    title: "Assets",
    url: "/assets",
    icon: AssetsIcon,
  },
  {
    title: "Booking",
    url: "#",
    icon: CarIcon,
  },
  {
    title: "Sell Cars",
    url: "#",
    icon: ShoppingBagIcon,
  },
  {
    title: "Buy Cars",
    url: "#",
    icon: ShoppingCartIcon,
  },
  {
    title: "Services",
    url: "#",
    icon: ServicesIcon,
  },
  {
    title: "Calendar",
    url: "#",
    icon: CalendarIcon,
  },
  {
    title: "Messages",
    url: "#",
    icon: MessagesIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className={"!border-r-0"}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center gap-2 p-4">
            <Image src={logo} alt="Logo" width={30} height={30} />
            <h2>Test</h2>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-4">
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="!w-5 !h-5 text-gray-500" />
                      <span className="font-medium text-gray-500">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
