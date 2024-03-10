import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Collapse, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/controller/AuthContex.jsx";
import  Search  from "@/widgets/layout/search.jsx";

function NavList() {
    const { user, logout } = useAuth();

    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="/regolamento" className="flex items-center hover:text-blue-500 transition-colors">
                    Regolamento
                </a>
            </Typography>
            {user ? (
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    <button onClick={logout} className="flex items-center hover:text-blue-500 transition-colors">
                        Logout
                    </button>
                </Typography>
            ) : (
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    <a href="/login" className="flex items-center hover:text-blue-500 transition-colors">
                        Sign in
                    </a>
                </Typography>
            )}
        </ul>
    );
}

export function NavbarSimple() {
    const [openNav, setOpenNav] = useState(false);
    const { user } = useAuth();

    return (
        <Navbar className="mx-auto max-w-screen px-6 py-3">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    fantarinuncia.live
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}


export default NavbarSimple;
