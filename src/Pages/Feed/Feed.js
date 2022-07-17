import { collection, getFirestore, orderBy, query } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MobileRecipeCard from "./Components/MobileRecipeCard";
import { CircularProgress } from "@mui/material";

function Feed() {
  const db = getFirestore();

  const recipeObjRef = collection(db, "Recipes");
  const q = query(recipeObjRef, orderBy("Contributor.Date", "asc"));
  const [recipeObjects] = useCollectionData(q);

  return (
    <div className="flex-center top-padding-navbar">
      <div className="center-align-question-cards">
        {recipeObjects ? (
          recipeObjects.slice(0).map((recipeObj, idx) => {
            return recipeObj ? (
              <MobileRecipeCard
                key={recipeObj.Title + idx}
                recipeData={recipeObj}
              />
            ) : null;
          })
        ) : (
          <CircularProgress
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-50px",
              marginLeft: "-50px",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Feed;
