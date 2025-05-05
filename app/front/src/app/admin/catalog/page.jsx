"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CatalogPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Si no hay token, redirige al login
    if (!token) {
      router.push("/login");
    }
    // Opcional: valida el token con la API
    // fetch("/api/validate-token", { headers: { Authorization: `Bearer ${token}` } })
    //   .then((res) => {
    //     if (!res.ok) throw new Error("Token inválido");
    //   })
    //   .catch(() => router.push("/login"));
  }, [router]);

  return (
    <div>
      <h1>Catálogo</h1>
      <p>Esta es una página protegida.</p>
    </div>
  );
};

export default CatalogPage;