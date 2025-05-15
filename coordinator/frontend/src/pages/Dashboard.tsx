import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import Header from "../components/Header";

type SolicitudTienda = {
  id: number;
  nombreTienda: string;
  propietario: string;
  fechaSolicitud: string;
  estado: "pendiente" | "aprobada" | "rechazada";
};

const mockSolicitudes: SolicitudTienda[] = [
  {
    id: 1,
    nombreTienda: "Tienda Central",
    propietario: "Juan Pérez",
    fechaSolicitud: "2024-06-10",
    estado: "pendiente",
  },
  {
    id: 2,
    nombreTienda: "Supermercado Norte",
    propietario: "Ana Gómez",
    fechaSolicitud: "2024-06-09",
    estado: "aprobada",
  },
];

const Dashboard: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudTienda[]>([]);

  useEffect(() => {
    setSolicitudes(mockSolicitudes);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
        py: 4,
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          px: 2,
        }}
      >
        <Typography variant="h4" color="black" gutterBottom>
          Solicitudes de Tiendas
        </Typography>
        {solicitudes.length === 0 ? (
          <Typography>No hay solicitudes pendientes.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre Tienda</TableCell>
                  <TableCell>Propietario</TableCell>
                  <TableCell>Fecha Solicitud</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {solicitudes.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell>{solicitud.id}</TableCell>
                    <TableCell>{solicitud.nombreTienda}</TableCell>
                    <TableCell>{solicitud.propietario}</TableCell>
                    <TableCell>{solicitud.fechaSolicitud}</TableCell>
                    <TableCell>{solicitud.estado}</TableCell>
                    <TableCell align="center">
                      {solicitud.estado === "pendiente" ? (
                        <>
                          <Button color="primary" size="small" sx={{ mr: 1 }}>
                            Aprobar
                          </Button>
                          <Button color="error" size="small">
                            Rechazar
                          </Button>
                        </>
                      ) : (
                        <Button color="secondary" size="small">
                          Ver Detalles
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
