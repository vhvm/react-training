import { Typography } from "@mui/material";
import * as React from "react";

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant='h3'> This is Mario's learning page</Typography>
    </div>
  );
};

export default Home;
