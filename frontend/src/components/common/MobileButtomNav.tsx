
import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  Home,
  MessageCircle,
  Plus,
  Search
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const MobileBottomNav = () => {
  
    const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"], // Change this if your query key is different
      });
    } else {
      navigate("/");
    }
  };


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t-gray-400 shadow-sm">

      <div className="relative h-16 flex items-center justify-around">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600"
              : "text-gray-500"
          }
          onClick={handleHomeClick}
        >
          <Home size={25} />
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600"
              : "text-gray-500"
          }
        >
          <Search size={24} />
        </NavLink>

        {/* Create */}

        <button
          className="absolute left-1/2 -translate-x-1/2 -top-6
          w-14 h-14 rounded-full bg-blue-600
          text-white flex items-center justify-center
          shadow-lg"
        >
          <Plus size={28} />
        </button>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600"
              : "text-gray-500"
          }
        >
          <Bell size={24} />
        </NavLink>

        <NavLink
          to={`/messages`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600"
              : "text-gray-500"
          }
        >
          <MessageCircle size={24} />
        </NavLink>

      </div>

    </nav>
  );
};

export default MobileBottomNav;