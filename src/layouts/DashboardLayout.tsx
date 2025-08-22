import { Link, Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";

const DashboardLayout = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen flex flex-col text-[#EAEAEA]">
      {/* Header */}
      <header className="border-b border-[#008b8b] shadow-[0_2px_10px_#63b0c8]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/dashboard/contacts"
            className="flex items-center hover:opacity-90 transition-opacity duration-200"
          >
            <i className="fas fa-address-book text-[#63b0c8] text-2xl mr-3" />
            <span className="text-xl font-bold text-white">Contact Management</span>
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/dashboard/users/profile"
                  className="text-[#EAEAEA] hover:text-white flex items-center transition-colors duration-200"
                >
                  <i className="fas fa-user-circle mr-2" />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/users/logout"
                  className="text-[#EAEAEA] hover:text-white flex items-center transition-colors duration-200"
                >
                  <i className="fas fa-sign-out-alt mr-2" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Card className="bg-[#1A1A1A] border border-[#333] shadow-[0_0_15px_#63b0c8]/30 p-6">
          <Outlet />
        </Card>

        <footer className="mt-10 mb-6 text-center text-gray-500 text-sm">
          <p>© 2025 Contact Management. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
