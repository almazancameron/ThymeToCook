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
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import Face2Icon from "@mui/icons-material/Face2";
import { useNavigate } from "react-router-dom";

import Image from "../../images/hero--image.jpg";
import Recipes from "./Recipies";
import { useAuth } from "../../context/AuthContext";

export default function HomeIP() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const logout = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleClick(e) {
    console.log(e.currentTarget.id);
    switch (e.currentTarget.id) {
      case "mealPlans":
        navigate("/mealplans");
        break;
      case "recipes":
        navigate("/");
        break;
      case "ingredients":
        navigate("/");
        break;
      case "grocery":
        navigate("/");
        break;
      case "login":
        navigate("/login");
        break;
      case "signup":
        navigate("/signup");
        break;
      case "signout":
        logout();
        navigate("/");
      default:
        navigate("/");
        break;
    }
  }

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {/* <Recipes /> */}
    </>
  );
}
