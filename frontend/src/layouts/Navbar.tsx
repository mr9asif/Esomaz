import {
    Bell,
    Compass,
    Home,
    MessageCircle,
    Plus,
    Search,
    Users,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl h-16 px-6 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-10">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 tracking-tight"
          >
            Esomaz
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex gap-6">

            <NavLink
              to="/"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <Home size={20} />
              Home
            </NavLink>

            <NavLink
              to="/explore"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <Compass size={20} />
              Explore
            </NavLink>

            <NavLink
              to="/communities"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <Users size={20} />
              Communities
            </NavLink>

          </div>
        </div>

        {/* Center Search */}

        <div className="hidden lg:flex items-center relative w-80">

          <Search
            className="absolute left-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full bg-gray-100 pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="hover:text-blue-600">
            <MessageCircle size={22} />
          </button>

          <button className="hover:text-blue-600">
            <Bell size={22} />
          </button>

          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
            <Plus size={18} />
          </button>

          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />

        </div>

      </div>
    </nav>
  );
};

export default Navbar;