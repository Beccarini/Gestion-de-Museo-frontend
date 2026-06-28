import React from 'react';
import { Card, CardContent, Typography, Box, Divider, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SeccionProyectos = ({ proyectosIniciales }) => {
    const listaProyectos = Array.isArray(proyectosIniciales) 
        ? proyectosIniciales 
        : (proyectosIniciales?.proyectos || []);

    return (
        <Card elevation={3} sx={{ borderRadius: 2, height: '100%', minHeight: '180px', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <AccountTreeIcon color="secondary" />
                    <Typography variant="h6" fontWeight="bold">
                        Proyectos
                    </Typography>
                    <Chip 
                        label={listaProyectos.length} 
                        color="secondary" 
                        size="small" 
                        sx={{ fontWeight: 'bold', ml: 'auto' }} 
                    />
                </Box>
                <Divider sx={{ mb: 2 }} />

                {listaProyectos && listaProyectos.length > 0 ? (
                    <List sx={{ flexGrow: 1 }}>
                        {listaProyectos.map((proyecto) => (
                            <ListItem key={proyecto.id} disablePadding sx={{ mb: 2 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <AssignmentIcon color="action" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Typography fontWeight={500}>{proyecto.nombre || 'Proyecto sin nombre'}</Typography>}
                                    secondary={proyecto.descripcion || 'Sin descripción detallada'}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ 
                        flexGrow: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        textAlign: 'center',
                        width: '100%',
                        p: 2
                    }}>
                        <Typography variant="body1" color="text.secondary">
                            Este integrante no está asignado a ningún proyecto actualmente.
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default SeccionProyectos;