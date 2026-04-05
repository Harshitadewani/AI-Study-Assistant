import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export const Layout = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">

    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="flex-1 flex flex-col ml-64">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 p-6">

        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>

      </main>

    </div>

  </div>
);