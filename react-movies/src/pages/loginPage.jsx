import React, { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router";
import { AuthContext } from "../contexts/authContext";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const LoginPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  const { from } = location.state
    ? { from: location.state.from.pathname }
    : { from: "/" };

  const login = async () => {
    await context.authenticate(userName, password);
  };
  if (context.isAuthenticated === true) {
    return <Navigate to={from} replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Login
        </Typography>

        <Typography sx={{ mb: 2 }} textAlign="center">
          You must log in to view protected pages
        </Typography>

        <TextField
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 3 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={login}
        >
          Log in
        </Button>

        <Typography sx={{ mt: 3 }} textAlign="center">
          Not registered? <Link to="/signup">Sign Up!</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
