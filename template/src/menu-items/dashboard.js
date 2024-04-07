// assets
import { IconDashboard, IconPackage } from "@tabler/icons";

// constant
const icons = { IconDashboard, IconPackage };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "tasks",
      title: "Tasks",
      type: "item",
      url: "/tasks",
      icon: icons.IconPackage,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
