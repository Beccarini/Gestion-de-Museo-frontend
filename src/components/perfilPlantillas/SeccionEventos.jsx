import React from 'react';
import { 
    Card, CardContent, Typography, Box, Divider, Chip, Table, 
    TableBody, TableCell, TableContainer, TableHead, TableRow 
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

export function SeccionEventos({ eventos = [], onVerEvento }) {
    
    return (
        <Card variant="outlined" sx={{ borderRadius: 2, width: '100%', mb: 4, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <EventIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                        Eventos Generados
                    </Typography>
                    <Chip 
                        label={eventos.length} 
                        color="primary" 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                    />
                </Box>

                {eventos.length === 0 ? (
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                            Aún no se han proyectado eventos para esta plantilla.
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer sx={{ flexGrow: 1 }}>
                        <Table size="small" sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Nombre del Evento</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Fecha</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Horario</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eventos.map((evento, index) => {
                                    const isLast = index === eventos.length - 1;
                                    const borderStyle = isLast ? { borderBottom: 'none' } : {};
                                    
                                    const horaInicio = evento.fechaInicio 
                                        ? new Date(evento.fechaInicio).toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'}) 
                                        : '—';
                                    const horaFin = evento.fechaFin 
                                        ? new Date(evento.fechaFin).toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'}) 
                                        : '—';

                                    return (
                                        <TableRow 
                                            key={evento.id} 
                                            hover
                                            onClick={() => onVerEvento(evento.id)}
                                            sx={{ 
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: 500, color: 'text.primary', ...borderStyle }}>
                                                {evento.nombre}
                                            </TableCell>
                                            <TableCell sx={{ color: 'text.secondary', ...borderStyle }}>
                                                {evento.fechaInicio ? new Date(evento.fechaInicio).toLocaleDateString('es-AR') : '—'}
                                            </TableCell>
                                            
                                            <TableCell sx={{ color: 'text.secondary', ...borderStyle }}>
                                                {horaInicio} - {horaFin}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
}