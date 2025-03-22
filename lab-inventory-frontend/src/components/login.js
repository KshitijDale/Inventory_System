import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "@fontsource/poppins";

import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
    const [name, setName] = useState("");  // Changed email → name
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // console.log("Checkpoint", name);
            const response = await loginUser({ name, password });  // Send name instead of email
            localStorage.setItem("token", response.data.accessToken);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed! Check your credentials.");
        }
    };

    return (
        <div style={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h4" gutterBottom style={styles.title}>
                  Welcome Back
                </Typography>
                <Typography variant="subtitle1" style={styles.subtitle}>
                  Login to access your inventory
                </Typography>
                <form onSubmit={handleLogin}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{ style: styles.input }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ input: { color: "#fff" } }}
                  />
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={styles.button}
                    >
                      Login
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
    );
};
    
const styles = {
    container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #141e30, #243b55)",
    },
    card: {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    padding: 30,
    color: "white",
    width: "350px",
    },
    title: {
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    fontWeight: 600,
    color: "#fff",
    },
    subtitle: {
    textAlign: "center",
    color: "#ddd",
    marginBottom: 20,
    },
    input: {
    color: "#fff",
    },
    button: {
    marginTop: 20,
    backgroundColor: "#ff4b2b",
    color: "#fff",
    fontWeight: "bold",
    },
};


export default Login;
