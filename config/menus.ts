import {
  ServiceProvider,
  Category,
  Home,
  Lawyer,
  Requests,
  Appointments,
  Tasks,
  Courts,
  Dashboard,
  Features,
  Regions,
  Reports,
  Property,
  Finance,
  products,
  reports,
  Reservation,
} from "@/components/svg";
import { useRole } from "./useRole"; // Import the custom hook
export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

// Define menu configurations for admin and user roles
const adminMenu = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Service providers",
    icon: ServiceProvider,
    href: "/service-providers",
  },
  {
    title: "Categories",
    icon: Category,
    href: "/categories",
  },
  {
    title: "Complaints",
    icon: Category,
    href: "/complaints",
  },
];
const lawyerMenu = [];
const clientMenu = [];

export const getMenusConfig = (role) => ({
  mainNav: [],
  sidebarNav: {
    modern:
      role == "client" ? clientMenu : role == "lawyer" ? lawyerMenu : adminMenu,
    classic:
      role == "client" ? clientMenu : role == "lawyer" ? lawyerMenu : adminMenu,
  },
});

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
