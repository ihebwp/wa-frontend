import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../app/features/authSlice.js";
import {
  Typography,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DarkModeContext } from "../../contexte/index.jsx";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="/register">
        You don't have an account? Create ONE!
      </Link>
    </Typography>
  );
}

const theme = createTheme();

export default function Authentification() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const responseGoogle = (response) => {
    console.log(response);
    // Send the response.accessToken to your backend
    // for authentication and user session creation
  }

  const responseFacebook = (response) => {
    console.log(response);
    // Send the response.accessToken to your backend
    // for authentication and user session creation
  }
  const { email, password } = formData;
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user && user.token !== null) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        style={{
          color: darkMode ? "#000" : "#fff",
          backgroundColor: darkMode ? "#fff" : "#000",
margin:'3%'
        }}
        container
        component="main"
        sx={{ height: "100vh", width: "100%" }}
      >
        <CssBaseline />
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://cdn.youcan.shop/stores/fdb409a17b48c52c88a09bf1518a01a9/others/cvALhfnPIUe728CPyRCcG7JoUeC2vL76l7gPjCWR.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "60%",
            backgroundPosition: "center",
          }}
        /> */}
        <Grid
          style={{
            color: darkMode ? "#000" : "#fff",
            backgroundColor: darkMode ? "#fff" : "#000",
            margin: "0 auto",
          }}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
              />
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SignIn
              </Button>
             
         
     
              <Copyright
                style={{
                  color: darkMode ? "#000" : "#fff",
                  backgroundColor: darkMode ? "#fff" : "#000",
                }}
                sx={{ mt: 5 }}
              />
            </Box>
            {/* <Box sx={{ mt: 1 }}>
            <GoogleLogin
             style= {{width:'100%'}}
        clientId="YOUR_CLIENT_ID"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
            </Box>
            <Box sx={{ mt: 1 }}>
            <FacebookLogin
        appId="YOUR_APP_ID"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
            </Box> */}
          
          </Box>
        </Grid>
        
      </Grid>
    </ThemeProvider>
  );
}
