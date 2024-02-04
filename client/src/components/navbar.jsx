import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const NavBar = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    try {
      const res = await axios.get("logout");
      const { message } = res.data;
      if (currentUser) localStorage.removeItem("user");
      toast.success(message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <AppBar position="static" fullwidth sx={{backgroundColor: 'white', color: 'text.secondary', boxShadow: '1px'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eventify
          </Typography>
          <Button component={Link} to={"/"} color="inherit">
            Home
          </Button>
          {currentUser ? (
            <>
              <Button
                id="basic-button"
                startIcon={<AccountCircleIcon />}
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
                aria-haspopup="true"
              >
                {currentUser.firstName}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/attendingevents");
                  }}
                >
                  Attending Events
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/userevents");
                  }}
                >
                  My Events
                </MenuItem>
              </Menu>
              {currentUser.isAdmin ? (
                <>
                  <Button
                    startIcon={<AdminPanelSettingsIcon />}
                    component={Link}
                    to={"/admindashboard"}
                    color="inherit"
                  >
                    Admin Dashboard
                  </Button>
                </>
              ) : (
                <></>
              )}
              <Button
                startIcon={<LogoutIcon />}
                onClick={logOut}
                color="inherit"
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<LoginIcon />}
                component={Link}
                to={"/sign-in"}
                color="inherit"
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to={"/sign-up"}
                startIcon={<AssignmentIndIcon />}
                color="inherit"
              >
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
