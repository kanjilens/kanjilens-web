import { ActionButton } from "./components/ActionButton";
import { DiscoveredContent } from "./pages/Discovered";
import { Home } from "./pages/Home";
import {
  createElement,
  type ComponentType,
  type JSX,
} from "react";

export type MenuContentProps =
  | "home"
  | "settings"
  | "discovered"
  | "library";

export interface DashboardDataAtributes {
  name: string;
  description: string;
  buttons: null | JSX.Element;
}

export type DashboardContentProps =
  Partial<DashboardDataAtributes>;

export interface DashboardObjectData {
  atributes: DashboardDataAtributes;
  content: null | ComponentType<DashboardContentProps>;
}

export type DashboardRoutes = Partial<
  Record<MenuContentProps, DashboardObjectData>
>;

const actualObject: DashboardRoutes = {
  home: {
    atributes: {
      name: "Dashboard",
      description:
        "Acompanhe seu progresso no aprendizado de kanjis",
      buttons: null,
    },
    content: Home,
  },
  discovered: {
    atributes: {
      name: "Kanjis Descobertos",
      description: "Gerencie seus kanjis cadastrados",
      buttons: <ActionButton />,
    },
    content: DiscoveredContent,
  },
};

const Dashboard = () => {
  const urlPath = window.location.pathname;
  const lastParam = urlPath.substring(
    urlPath.lastIndexOf("/") + 1,
  );

  const renderComponent = () => {
    const param = lastParam as MenuContentProps;
    const content = actualObject[param]?.content;
    return content
      ? createElement(content, {
          ...actualObject[param]?.atributes,
        })
      : content;
  };

  return renderComponent();
};

export default Dashboard;
