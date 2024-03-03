import React from "react"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom"
import NavbarSimple from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";


function Dashboard (){
    const { username } = useParams();
    return (
        <>
            <NavbarSimple/>
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="md:row-span-3">
                    <Card className="mt-6 w-full">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                alt="card-image"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Ciao {username} 👋
                            </Typography>
                            <Typography>
                                bio
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-1 px-2 mx-auto">
                            <Button>Modifica Account</Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="md:col-span-2 lg:col-span-1 px-5 ">
                    <div role="tablist" className="tabs tabs-lifted">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="La tua squadra"
                               checked/>
                        <div role="tabpanel" className="tab-content max-w-screen bg-base-100 border-base-300 rounded-box p-6 drop-shadow-xl">

                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tab"
                               aria-label="Classifica generale"/>
                        <div role="tabpanel" className="tab-content max-w-screen bg-base-100 border-base-300 rounded-box p-6 drop-shadow-xl">
                            <div className="md:col-span-2 lg:col-span-1">

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer/>
        </>
    )
}


export default Dashboard