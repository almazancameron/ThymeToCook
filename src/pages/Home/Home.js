import React from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  MenuList,
  Paper,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
} from "@mui/material";
import NavBar from "../../AppBar";
import RandomRecipes from "./RandomRecipes"
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import Face2Icon from "@mui/icons-material/Face2";
import { useNavigate } from "react-router-dom";

import Image from "../../images/hero--image.jpg";
import Recipes from "./RandomRecipes";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";


export default function Home() {
  

  return (
    <>
      <NavBar/>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${Image})`,
        }}
      >
        {<img src={`url(${Image})`} alt="" />}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" paragraph>
                Start cooking with us, and you'll save thyme.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <RandomRecipes />
    </>
  );
}
