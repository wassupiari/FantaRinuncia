import React from 'react';
import PropTypes from 'prop-types';
import {
    StarIcon
} from "@heroicons/react/24/solid";


function PersonCard({ person }) {

    return (
        <div className="w-full xl:w-70 px-3 mb-6 flex justify-center">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-xs">
                <div className="p-5 h-full flex flex-col justify-between">
                    <p className="text-center text-gray-900 font-semibold text-xl mb-2">
                        {person.firstname} {person.lastname}
                    </p>
                    <p className="text-center text-pink-500 font-bold text-md mb-6">
                        {person.points} distasi
                    </p>
                    <input
                        type="checkbox"
                        id={`btn-check-${person.id}`}
                        className="hidden btn-check"
                        autoComplete="off"
                    />
                    <label
                        htmlFor={`btn-check-${person.id}`}
                        className="w-1/30 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-1 rounded-md text-center cursor-pointer transition duration-300 ease-in-out flex items-center justify-center"
                    >
                        <StarIcon className="h-4 w-4 mr-1" strokeWidth={1.5}/>
                        Scegli me
                    </label>
                </div>
            </div>
        </div>


    );
}

PersonCard.propTypes = {
    person: PropTypes.shape({
        id: PropTypes.number,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired
    })
};

export default PersonCard;
