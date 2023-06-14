import React, {useEffect, useState} from "react";
import {runCypherQuery} from "./Neo4jConnector";
import SignInForm from "./SignInForm";
import Grid from "@mui/material/Grid";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import Offers from "./Offers";
import jobOffers from "./JobOffers";

function Employer() {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [competences, setCompetences] = useState([]);
    const [competencesOptions, setCompetencesOptions] = useState([]);
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [offerExists, setOfferExists] = useState(false);

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
    const displayCandidates = async (jobOffer) => {
        const query = `
            MATCH (u:Utilisateur)-[:HAS_COMPETENCE]->(c:Competence)<-[:requires_competence]-(j:JobOffer {titre: '${jobOffer}'})
            RETURN u.nom AS nom, u.email AS email, u.motDePasse AS motDePasse, collect(c.nom) AS competences
        `;
        const result = await runCypherQuery(query);
        const cans = result.map((record) => record);
        console.log(cans);
        setCandidates(cans);
        setOfferExists(true);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Exécutez la requête Cypher pour créer un nouvel utilisateur avec ses compétences
        const query = `
            CREATE (j:JobOffer {titre: '${nom}', email: '${email}'})
            WITH j
            UNWIND ${JSON.stringify(competences)} AS competence
            MERGE (c:Competence {nom: competence})
            CREATE (j)-[:requires_competence]->(c)
            RETURN j.titre AS titre
            
             
        `;
        const result = await runCypherQuery(query);
        const jobOffer = result[0].titre;
        console.log(jobOffer);
        displayCandidates(jobOffer);

        // Faites quelque chose avec l'ID du nouvel utilisateur, comme le stocker dans le state ou le rediriger vers une page appropriée
    };





    return (
        <div style={{margin:70}}>
            <h2>Créer une offre d'emploi</h2>
            <form onSubmit={handleSubmit}>
                {/* Champs du formulaire d'inscription */}
                <label className="form__label">
                    Titre:
                    <input className="form__input" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </label>
                <br />
                <label className="form__label">
                    Email pour postuler:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form__input" />
                </label>
                <br />

                <label className="form__label">
                    Compétences requises:
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
                >Créer l'offre d'emploi</button>

                {/* Bouton pour passer au formulaire deconnexion */}


            </form>
            {offerExists && <Offers offers={candidates} employer={true}/>}
        </div>
    );
};
export default Employer;