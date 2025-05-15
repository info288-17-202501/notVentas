import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error || "Credenciales incorrectas o error del servidor");
      } else {
        setError("Error inesperado al iniciar sesión");
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          px: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", boxSizing: "border-box" }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" component="h2" gutterBottom textAlign="center">
              Iniciar Sesión
            </Typography>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoFocus
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
