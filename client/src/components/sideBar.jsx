import {
  Accordion,
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import axios from "axios";
import toast from "react-hot-toast";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Container } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SideBar = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(false);

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
      <Container sx={{ display: "flex" }}>
        <Drawer open={true} variant="persistent">
          <Divider />
          <List>
            <ListItem>
              <ListItemButton component={Link} to={"/"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
            {currentUser ? (
              <>
                <ListItem>
                  <ListItemButton onClick={() => setAnchorEl(!anchorEl)}>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText>{currentUser.firstName}</ListItemText>
                  </ListItemButton>
                </ListItem>
                <Collapse in={anchorEl}>
                  <Divider />

                  <ListItem sx={{ pl: 5 }}>
                    <ListItemButton
                      onClick={() => {
                        navigate("/attendingevents");
                      }}
                    >
                      <ListItemText>Attending Events</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ pl: 5 }}>
                    <ListItemButton
                      onClick={() => {
                        navigate("/userevents");
                      }}
                    >
                      <ListItemText>My Events</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Collapse>
                {currentUser.isAdmin ? (
                  <>
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          navigate("/admindashboard");
                        }}
                      >
                        <ListItemIcon>
                          <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText>Admin Dashboard</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </>
                ) : (
                  <></>
                )}
                <ListItem>
                  <ListItemButton onClick={logOut}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <ListItemButton component={Link} to={"/sign-in"}>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText>Sign In</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} to={"/sign-up"}>
                    <ListItemIcon>
                      <AssignmentIndIcon />
                    </ListItemIcon>
                    <ListItemText>Sign up</ListItemText>
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Container>
    </>
  );
};

export default SideBar;
