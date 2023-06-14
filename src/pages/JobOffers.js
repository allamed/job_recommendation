import React, { useEffect, useState } from 'react';
import { runCypherQuery } from './Neo4jConnector';
import Offers from "./Offers";

const JobOffers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchJobOffers = async () => {
            const query = 'MATCH (o:OffreEmploi) RETURN o';
            const result = await runCypherQuery(query);
            setOffers(result);
        };

        fetchJobOffers();
    }, []);

    return (
        <div>
            <h2 style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                margin: "20px 0",
                fontFamily:"'Open Sans', Arial, sans-serif"
            }}>Liste des offres d'emploi</h2>
            <ul>
               <Offers offers={offers} />
            </ul>
        </div>
    );
};

export default JobOffers;
