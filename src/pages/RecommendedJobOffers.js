import React, { useEffect, useState } from 'react';
import { runCypherQuery } from './Neo4jConnector';
import { Avatar } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Offers from "./Offers";

function stringToColor(string) {
    let hash = 0;
    let i;

    if (string)
    {


        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
    }
    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 3)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }


    return color;

}
export function stringAvatar(name) {
    if (name){


        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.charAt(0).toUpperCase()}`,
        };
    }

}

const RecommendedJobOffers = ({ utilisateurId , userName}) => {
    const [recommandations, setRecommandations] = useState([]);
    //function that takes an array1 on param , and returns an array2 that contains only distincts values of array1

    useEffect(() => {
        const fetchRecommendedJobOffers = async () => {
            // Exécutez la requête Cypher pour récupérer les offres recommandées pour l'utilisateur
            const query = `
        MATCH (u:Utilisateur)-[:HAS_COMPETENCE]->(c:Competence)<-[:requires_competence]-(o:JobOffer)
        WHERE u.nom = '${userName}'
        RETURN o
        LIMIT 5
      `;
            const result = await runCypherQuery(query);
            console.log("result fetch",result)
            setRecommandations(result);
        };

        fetchRecommendedJobOffers();
    }, [userName]);

    if (userName ) return (
         <div>
            <h2 style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                margin: "20px 0",
                fontFamily:"'Open Sans', Arial, sans-serif"
            }}>Offres d'emploi recommandées pour  {userName}</h2>
            <ul>
                 <Offers offers={recommandations}/>
            </ul>
        </div>
        );

};

export default RecommendedJobOffers;
