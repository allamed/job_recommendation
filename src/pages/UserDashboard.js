import React from 'react';
import RecommendedJobOffers from './RecommendedJobOffers';
import JobOffers from "./JobOffers";

const UserDashboard = ({userName}) => {
    // ID de l'utilisateur
    const utilisateurId = '11';


    return (
        <div>





            <RecommendedJobOffers utilisateurId={utilisateurId} userName={userName}/>
            {/* Ajoutez d'autres composants et fonctionnalités pour le tableau de bord utilisateur */}
        </div>
    );
};

export default UserDashboard;
