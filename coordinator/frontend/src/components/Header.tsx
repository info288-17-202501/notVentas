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
import { useNavigate } from 'react-router-dom';

const menuItems = [
    { label: 'Empresa', key: 'empresa' },
    { label: 'Tiendas', key: 'tiendas' },
    { label: 'Usuarios', key: 'usuarios' },
    { label: 'Estadísticas', key: 'estadisticas' },
];

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (key: string) => {
        handleMenuClose();
        if (key === 'empresa') {
            navigate('/empresas');
        }
        // Puedes agregar más rutas para otros botones si lo deseas
    };

    const handleLogout = () => {
        const confirmed = window.confirm('¿Estás seguro de que deseas salir?');
        if (confirmed) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    };

    return (
        <Box sx={{ mg:1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={handleMenuOpen}>
                        Menú
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.key}
                                onClick={() => handleMenuItemClick(item.key)}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Coordinador
                    </Typography>
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