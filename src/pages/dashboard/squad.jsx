import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PersonCard from '@/widgets/cards/persona-info-card.jsx';
import { Footer, NavbarSimple } from "@/widgets/layout/index.js";
import Search from "@/widgets/layout/search.jsx";

function Squad({ data }) {
    const [filteredData, setFilteredData] = useState(data);

    const filterData = (query) => {
        const filtered = data.filter(person => {
            const fullName = `${person.firstname} ${person.lastname}`.toLowerCase();
            return fullName.includes(query.toLowerCase());
        });
        setFilteredData(filtered);
    };

    // Aggiungi una funzione per mostrare tutti i dati all'avvio senza alcuna ricerca
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    return (
        <>
            <NavbarSimple />
            <div className="container mx-auto py-5">
                <Search onSearch={filterData} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredData.map((person) => (
                        <div key={person.id}>
                            <PersonCard person={person} />
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

Squad.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            firstname: PropTypes.string.isRequired,
            lastname: PropTypes.string.isRequired,
            points: PropTypes.number.isRequired
        })
    ).isRequired
};

export default Squad;
