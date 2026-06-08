import { logout } from '@/features/auth/api/auth.api';
import { queryClient } from '@/lib/react_query';
import { useAuth } from "@/provider/UseAuth";
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
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {user}=useAuth();

  const navigate = useNavigate();
  

  const handleLogout = async () => {
  try {
    await logout();

    setProfileOpen(false);
    setOpen(false);

queryClient.setQueryData(["me"], null);

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

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

           <div className="relative">

  {user ? (
  <button
    onClick={() => setProfileOpen(!profileOpen)}
  >
    <img
      src="https://i.pravatar.cc/150?img=3"
      className="w-10 h-10 rounded-full cursor-pointer"
    />
  </button>
) : (
  <div className="flex items-center gap-3">

    <NavLink
      to="/login"
      className="px-4 py-2 text-sm font-medium"
    >
      Login
    </NavLink>

    <NavLink
      to="/register"
      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
    >
      Register
    </NavLink>

  </div>
)}

  {profileOpen && (
    <div className="absolute right-0 top-12 w-56 bg-white border rounded-xl shadow-lg overflow-hidden">

      <div className="p-4 border-b">

        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
        {user?.username}
        </p>

      </div>

      <NavLink
        to="/profile"
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <User size={18} />
        Profile
      </NavLink>

      <NavLink
        to="/settings"
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <Settings size={18} />
        Settings
      </NavLink>

   <button
  onClick={handleLogout}
  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50"
>
  <LogOut size={18} />
  Logout
</button>

    </div>
  )}

</div>

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

             <button
  onClick={handleLogout}
  className="flex gap-3 text-red-500"
>
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