import React from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  MenuItem,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
} from "@mui/material";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import Logo from "./images/logo.png"
import Face2Icon from "@mui/icons-material/Face2";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../src/context/AuthContext";
import { useGrocery } from "./context/GroceryContext";

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { logOut } = useAuth();
  const {toggleViewGroceryModal} = useGrocery();
  
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
    console.log(e.currentTarget.id);
    switch (e.currentTarget.id) {
      case "mealPlans":
        navigate("/mealplans");
        break;
      case "recipes":
        navigate("/recipes");
        break;
      case "ingredients":
        navigate("/");
        break;
      case "grocery":
        toggleViewGroceryModal();
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
    <AppBar position="static"  sx={{color: "primary"}}>
      <Container maxwidth="x1">
        <Toolbar disableGutters>
          <Box
          component="img"
          sx={{
            height: 50,
            maxHeight: { md: 75 }, 
            mr: 2,
          }}
          alt="Logo"
          src={Logo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor:'pointer'
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
              <Typography textAlign="center" onClick={handleClick} id="recipes">
                Recipes
              </Typography>
            </MenuItem>
            <MenuItem key="grocery">
              <Typography textAlign="center" onClick={handleClick} id="grocery">
                Grocery List
              </Typography>
            </MenuItem>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {auth.currentUser?.email}&nbsp;
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
                <Typography textAlign="center" onClick={handleClick} id="login">
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
  );
}
