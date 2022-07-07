import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { FaEllipsisV } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineQuiz } from "react-icons/md";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userName, setUserName] = useState("Login");
  const [user] = useAuthState(getAuth());
  const [photoURL, setPhotoURL] = useState("");
  const [logout, setLogout] = useState(null);

  const pages = ["Feed"];
  const settings = [userName, "Profile", "Logout"];

  const settingsIcons = {
    Profile: <CgProfile />,
    Logout: <HiOutlineLogout />,
  };

  useEffect(() => {
    if (user) {
      user.reload().then(() => {
        const refreshUser = getAuth().currentUser;
        setUserName(refreshUser.displayName);
        setPhotoURL(refreshUser.photoURL);
      });
    }
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function getProfileImage() {
    if (photoURL) {
      return photoURL;
    }
    return "";
  }

  function signUserOut() {
    getAuth().signOut();
    window.location.href = "/";
  }

  function getSettingOnClickHandler(setting) {
    if (setting === "Logout") {
      return signUserOut;
    }
    return handleCloseUserMenu;
  }

  function getHrefForSettingsMenu(setting) {
    if (setting === "Profile") {
      return "/profile";
    }
    if (setting === "Login") {
      return "/login";
    }
    if (setting === "Feed") {
      return "/feed";
    }
    return "/";
  }

  return (
    <AppBar position="fixed" className="header-background">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            347s
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Button variant="text" href={getHrefForSettingsMenu(page)}>
                    {page}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            347s
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user ? <Avatar alt="Profile Image" src={photoURL} /> : null}
              <FaEllipsisV style={{ color: "white" }} />
            </IconButton>
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
              {settings.map((setting) => {
                return (
                  <MenuItem
                    key={setting}
                    onClick={getSettingOnClickHandler(setting)}
                  >
                    <Button
                      variant="text"
                      href={getHrefForSettingsMenu(setting)}
                    >
                      {settingsIcons[setting]} &nbsp;
                      {setting}
                    </Button>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
