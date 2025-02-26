import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { DarkModeContext } from "../contexte/index";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CottageIcon from "@mui/icons-material/Cottage";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../app/features/authSlice";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";
import GroupIcon from "@mui/icons-material/Group";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import logoC from "../../src/Images/1.png"
import DashboardIcon from "@mui/icons-material/Dashboard"; // Import Dashboard Icon

export default function Appbar() {
  const { cartList } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [connectedUser, setconnectedUser] = React.useState(false);
  const [darkMode, setDarkMode] = React.useContext(DarkModeContext);

  const linkStyle = {
    textDecoration: "none",
    color: darkMode ? "#000" : "#fff",
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user !== null) {
      setconnectedUser(user);
    }
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        {connectedUser ? (
          <Link
            aria-label="Logout"
            className="navbar-link"
            to="/"
            onClick={() => dispatch(logout())}
          >
            <span
              style={{ color: darkMode ? "#0f3460" : "#fff" }}
              className="nav-link-label"
            >
              Logout
            </span>
          </Link>
        ) : (
          <Link
            style={{ color: darkMode ? "#000" : "#fff" }}
            aria-label="Login"
            to="/login"
            className="login"
          >
            <span
              style={{ color: darkMode ? "#000" : "#fff" }}
              className="nav-link-label"
            >
              Login
            </span>
          </Link>
        )}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem style={{ backgroundColor: darkMode ? "#0f3460" : "#fff" }}>
        <Link aria-label="Go to Shop Page" className="navbar-link" to="/">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <CottageIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
          </IconButton>
          <span
            style={{ color: darkMode ? "#fff" : "#0f3460" }}
            className="nav-link-label"
          >
            Home
          </span>
        </Link>
      </MenuItem>
      <MenuItem style={{ backgroundColor: darkMode ? "#0f3460" : "#fff" }}>
        <Link aria-label="Go to Shop Page" className="navbar-link" to="/shop">
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <StoreIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
          </IconButton>
          <span
            style={{ color: darkMode ? "#fff" : "#0f3460" }}
            className="nav-link-label"
          >
            Shop
          </span>
        </Link>
      </MenuItem>
      {user && user.role === "admin" && (
        <MenuItem style={{ backgroundColor: darkMode ? "#0f3460" : "#fff" }}>
          <Link
            aria-label="Go to Shop Page"
            className="navbar-link"
            to="/commands"
          >
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <LocalMallIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
            </IconButton>
            <span
              style={{ color: darkMode ? "#fff" : "#0f3460" }}
              className="nav-link-label"
            >
              Commands
            </span>
          </Link>
        </MenuItem>
      )}
      {user && user.role === "admin" && (
        <MenuItem style={{ backgroundColor: darkMode ? "#0f3460" : "#fff" }}>
          <Link
            style={linkStyle}
            aria-label="Go to Users Page"
            className="navbar-link"
            to="/users"
          >
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <GroupIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
            </IconButton>
            <span
              style={{ color: darkMode ? "#fff" : "#0f3460" }}
              className="nav-link-label"
            >
              Users
            </span>
          </Link>
        </MenuItem>
      )}

      <MenuItem style={{ backgroundColor: darkMode ? "#0f3460" : "#fff" }}>
        <Link aria-label="Go to Shop Page" className="navbar-link" to="/cart">
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error">
              <ShoppingCartIcon
                style={{ color: darkMode ? "#fff" : "#0f3460" }}
              />
            </Badge>
          </IconButton>
          <span
            style={{ color: darkMode ? "#fff" : "#0f3460" }}
            className="nav-link-label"
          >
            Cart
          </span>
        </Link>
      </MenuItem>

      <MenuItem
        onClick={handleProfileMenuOpen}
        style={{ backgroundColor: darkMode ? "#0f3460" : "#fff" }}
      >
        {connectedUser ? (
          <Link
            style={linkStyle}
            aria-label="Logout"
            className="navbar-link"
            to="/"
            onClick={() => dispatch(logout())}
          >
            <IconButton
              title={`Connected As: ${connectedUser?.user?.name}`}
              size="large"
              color="inherit"
            >
              <LogoutIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
              <span
                style={{ color: darkMode ? "#fff" : "#0f3460" }}
                className="nav-link-label"
              >
                Logout
              </span>
            </IconButton>
          </Link>
        ) : (
          <Link
            style={linkStyle}
            aria-label="Login"
            to="/login"
            className="login"
          >
            <IconButton title="Login" size="large" color="inherit">
              <AccountCircle style={{ color: darkMode ? "#fff" : "#0f3460" }} />
              <span
                style={{ color: darkMode ? "#fff" : "#0f3460" }}
                className="nav-link-label"
              >
                Login
              </span>
            </IconButton>
          </Link>
        )}
      </MenuItem>
      <MenuItem style={{ backgroundColor: darkMode ? "#0f3460" : "#fff" }}>
        <IconButton
          size="large"
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
        >
          {darkMode ? (
            <i>
              <LuSun color="white" />
              <span
                style={{ color: darkMode ? "#fff" : "#0f3460" }}
                className="nav-link-label"
              >
                Dark
              </span>
            </i>
          ) : (
            <i>
              <IoMoon color="black" />
              <span
                style={{ color: darkMode ? "#fff" : "#0f3460" }}
                className="nav-link-label"
              >
                Light
              </span>
            </i>
          )}
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: darkMode ? "#0f3460" : "#fff" }}>
        <Toolbar>
           {/* Dashboard Logo with Link */}
           
        <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton title="Dashboard" size="large" color="inherit">
            <DashboardIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
          </IconButton>
        </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: darkMode ? "#fff" : "#0f3460",
            }}
          >
            
            <img src={logoC} width={40}></img>
            {/* <strong style={{fontSize:'28px',color:'Highlight'}}>C</strong> */}
            Commerce
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              style={linkStyle}
              aria-label="Go to Shop Page"
              className="navbar-link"
              to="/"
            >
              <IconButton
                title="Home"
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <CottageIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
              </IconButton>
            </Link>

            <Link
              style={linkStyle}
              aria-label="Go to Shop Page"
              className="navbar-link"
              to="/shop"
            >
              <IconButton
                title="Shop"
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <StoreIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
              </IconButton>
            </Link>
            <Link
              style={linkStyle}
              aria-label="Go to Shop Page"
              className="navbar-link"
              to="/cart"
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={cartList.length} color="error">
                  <ShoppingCartIcon
                    style={{ color: darkMode ? "#fff" : "#0f3460" }}
                  />
                </Badge>
              </IconButton>
            </Link>
            <Link
              title="Users list"
              style={linkStyle}
              aria-label="Go to Shop Page"
              className="navbar-link"
              to="/users"
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <GroupIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
              </IconButton>
            </Link>
            <Link
              title="Commands list"
              style={linkStyle}
              aria-label="Go to Shop Page"
              className="navbar-link"
              to="/commands"
            >
              <IconButton size="large" color="inherit">
                <LocalMallIcon
                  style={{ color: darkMode ? "#fff" : "#0f3460" }}
                />
              </IconButton>
            </Link>
            {connectedUser ? (
              <Link
                style={linkStyle}
                aria-label="Logout"
                className="navbar-link"
                to="/"
                onClick={() => dispatch(logout())}
              >
                <IconButton
                  title={`Connected As: ${connectedUser?.user?.name}`}
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <LogoutIcon
                    style={{ color: darkMode ? "#fff" : "#0f3460" }}
                  />
                </IconButton>
              </Link>
            ) : (
              <Link
                style={linkStyle}
                aria-label="Login"
                to="/login"
                className="login"
              >
                <IconButton
                  title="Login"
                  size="large"
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle
                    style={{
                      color: darkMode ? "#fff" : "#0f3460",
                      marginTop: "50%",
                    }}
                  />
                </IconButton>
              </Link>
            )}

            <IconButton
              size="medium"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => setDarkMode(!darkMode)}
              color="inherit"
            >
              {darkMode ? (
                <i>
                  <LuSun color="white" />
                </i>
              ) : (
                <i>
                  <IoMoon color="black" />
                </i>
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: darkMode ? "#fff" : "#0f3460" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
