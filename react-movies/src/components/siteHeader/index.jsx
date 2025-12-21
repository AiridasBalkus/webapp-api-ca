import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../contexts/AuthContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();
  const context = useContext(AuthContext);


  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites", auth: true },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending", path: "/movies/trending" },
    { label: "My Reviews", path: "/myreviews", auth: true },
  ];
  //filters out menu options based on authentication status of the user
  const visibleMenuOptions = menuOptions.filter(
  (opt) => !opt.auth || context.isAuthenticated
);


  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #5a0b8f 0%, #7e3ff2 100%)", backdropFilter: "blur(6px)",boxShadow: "0 4px 12px rgba(0,0,0,0.25)",}}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            MOVIES!
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All the BEST Movies!
          </Typography>
          <Button variant="outlined" sx={{borderColor: "#30629bff",color: "#ffffffff","&:hover": {backgroundColor: "rgba(196, 185, 37, 0.15)",borderColor: "#5dd14eff",},}}component={Link} to="/search">
          <SearchIcon fontSize="primary" />
          Search
          </Button>
          {context.isAuthenticated ? (
            <>
              <Typography variant="subtitle1" sx={{ mx: 1 }}>
                Welcome{context.userName ? ` ${context.userName}` : ""}!
              </Typography>
              <Button color="inherit" onClick={() => context.signout()}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {visibleMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {visibleMenuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
