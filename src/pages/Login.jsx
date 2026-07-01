import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../services/authService';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !password.trim()) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        setLoadingLogin(true);
        const resultado = await login(email,password);
        setLoadingLogin(false);

        if (resultado.success) {
            navigate('/'); //se redirige al dashboard si el login es exitoso
        } else {
            setError(resultado.error);
        }
    };

   return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            backgroundColor: '#f8f9fa' 
        }}>
            <Card sx={{ maxWidth: 400, width: '100%', p: 2, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ 
                            backgroundColor: 'primary.main', 
                            color: 'white', 
                            borderRadius: '50%', 
                            p: 1.5, 
                            mb: 1,
                            display: 'flex'
                        }}>
                            <LockOpenIcon />
                        </Box>
                        <Typography variant="h5" component="h1" fontWeight="bold" color="primary">
                            Sistema MUIC
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Inicia sesión para administrar el acceso
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Correo Electrónico"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loadingLogin}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loadingLogin}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            disableElevation
                            sx={{ mt: 3, mb: 1, py: 1.2, fontWeight: 'bold' }}
                            disabled={loadingLogin}
                        >
                            {loadingLogin ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;