import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
} from '@mui/material';
import { Company } from '../types/Company';


type ListCompaniesProps = {
    companies: Company[];
};

const ListCompanies: React.FC<ListCompaniesProps> = ({ companies }) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Lista de Compañías
            </Typography>
            <Grid container spacing={3}>
                {companies.map((company) => (
                    <Grid key={company._id}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {company.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Descripción:</strong> {company.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Dirección:</strong> {company.address}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Teléfono:</strong> {company.phone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Email:</strong> {company.email}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ListCompanies;