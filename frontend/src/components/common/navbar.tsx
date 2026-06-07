import {
  Bell,
  Compass,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-4 lg:px-6 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-8">

            {/* Mobile Menu */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600"
            >
              Esomaz
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">

              <NavLink to="/" className="flex gap-2 items-center">
                <Home size={20} />
                Home
              </NavLink>

              <NavLink to="/explore" className="flex gap-2 items-center">
                <Compass size={20} />
                Explore
              </NavLink>

              <NavLink
                to="/communities"
                className="flex gap-2 items-center"
              >
                <Users size={20} />
                Communities
              </NavLink>

            </div>

          </div>

          {/* Search */}

          <div className="hidden lg:block relative w-80">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              placeholder="Search..."
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 outline-none"
            />

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            <MessageCircle size={22} />

            <Bell size={22} />

            <img
              src="https://i.pravatar.cc/150?img=3"
              className="w-10 h-10 rounded-full"
            />

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}

      <div
        className={`fixed inset-0 z-50 ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}

        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}

        <div
          className={`absolute left-0 top-0 h-full w-72 bg-white transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5">

            <div className="flex justify-between items-center">

              <h2 className="font-bold text-xl text-blue-500">
                Esomaz
              </h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>

            </div>

            <div className="mt-8 flex flex-col gap-5">

              <NavLink to="/" className="flex gap-3">
                <Home />
                Home
              </NavLink>

              <NavLink to="/explore" className="flex gap-3">
                <Compass />
                Explore
              </NavLink>

              <NavLink to="/communities" className="flex gap-3">
                <Users />
                Communities
              </NavLink>

              <hr />

              <NavLink to="/profile" className="flex gap-3">
                <User />
                Profile
              </NavLink>

              <NavLink to="/settings" className="flex gap-3">
                <Settings />
                Settings
              </NavLink>

              <button className="flex gap-3 text-red-500">
                <LogOut />
                Logout
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;