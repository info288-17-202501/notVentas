import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Button
} from '@mui/material';

const menuItems = [
    { label: 'Empresa', key: 'empresa' },
    { label: 'Tiendas', key: 'tiendas' },
    { label: 'Usuarios', key: 'usuarios' },
    { label: 'Estadísticas', key: 'estadisticas' },
];

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const confirmed = window.confirm('¿Estás seguro de que deseas salir?');
        if (confirmed) {
            localStorage.removeItem('token');
            window.location.href = '/'; // Redirigir a la página de inicio de sesión
        }
    };

    return (
        <Box sx={{ mg:1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* Menú principal */}
                    <Button color="inherit" onClick={handleMenuOpen}>
                        Menú
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {menuItems.map((item) => (
                            <MenuItem key={item.key} onClick={handleMenuClose}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Coordinador
                    </Typography>
                    {/* Botón de salir */}
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                    >
                        Salir
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;