import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import {
    PencilIcon,
    TrashIcon,
    BookmarkIcon,
} from "@heroicons/react/24/solid";
import { ProfileInfoCard} from "@/widgets/cards/index.js";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Footer, NavbarSimple} from "@/widgets/layout/index.js";


export function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get('/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedUserData({ ...userData });
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token non trovato');
            }

            await axios.put('/api/updateProfile', editedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setIsEditing(false);

            // Aggiorna i dati dell'utente solo dopo il successo della richiesta
            setUserData(editedUserData);
        } catch (error) {
            console.error('Errore durante il salvataggio delle modifiche:', error);
        }
    };

    const handleCancelChanges = () => {
        setIsEditing(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>No user data available</div>;
    }

    return (
        <>
            <NavbarSimple />
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/banner-profile.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src="/img/bruce-mars.jpeg"
                                alt="bruce-mars"
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-1">
                                    {userData.username}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600"
                                >
                                    {userData.badges} at Fantarinuncia
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                        <ProfileInfoCard
                            title="Profile Information"
                            description={
                                isEditing ? (
                                    <textarea
                                        className="w-full h-32 p-2 border border-blue-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                        value={editedUserData.bio}
                                        onChange={(e) => setEditedUserData({ ...editedUserData, bio: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-blue-gray-700">{userData.bio}</p>
                                )
                            }
                            details={{
                                nome: userData.nome,
                                cognome: userData.cognome,
                                location: "Italy",
                            }}
                            action={
                                isEditing ? (
                                    <>
                                        <div className="flex space-x-2">
                                            <button className="btn btn-sm border-0 bg-white flex items-center"
                                                    onClick={handleSaveChanges}>
                                                <BookmarkIcon className="h-4 w-4 mr-1" strokeWidth={1.5}/>
                                                Salva
                                            </button>
                                            <button className="btn btn-sm border-0 bg-white flex items-center"
                                                    onClick={handleCancelChanges}>
                                                <TrashIcon className="h-4 w-4 mr-1" strokeWidth={1.5}/>
                                                Annulla
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <Tooltip content="Edit Profile">
                                        <PencilIcon
                                            className="h-4 w-4 cursor-pointer text-blue-gray-500"
                                            onClick={handleEditClick}
                                        />
                                    </Tooltip>
                                )
                            }
                        />
                        <div className="px-4 pb-4">
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Projects
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                You have not created any projects yet.
                            </Typography>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Footer />
        </>
    );
}
export default Profile;
