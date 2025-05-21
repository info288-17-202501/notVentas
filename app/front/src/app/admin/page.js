import React from 'react';
import Footer from '../../layout/footer';
import Navbar from '../../layout/navbar';

const AdminPage = () => {
    
    return (
        <div style={styles.container}>
            <Navbar />
            <main style={styles.main}>
                <section style={styles.card}>
                    <h2>Gestión de Usuarios</h2>
                    <p>Administra los usuarios de la plataforma.</p>
                    <button style={styles.button}>Ir a Usuarios</button>
                </section>
                <section style={styles.card}>
                    <h2>Estadísticas</h2>
                    <p>Consulta las estadísticas de uso.</p>
                    <button style={styles.button}>Ver Estadísticas</button>
                </section>
                <section style={styles.card}>
                    <h2>Configuración</h2>
                    <p>Ajusta las configuraciones del sistema.</p>
                    <button style={styles.button}>Abrir Configuración</button>
                </section>
            </main>
           <Footer />
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f4f4f9',
        color: '#333',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '1rem',
    },
    title: {
        margin: 0,
    },
    main: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '1rem',
    },
    card: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        margin: '1rem',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '1rem',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
    footer: {
        backgroundColor: '#333',
        color: 'white',
        padding: '1rem',
    },
};

export default AdminPage;