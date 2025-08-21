import { Link, Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"; // pastikan path ini benar

const DashboardLayout = () => {
  return (
    <div className="bg-[#0F0F0F] text-[#EAEAEA] min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard/contacts" className="flex items-center gap-2">
            <i className="fas fa-address-book text-primary text-xl" />
            <span className="font-semibold text-lg text-primary">
              Contact Management
            </span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/dashboard/users/profile"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <i className="fas fa-user-circle mr-1" />
                    Profile
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/dashboard/users/logout"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-1" />
                    Logout
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        © 2025 Contact Management. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
