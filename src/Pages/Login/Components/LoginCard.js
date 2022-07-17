import { Button, Card, CardContent, CardMedia } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";

function LoginCard() {
  const signInWithGoogle = (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider);
  };

  return (
    <Card sx={{ minWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://thumbs.dreamstime.com/b/low-poly-spring-summer-landscape-d-geometric-mountain-forest-illustration-pink-trees-dawn-sunrise-view-65717403.jpg"
        referrerPolicy="no-referrer"
        alt="Magic Eraser Quiz"
      />
      <CardContent>
        <Button
          size="small"
          color="info"
          variant="contained"
          align="center"
          onClick={signInWithGoogle}
          endIcon={<FaGoogle />}
        >
          Login with google
        </Button>
      </CardContent>
    </Card>
  );
}

export default LoginCard;
