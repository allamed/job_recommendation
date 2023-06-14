import React, { useState, useEffect } from 'react';
import { runCypherQuery } from './Neo4jConnector';
import SignInForm from './SignInForm';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import Grid from "@mui/material/Grid";


const SignUpForm = ({setUserName, setSignedIn}) => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [competences, setCompetences] = useState([]);
    const [competencesOptions, setCompetencesOptions] = useState([]);
    const [showSignInForm, setShowSignInForm] = useState(false);

    useEffect(() => {
        // Exécutez la requête Cypher pour récupérer les compétences existantes
        const fetchCompetences = async () => {
            const query = `
                MATCH (c:Competence)
                RETURN c.nom AS nom
            `;
            const result = await runCypherQuery(query);
            const options = result.map((record) => record.nom);
            setCompetencesOptions(options);
        };

        fetchCompetences();
    }, []);

    const handleCompetenceChange = (event) => {
        const { value, checked } = event.target;

        // Update the competences state based on the checked/unchecked value
        if (checked) {
            setCompetences((prevCompetences) => [...prevCompetences, value]);
        } else {
            setCompetences((prevCompetences) =>
                prevCompetences.filter((competence) => competence !== value)
            );
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Exécutez la requête Cypher pour créer un nouvel utilisateur avec ses compétences
        const query = `
            CREATE (u:Utilisateur {nom: '${nom}', email: '${email}', motDePasse: '${motDePasse}'})
            WITH u
            UNWIND ${JSON.stringify(competences)} AS competence
            MERGE (c:Competence {nom: competence})
            CREATE (u)-[:HAS_COMPETENCE]->(c)
            RETURN u.nom AS nom
        `;
        const result = await runCypherQuery(query);
        const nouvelUtilisateur = result[0].nom;
        console.log(nouvelUtilisateur);
        setUserName(nouvelUtilisateur);

        // Faites quelque chose avec l'ID du nouvel utilisateur, comme le stocker dans le state ou le rediriger vers une page appropriée
    };

    const handleSwitchToSignIn = () => {
        setSignedIn(true);
    };

    if (showSignInForm) {
        return <SignInForm />;
    }

    return (
        <div style={{margin:70}}>
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit}>
                {/* Champs du formulaire d'inscription */}
                <label className="form__label">
                    Nom:
                    <input className="form__input" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </label>
                <br />
                <label className="form__label">
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form__input" />
                </label>
                <br />
                <label className="form__label">
                    Mot de passe:
                    <input className="form__input" type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
                </label >
                <br />
                <label className="form__label">
                    Compétences:
                </label>

                    <div className="form__select-container">
                      {/*  <select value={competences}
                                onChange={(e) => setCompetences(Array.from(e.target.selectedOptions, (option) => option.value))}
                                className="form__select"
                                multiple
                        >

                            {competencesOptions.map((competence) => (
                                <option key={competence} value={competence} >
                                    {competence}
                                </option>
                            ))}
                        </select>*/}
                     <div className={"form__select-container"} style={{margin:80}}>
                         <Grid container spacing={2}>
                         {competencesOptions.map((competence) => {

                         return(
                             <FormGroup>
                                 <FormControlLabel control={<Checkbox onChange={handleCompetenceChange} value={competence}/>} label={competence}

                                 />

                             </FormGroup>
                         )
                         })}
                            </Grid>
                        </div>
                    </div>





                <br />
                <button type="submit"
                className={"btn" }
                >Créer un compte</button>

                {/* Bouton pour passer au formulaire deconnexion */}
                <button className={"btn" } type="button" onClick={handleSwitchToSignIn}>
                   déjà membre ? Connectez-vous
                </button>

            </form>
        </div>
    );
};

export default SignUpForm;





