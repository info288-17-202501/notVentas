import React from "react";

const SellerWelcomePage = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", color: "#2d3748", textShadow: "2px 2px 8px #b3b3b3" }}>
            ¡Bienvenido, Vendedor Legendario!
        </h1>
        <p style={{ fontSize: "1.3rem", color: "#444", maxWidth: 600, textAlign: "center", marginTop: 24 }}>
            Has cruzado el umbral hacia el <strong>Gran Panel de Administración</strong>.<br />
            Aquí, tu ingenio y determinación forjarán imperios de ventas.<br />
            Gestiona tus productos, conquista nuevos mercados y observa cómo tus logros se elevan a lo más alto.<br />
            <span style={{ color: "#3182ce", fontWeight: "bold" }}>
                ¡Hoy comienza tu leyenda como vendedor!
            </span>
        </p>
        <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Seller Welcome"
            style={{ width: 180, marginTop: 40, filter: "drop-shadow(0 4px 16px #3182ce88)" }}
        />
    </div>
);

export default SellerWelcomePage;