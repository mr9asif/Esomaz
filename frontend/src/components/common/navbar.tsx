
import { logout } from "@/features/auth/api/auth.api";
import { queryClient } from "@/lib/react_query";
import { useAuth } from "@/provider/UseAuth";
import {
  Bell,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      queryClient.setQueryData(["me"], null);
      setProfileOpen(false);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b">

        <div className="max-w-7xl mx-auto h-16 px-4 lg:px-6 flex items-center justify-between">

          {/* ================= MOBILE ================= */}

          <div className="flex lg:hidden items-center justify-between w-full">

            <Link
              to="/"
              className="text-2xl font-bold text-blue-600"
            >
              Esomaz
            </Link>

            {user ? (
              <div className="relative">

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img
                    src={
                      user.avatar ||
                      "https://i.postimg.cc/sXPgwMqt/default-profile.jpg"
                    }
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>

               {/* Mobile Profile Drawer */}

<div
  className={`fixed inset-0 z-50 lg:hidden ${
    profileOpen ? "visible" : "invisible"
  }`}
>
  {/* Overlay */}

  <div
    onClick={() => setProfileOpen(false)}
    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
      profileOpen ? "opacity-100" : "opacity-0"
    }`}
  />

  {/* Drawer */}

  <div
    className={`absolute right-0 top-0 h-screen w-[75%] max-w-[320px] bg-white shadow-xl
    transition-transform duration-300 ease-in-out
    ${
      profileOpen
        ? "translate-x-0"
        : "translate-x-full"
    }`}
  >

    <div className="p-6">

      <img
        src={
          user.avatar ||
          "https://i.postimg.cc/sXPgwMqt/default-profile.jpg"
        }
        className="w-16 h-16 rounded-full object-cover"
      />

      <h2 className="mt-4 text-xl font-bold">
        {user.name}
      </h2>

      <p className="text-gray-500">
        @{user.username}
      </p>

      <div className="mt-8 space-y-2">

        <NavLink
          to={`/profile/${user.username}`}
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <User size={20} />
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Settings size={20} />
          Settings
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 w-full"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>

  </div>

</div>

              </div>
            ) : (
              <Link
                to="/login"
                className="text-blue-600 font-semibold"
              >
                Login
              </Link>
            )}

          </div>

          {/* ================= DESKTOP ================= */}

          <div className="hidden lg:flex items-center justify-between w-full">

            <div className="flex items-center gap-8">

              <Link
                to="/"
                className="text-2xl font-bold text-blue-600"
              >
                Esomaz
              </Link>

              <div className="relative w-80">

                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <input
                  placeholder="Search..."
                  className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 outline-none"
                />

              </div>

            </div>

            <div className="flex items-center gap-6">

              <Bell
                size={22}
                className="cursor-pointer"
              />

              {user ? (
                <div className="relative">

               <button
  onClick={() => setProfileOpen(true)}
>
  <img
    src={
      user.avatar ||
      "https://i.postimg.cc/sXPgwMqt/default-profile.jpg"
    }
    className="w-10 h-10 rounded-full object-cover"
  />
</button>

                  {profileOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white border rounded-xl shadow-lg overflow-hidden">

                      <div className="p-4 border-b">

                        <p className="font-semibold">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>

                      </div>

                      <NavLink
                        to={`/profile/${user.username}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User size={18} />
                        Profile
                      </NavLink>

                      <NavLink
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                        onClick={() => setProfileOpen(false)}
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

            </div>

          </div>

        </div>

      </nav>
    </>
  );
};

export default Navbar;
