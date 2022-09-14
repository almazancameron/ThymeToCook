import React from "react";
import {
  AppBar,
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
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import Face2Icon from "@mui/icons-material/Face2";
import { useNavigate } from "react-router-dom";

import Image from "../../images/hero--image.jpg";
import Recipes from "./Recipies";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
// import { logOut } from "../../context/AuthContext";

export default function HomeIP() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { logOut } = useAuth();

  const signUserOut = async () => {
    console.log(auth.currentUser.email);
    const result = await logOut(auth.currentUser);
    console.log("Entered sign out functions");
    console.log(auth.currentUser.email);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleClick(e) {
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
        signUserOut();
        navigate("/");
      default:
        navigate("/");
        break;
    }
  }

  return (
    <>
      <AppBar position="static">
        <Container maxwidth="x1">
          <Toolbar disableGutters>
            <RamenDiningIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ThymeToCook
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <MenuItem key="mealPlans">
                <Typography
                  textAlign="center"
                  onClick={handleClick}
                  id="mealPlans"
                >
                  Meal Plans
                </Typography>
              </MenuItem>
              <MenuItem key="recipes">
                <Typography
                  textAlign="center"
                  onClick={handleClick}
                  id="recipes"
                >
                  Recipes
                </Typography>
              </MenuItem>
              <MenuItem key="Ingredients">
                <Typography
                  textAlign="center"
                  onClick={handleClick}
                  id="ingredients"
                >
                  Ingredients
                </Typography>
              </MenuItem>
              <MenuItem key="grocery">
                <Typography
                  textAlign="center"
                  onClick={handleClick}
                  id="grocery"
                >
                  Grocery List
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Face2Icon
                    sx={{
                      display: { xs: "none", md: "flex" },
                      mr: 1,
                      color: "#fff",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="login" onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={handleClick}
                    id="login"
                  >
                    Login
                  </Typography>
                </MenuItem>
                <MenuItem key="signup" onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={handleClick}
                    id="signup"
                  >
                    Sign Up
                  </Typography>
                </MenuItem>
                <MenuItem key="signout" onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={handleClick}
                    id="signout"
                  >
                    Sign Out
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
