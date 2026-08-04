import React from 'react';
import { Card, CardContent, Typography, Box, Divider, Chip, Button } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';

export function SeccionItems() {
    return (
        <Card variant="outlined" sx={{ borderRadius: 2, width: '100%', mb: 4, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <InventoryIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                        Ítems de Inventario
                    </Typography>
                    <Chip 
                        label="0" 
                        color="primary" 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                    />
                    <Button 
                        disabled
                        variant="outlined" 
                        size="small" 
                        startIcon={<AddIcon />}
                        sx={{ ml: 'auto', borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                    >
                        Asignar Ítem
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 5, textAlign: 'center' }}>
                    <InventoryIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Módulo de inventario no implementado todavía
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                        Próximamente podrás visualizar y asignar recursos materiales a este proyecto.
                    </Typography>
                </Box>
                
            </CardContent>
        </Card>
    );
}