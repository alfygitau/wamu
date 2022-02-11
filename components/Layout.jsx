import {
  AppBar,
  Badge,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Switch,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import Cookies from "js-cookie";
import Head from "next/head";
import {useRouter} from "next/router";
import React, { useContext } from "react";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";

export default function Layout({ title, description, children }) {
  const router = useRouter()
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const {cartItems} = cart;
  
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const [anchorEl, setAchorEl] = React.useState(null);

  const loginClickHandler = (e) => {
    setAchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = () => {
    setAchorEl(null);
  };

  const logoutClickHandler = () => {
    setAchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push('/')
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - WAMU Store` : "WAMU Store"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Link href="/" style={{ textDecoration: "none" }}>
              {" "}
              <Typography className={classes.brand}>WAMU Store</Typography>
            </Link>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <Link href="/cart" style={{ textDecoration: "none" }}>
                <Typography component="span">
                  {cartItems?.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cartItems?.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Typography>
              </Link>
              {userInfo ? (
                <>
                  <Button
                    className={classes.navbarButton}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                  >
                    <div style={{color:"orange"}}>{userInfo.name}</div>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseHandler}>
                      My Account
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All Rights Reserved. WAMU Store</Typography>
      </footer>
    </div>
  );
}
