const dashboardRouteTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/products": "Products",
  "/product-request": "Product Requests",
  "/reports": "Reports",
  "/settings": "Settings",
};

export function getDashboardTitle(pathname: string): string {
  const matchedRoute = Object.keys(dashboardRouteTitles).find((route) =>
    pathname.startsWith(route),
  );
  return matchedRoute ? dashboardRouteTitles[matchedRoute] : "Dashboard";
}
