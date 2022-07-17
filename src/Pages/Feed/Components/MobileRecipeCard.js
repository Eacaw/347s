import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function MobileRecipeCard(props) {
  const [recipeData, setRecipeData] = useState(props.recipeData);

  useEffect(() => {
    setRecipeData(props.recipeData);
  }, [props.recipeData]);

  return (
    <Card sx={{ minWidth: 300, maxWidth: 345, borderRadius: 5 }} elevation={5}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={recipeData.Images[0]}
          referrerPolicy="no-referrer"
          alt="Recipe Image"
          elevation={4}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipeData.Title}
          </Typography>

          <Divider variant="middle" />
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            {recipeData.ShortDescription}
          </Typography>
          <br />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MobileRecipeCard;
