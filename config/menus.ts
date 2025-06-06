import {
  ServiceProvider,
  Category,
  Home,
  loyaltySystem,
  EarningsSettings,
  Clients,
  Complaints,
  Dashboard,
  Features,
  Services,
  Banners,
  Orders,
  purchaseVoucher,
  TermsAndCondtion,
  SystemDesign,
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
    title: "Services",
    icon: Services,
    href: "/services",
  },
  {
    title: "Categories",
    icon: Category,
    href: "/categories",
  },
  {
    title: "Complaints",
    icon: Complaints,
    href: "/complaints",
  },
  {
    title: "Banners",
    icon: Banners,
    href: "/banners",
  },

  {
    title: "Orders",
    icon: Orders,
    href: "/orders",
  },
  {
    title: "Clients",
    icon: Clients,
    href: "/clients",
  },
  {
    title: "Earnings settings",
    icon: EarningsSettings,
    href: "/EarningsSettings",
  },
  {
    title: "Terms and Condition",
    icon: TermsAndCondtion,
    href: "/TermsAndCondition",
  },
  {
    title: "Loyalty system",
    icon: loyaltySystem,
    href: "/loyaltySystem",
  },
  {
    title: "Sales statistics",
    icon: SystemDesign,
    href: "/sales-statistics",
  },
  {
    title: "Purchase voucher",
    icon: purchaseVoucher,
    href: "/purchaseVoucher",
  },
  {
    title: "System Design",
    icon: SystemDesign,
    href: "/systemDesign",
  },
  {
    title: "Reservations",
    icon: SystemDesign,
    href: "/reservations",
  },
  {
    title: "Messages",
    icon: SystemDesign,
    href: "/messages",
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
