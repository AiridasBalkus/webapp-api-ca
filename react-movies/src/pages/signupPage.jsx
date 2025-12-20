import React, { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { Box, Paper, TextField, Button, Typography, Alert } from "@mui/material";

const SignUpPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    setError("");

    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      setError(
        "Password must be 8+ chars and include a letter, a digit and a special character (@$!%*#?&)."
      );
      return;
    }

    if (password !== passwordAgain) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await context.register(userName, password);
      setRegistered(result);
      if (!result) setError("Registration failed (username may already exist).");
    } catch (err) {
      setError(err?.message || "Registration failed.");
    }
  };

  if (registered === true) {
    return <Navigate to="/login" replace />;
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
          width: 520,
          p: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Sign Up
        </Typography>

        <Typography sx={{ mb: 2 }} textAlign="center">
          Register a username and password to log in.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password again"
          type="password"
          sx={{ mb: 3 }}
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />

        <Button variant="contained" fullWidth size="large" onClick={register}>
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
