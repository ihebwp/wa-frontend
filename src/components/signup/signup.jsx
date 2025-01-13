import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../app/features/authSlice.js";
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
      You already have an account{" "}
      <Link color="inherit" href="/login">
        Login!
      </Link>
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });

  const { name, email, password, passwordConfirm, role } = formData;
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

    if (isSuccess || user) {
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

    // Validate password match
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
      passwordConfirm,
      role,
    };

    dispatch(register(userData));
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
          margin: "3%"
        }}
        container
        component="main"
        sx={{ height: "100vh" }}
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
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={onChange}
              />
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
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                value={passwordConfirm}
                onChange={onChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Copyright
                style={{
                  color: darkMode ? "#000" : "#fff",
                  backgroundColor: darkMode ? "#fff" : "#000",
                }}
                sx={{ mt: 5 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
