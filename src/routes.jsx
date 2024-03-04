import {
    HomeIcon,
    UserCircleIcon,
    RectangleStackIcon,
} from "@heroicons/react/24/solid";
import {  Profile } from "@/pages/dashboard/";
import {  SignIn } from "@/pages/auth";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <UserCircleIcon {...icon} />,
                name: "profile",
                path: "/profile",
                element: <Profile />,
            }
        ],
    },
    {
        title: "auth layouts",
        layout: "auth",
        pages: [
            {
                icon: <RectangleStackIcon {...icon} />,
                name: "log out",
                path: "/logout",
                element: <SignIn />,
            },
        ],
    },
];

export default routes;