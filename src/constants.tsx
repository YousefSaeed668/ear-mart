import {
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  PhoneCall,
  Store,
  TableProperties,
} from "lucide-react";

export const SIDEBAR_LINKS = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/seller/dashboard",
  },
  {
    title: "Orders",
    icon: <TableProperties />,
    href: "/seller/orders",
  },
  {
    title: "Products",
    icon: <Store />,
    href: "/seller/products",
  },
  {
    title: "Admin",
    icon: <CircleUserRound />,
    href: "/seller/admin",
  },
  {
    title: "Contact",
    icon: <PhoneCall />,
    href: "/seller/contact",
  },
  {
    title: "Logout",
    icon: <LogOut />,
    href: "/",
  },
];
