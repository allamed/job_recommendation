import React, { useState } from 'react';
import { runCypherQuery } from './Neo4jConnector';
import {Alert} from "@mui/material";
import { toast } from "react-toastify";

const SignInForm = ({setSignedIn, setUserName}) => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Exécutez la requête Cypher pour vérifier les informations de connexion de l'utilisateur
        const query = `
      MATCH (u:Utilisateur {email: '${email}', motDePasse: '${motDePasse}'})
      RETURN u.nom AS nom
    `;
        const result = await runCypherQuery(query);

        if (result.length > 0) {
            const utilisateur = result[0].nom;
            console.log("signed in user :",utilisateur);
            setUserName(utilisateur);
            // Faites quelque chose avec l'ID de l'utilisateur connecté, comme le stocker dans le state ou le rediriger vers une page appropriée
        } else {
            toast.error("Email ou mot de passe incorrect");

        }
    };

    function handleSwitchToSignUp() {
        setSignedIn(false);
    }

    return (
        <div style={{margin:70}}>
            <h2>Se connecter</h2>
            <form onSubmit={handleSubmit}>
                <label className="form__label">
                    Email:
                    <input className="form__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label className="form__label">
                    Mot de passe:
                    <input className="form__input" type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
                </label>
                <br />
                <button className={"btn" }  type="submit" >Trouver des offres d'emploi</button>
                <button className={"btn" }  type="button" onClick={handleSwitchToSignUp}>
                    c'est votre premiere fois?
                </button>
            </form>
        </div>
    );
};

export default SignInForm;
