import {
    Bell,
    Bookmark,
    Compass,
    Home,
    Mail,
    User
} from "lucide-react";

const menus = [
    {
        name: "Home",
        icon: Home,
    },
    {
        name: "Explore",
        icon: Compass,
    },
    {
        name: "Notifications",
        icon: Bell,
    },
    {
        name: "Messages",
        icon: Mail,
    },
    {
        name: "Bookmarks",
        icon: Bookmark,
    },
    {
        name: "Profile",
        icon: User,
    },
];

const LeftSidebar = () => {
    return (
        <aside className="hidden lg:flex w-72 h-screen sticky top-0 flex-col justify-between p-4 ">

            <div>

                <h1 className="text-3xl font-bold mb-8">
                    Esomaz
                </h1>

                <div className="space-y-2">

                    {menus.map((item) => {

                        const Icon = item.icon;

                        return (
                            <button
                                key={item.name}
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-full hover:bg-gray-100 transition"
                            >

                                <Icon size={24} />

                                <span className="text-lg">
                                    {item.name}
                                </span>

                            </button>
                        );

                    })}

                </div>

                <button className="mt-8 w-full rounded-full bg-black text-white py-3 font-semibold hover:opacity-90">

                    Post

                </button>

            </div>

            <div className="rounded-full p-3 hover:bg-gray-100 cursor-pointer">

                <div className="flex items-center gap-3">

                    <img
                        src="https://i.pravatar.cc/100"
                        className="w-12 h-12 rounded-full"
                    />

                    <div>

                        <h3 className="font-semibold">
                            Reja
                        </h3>

                        <p className="text-gray-500 text-sm">
                            @reja
                        </p>

                    </div>

                </div>

            </div>

        </aside>
    );
};

export default LeftSidebar;