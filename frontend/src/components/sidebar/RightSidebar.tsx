const RightSidebar = () => {
    return (
        <aside className="hidden xl:block w-[350px] h-screen sticky top-0 overflow-y-auto p-5">

           

            <div className="mt-6 rounded-2xl bg-gray-100 p-5">

                <h2 className="font-bold text-xl">

                    Trends

                </h2>

                <div className="mt-4 space-y-4">

                    <div>

                        <p className="text-sm text-gray-500">
                            Technology
                        </p>

                        <h3 className="font-semibold">
                            #AI
                        </h3>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Programming
                        </p>

                        <h3 className="font-semibold">
                            #React
                        </h3>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Bangladesh
                        </p>

                        <h3 className="font-semibold">
                            #Startup
                        </h3>

                    </div>

                </div>

            </div>

            <div className="mt-5 rounded-2xl bg-gray-100 p-5">

                <h2 className="font-bold text-xl">

                    Who to Follow

                </h2>

                <div className="mt-5 space-y-4">

                    {[1, 2, 3].map((i) => (

                        <div
                            key={i}
                            className="flex justify-between items-center"
                        >

                            <div className="flex items-center gap-3">

                                <img
                                    src={`https://i.pravatar.cc/100?img=${i}`}
                                    className="w-10 h-10 rounded-full"
                                />

                                <div>

                                    <h4 className="font-semibold">
                                        User {i}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        @user{i}
                                    </p>

                                </div>

                            </div>

                            <button className="rounded-full bg-black text-white px-4 py-2 text-sm">

                                Follow

                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </aside>
    );
};

export default RightSidebar;