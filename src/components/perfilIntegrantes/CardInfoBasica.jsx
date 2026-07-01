import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CardInfoBasica = ({ integrante, onAbrirEditar }) => {
    if (!integrante) return null;

    const inicial = integrante.nombre ? integrante.nombre.charAt(0).toUpperCase() : 'U';

    return (
        <Card elevation={3} sx={{ borderRadius: 2, flex: 1, width: '100%' }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' }, 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: 4 
                    }}
                >
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px' }}>
                        <Avatar sx={{ width: 90, height: 90, bgcolor: 'primary.main', fontSize: '3.5rem', mb: 1 }}>
                            {inicial}
                        </Avatar>
                        <Chip 
                            label={integrante.esActivo ? "Activo" : "Inactivo"} 
                            color={integrante.esActivo ? "success" : "default"}
                            size="small"
                        />
                    </Box>

                    <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {integrante.nombre}
                        </Typography>
                        
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                gap: { xs: 3, md: 6 }, 
                                justifyContent: { xs: 'center', md: 'flex-start' },
                                mt: 1
                            }}
                        >
                            <Box>
                                <Typography variant="body2" color="textSecondary">Legajo</Typography>
                                <Typography variant="h6" fontWeight="500">{integrante.legajo || '—'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="textSecondary">Carrera</Typography>
                                <Typography variant="h6" fontWeight="500">{integrante.carrera || 'No especificada'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="textSecondary">Token</Typography>
                                <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                                    {integrante.token || 'Sin token'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: { xs: 'center', md: 'right' }, minWidth: '160px' }}>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            startIcon={<EditIcon />}
                            onClick={onAbrirEditar}
                            sx={{ 
                                borderRadius: 2, 
                                px: 3, 
                                py: 1,
                                borderWidth: '2px',
                                '&:hover': { borderWidth: '2px' }
                            }}
                        >
                            Editar Perfil
                        </Button>
                    </Box>

                </Box>
            </CardContent>
        </Card>
    );
};

export default CardInfoBasica;