import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function MobileRecipeCard(props) {
  const [recipeData, setRecipeData] = useState(props.recipeData);

  useEffect(() => {
    setRecipeData(props.recipeData);
  }, [props.recipeData]);

  return (
    <Card sx={{ minWidth: 345, maxWidth: 390 }} className="rounded-corners">
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={recipeData.Images[0]}
          referrerPolicy="no-referrer"
          alt="Recipe Image"
          elevation={2}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipeData.Title}
          </Typography>

          <Divider variant="middle" />
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>About:</strong> {recipeData.ShortDescription}
          </Typography>
          <br />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MobileRecipeCard;
