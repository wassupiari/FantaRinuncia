import { Routes, Route } from "react-router-dom";
import {
    ChartPieIcon,
    UserPlusIcon,
} from "@heroicons/react/24/solid";
import routes from "@/routes";

export function Auth() {
    const navbarRoutes = [
        {
            name: "dashboard",
            path: "/dashboard/profile",
            icon: ChartPieIcon,
        },
        {
            name: "sign up",
            path: "/auth/sign-up",
            icon: UserPlusIcon,
        },
        {
            name: "sign in",
            path: "/auth/sign-in"

        },
    ];

    return (
        <div className="relative min-h-screen w-full">
            <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                        layout === "auth" &&
                        pages.map(({ path, element }) => (
                            <Route exact path={path} element={element} />
                        ))
                )}
            </Routes>
        </div>
    );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
