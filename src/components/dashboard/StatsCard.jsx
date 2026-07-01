import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

export const StatsCard = ({ title, value, icon, color }) => (
    <Paper sx={{ 
        p: 3, 
        borderRadius: 4, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 3,
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' },
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
    }}>
        <Box sx={{ p: 2, borderRadius: 3, bgcolor: `${color}15`, color: color }}>
            {React.cloneElement(icon, { sx: { fontSize: 32 } })}
        </Box>
        <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>{title}</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>{value}</Typography>
        </Box>
    </Paper>
);

export default StatsCard;