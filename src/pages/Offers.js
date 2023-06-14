import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import React from "react";
import {stringAvatar} from "./RecommendedJobOffers";

const Offers=({offers, employer})=>{
  if(!employer) return(

        <Grid container spacing={2}>
            {offers.filter(
                (item, index) => offers.findIndex((i) => i.o.properties.titre === item.o.properties.titre) === index
            ).map((recommandation) => (
                <div style={{margin:15}}>
                    <Card sx={{ maxWidth: 345 }} >
                        <div>



                            <CardContent>
                                <div style={{display:"flex", alignItems:"center" ,margin:15}}>
                                    <Avatar {...stringAvatar(recommandation.o.properties.titre)} key={recommandation.o.properties.id} />
                                    <div style={{marginLeft:20}}>


                                        <Typography gutterBottom variant="h5" component="div" >
                                            {recommandation.o.properties.titre}
                                        </Typography>
                                    </div>
                                </div>

                                <Typography variant="body2" color="text.secondary">
                                    {recommandation.o.properties.description || " "}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </div>
                    </Card>

                </div>
            ))}
        </Grid>
    );
  else return(
      <>
          <h2> Candidats potentiels</h2>

      <Grid container spacing={2}>

          {offers.map((recommandation) => (
              <div style={{margin:15}}>
                  <Card sx={{ maxWidth: 345 }} >
                      <div>



                          <CardContent>
                              <div style={{display:"flex", alignItems:"center" ,margin:15}}>
                                  <Avatar {...stringAvatar(recommandation.nom)} key={recommandation.id} />
                                  <div style={{marginLeft:20}}>


                                      <Typography gutterBottom variant="h5" component="div" >
                                          {recommandation.nom}
                                      </Typography>
                                  </div>
                              </div>

                              <Typography variant="body2" color="text.secondary">
                                  {recommandation.email || " "}
                              </Typography>
                          </CardContent>
                          <CardActions>
                              <Button size="small">Share</Button>
                              <Button size="small">Learn More</Button>
                          </CardActions>
                      </div>
                  </Card>

              </div>
          ))}
      </Grid>
      </>
  );
}
export default Offers;