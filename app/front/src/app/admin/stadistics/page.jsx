'use client';
import { useState, useEffect } from 'react';

export default function StatisticsPage() {
  const [stats, setStats] = useState({
    totalVentas: 0,
    productosVendidos: 0,
    promedioVenta: 0,
    ventasPorMes: []
  });

  useEffect(() => {
    // Aquí iría la llamada a la API para obtener las estadísticas
    // Por ahora usamos datos de ejemplo
    setStats({
      totalVentas: 150000,
      productosVendidos: 450,
      promedioVenta: 333.33,
      ventasPorMes: [
        { mes: 'Enero', ventas: 25000 },
        { mes: 'Febrero', ventas: 30000 },
        { mes: 'Marzo', ventas: 35000 },
        { mes: 'Abril', ventas: 40000 },
        { mes: 'Mayo', ventas: 50000 }
      ]
    });
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Panel de Estadísticas
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-2">Total Ventas</h3>
            <p className="text-3xl font-bold text-white">${stats.totalVentas.toLocaleString()}</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-2">Productos Vendidos</h3>
            <p className="text-3xl font-bold text-white">{stats.productosVendidos}</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-2">Promedio por Venta</h3>
            <p className="text-3xl font-bold text-white">${stats.promedioVenta.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Ventas por Mes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Mes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ventas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Progreso</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {stats.ventasPorMes.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-white">{item.mes}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">${item.ventas.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(item.ventas / stats.ventasPorMes[0].ventas) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
