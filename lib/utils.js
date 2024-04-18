import { dashboard, driver, hr, load, users } from "@/public";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  companyName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const roles = [
  {
    companyName: "nnt",
    email: "nnt@gmail.com",
    password: "nnt123",
  },
];

export const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    headTitle: "Dashboard",
    icon: dashboard,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Load Management",
    headTitle: "Load Management",
    icon: load,
    path: "/load-management",
  },
  {
    id: 3,
    title: "HR Management",
    headTitle: "HR Management",
    icon: hr,
    path: "/hr-management",
    items: [
      {
        id: 1,
        title: "Drivers",
        headTitle: "Drivers",
        icon: driver,
        path: "/hr-management/driver/active",
      },
      {
        id: 2,
        title: "Users",
        headTitle: "Employees",
        icon: users,
        path: "/hr-management/employees",
      },
    ],
  },
];

export const statusPath = [
  {
    id: 1,
    title: "All Loads",
    path: "/load-management/load-trip",
    headTitle: "Load + Trip",
  },
  {
    id: 2,
    title: "Booked Loads",
    path: "/load-management/booked",
    headTitle: "Booked",
  },
  {
    id: 3,
    title: "Dispatched",
    path: "/load-management/dispatched",
    headTitle: "Dispatched",
  },
  {
    id: 4,
    title: "In-Transit",
    path: "/load-management/in-transit",
    headTitle: "In-Transit",
  },
  {
    id: 5,
    title: "Delivered",
    path: "/load-management/delivered",
    headTitle: "Delivered",
  },
  {
    id: 6,
    title: "Unpaid",
    path: "/load-management/unpaid",
    headTitle: "Unpaid",
  },
  {
    id: 7,
    title: "Trips",
    path: "/load-management/trips",
    headTitle: "Trips",
  },
];

export const queryPathLoad = [
  {
    id: 1,
    path: "/load-trip",
    requestQuery: "",
  },
  {
    id: 2,
    path: "/booked",
    requestQuery: "BOOKED",
  },
  {
    id: 3,
    path: "/dispatched",
    requestQuery: "DISPATCHED",
  },
  {
    id: 4,
    path: "/in-transit",
    requestQuery: "INTRANSIT",
  },
  {
    id: 5,
    path: "/delivered",
    requestQuery: "DELIVERED",
  },
  {
    id: 6,
    path: "/unpaid",
    requestQuery: "INVOICED",
  },
  {
    id: 7,
    path: "/trips",
    requestQuery: "PAID",
  },
];

export const statusDriverPath = [
  {
    id: 1,
    title: "Active Drivers",
    path: "/hr-management/driver/active",
    headTitle: "Active Drivers",
    requestQuery: "Active (DF)"
  },
  // {
  //   id: 2,
  //   title: "Unassigned Drivers",
  //   path: "/hr-management/driver/unassigned",
  //   headTitle: "Unassigned Drivers",
  //   requestQuery: ""
  // },
  // {
  //   id: 3,
  //   title: "Expiration",
  //   path: "/hr-management/driver/expiration",
  //   headTitle: "Expiration",
  //   requestQuery: ""
  // },
  {
    id: 4,
    title: "All Drivers",
    path: "/hr-management/driver/all",
    headTitle: "All Drivers",
    requestQuery: ""
  },
  {
    id: 5,
    title: "Terminated Drivers",
    path: "/hr-management/driver/terminated",
    headTitle: "Terminated Drivers",
    requestQuery: "Terminate"
  }
];
