import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  Bookmark,
  Compass,
  Home,
  Mail,
  User,
} from "lucide-react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

const menus = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: Compass,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: Mail,
  },
  {
    name: "Saved Posts",
    path: "/bookmarks",
    icon: Bookmark,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

 const handleHomeClick = () => {
  console.log("ScrollY:", window.scrollY);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  return (
    <aside className="hidden lg:flex w-72 h-[calc(100vh-64px)] sticky top-20 flex-col justify-between p-4 overflow-hidden">
      <div>
        <div className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;

            if (item.name === "Home") {
              return (
                <button
                  key={item.name}
                  onClick={handleHomeClick}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-full transition ${
                    location.pathname === "/"
                      ? "bg-gray-100 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-lg">{item.name}</span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-4 py-3 rounded-full transition ${
                    isActive
                      ? "bg-gray-100 font-semibold"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={24} />
                <span className="text-lg">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        <button className="mt-8 w-full rounded-full bg-black text-white py-3 font-semibold hover:opacity-90">
          Post
        </button>
      </div>

      <div className="rounded-full p-3 hover:bg-gray-100 cursor-pointer">
        {/* User Profile */}
      </div>
    </aside>
  );
};

export default LeftSidebar;