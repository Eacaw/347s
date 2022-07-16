import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MobileRecipeCard from "./Components/MobileRecipeCard";

function Feed() {
  const db = getFirestore();

  const recipeObjRef = collection(db, "Recipes");
  const q = query(recipeObjRef, orderBy("Contributor.Date", "asc"));
  const [recipeObjects] = useCollectionData(q);

  return (
    <div className="flex-center top-padding-navbar">
      <div className="center-align-question-cards">
        {recipeObjects &&
          recipeObjects.slice(0).map((recipeObj) => {
            return recipeObj ? (
              <MobileRecipeCard key={recipeObj.uid} recipeData={recipeObj} />
            ) : null;
          })}
      </div>
    </div>
  );
}

export default Feed;
