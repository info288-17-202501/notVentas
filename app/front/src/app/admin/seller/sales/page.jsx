'use client'

import { useEffect, useState } from 'react'
import CartIcon    from '@/components/CartIcon'
import CartSidebar from '@/components/CartSidebar'
import { useCart } from '@/context/CartContext'
// Asegúrate de que este path coincide exactamente con tu archivo
import { supabase } from '@/lib/supabaseclient'

export default function SalePage() {
  const [products,  setProducts]   = useState([])
  const [quantities,setQuantities] = useState({})
  const [loading,   setLoading]    = useState(true)
  const [isOpen,    setIsOpen]     = useState(false)
  const { addToCart }              = useCart()

  useEffect(() => {
    const load = async () => {
      try {
        // === 1) Traigo productos activos y junto su color ===
        const { data, error } = await supabase
          .from('products')
          .select(`
            product_id,
            product_name,
            description,
            price,
            is_active,
            colors (
              color_name,
              color_code
            )
          `)
          .eq('is_active', true)

        if (error) throw error

        // === 2) Mapear al shape que usa tu UI ===
        const prods = data.map(p => ({
          id:          p.product_id,
          name:        p.product_name,
          description: p.description,
          price:       p.price,
          colors:      p.colors,              // [{color_name, color_code}, …]
          stock:       0                       // si más adelante quieres stock haz otro select
        }))

        setProducts(prods)

        // === 3) inicializar cantidades en 1 ===
        const init = {}
        prods.forEach(p => { init[p.id] = 1 })
        setQuantities(init)

      } catch (err) {
        console.error('Error cargando productos:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <p className="text-center mt-8">Cargando productos…</p>
  }

  return (
    <div className="relative min-h-screen p-4 bg-gray-50">
      {/* Icono del carrito */}
      <div className="fixed top-4 right-4 z-50">
        <CartIcon onClick={() => setIsOpen(true)} />
      </div>

      {/* Sidebar del carrito */}
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        Todos los productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(prod => (
          <div key={prod.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
            <h2 className="mt-2 font-semibold">{prod.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{prod.description}</p>
            <p className="text-orange-600 font-bold mt-auto">
              ${new Intl.NumberFormat('es-CL').format(prod.price)}
            </p>

            {/* Mostrar pelotitas de colores */}
            <div className="flex gap-2 my-2">
              {prod.colors.map(c => (
                <div
                  key={c.color_code}
                  title={c.color_name}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: c.color_code }}
                />
              ))}
            </div>

            {/* Selector de cantidad */}
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() =>
                  setQuantities(q => ({
                    ...q,
                    [prod.id]: Math.max(1, q[prod.id] - 1)
                  }))
                }
                className="px-2 py-1 bg-gray-300 rounded"
              >−</button>
              <span className="w-6 text-center">{quantities[prod.id]}</span>
              <button
                onClick={() =>
                  setQuantities(q => ({
                    ...q,
                    [prod.id]: q[prod.id] + 1
                  }))
                }
                className="px-2 py-1 bg-gray-300 rounded"
              >+</button>
            </div>

            <button
              onClick={() =>
                addToCart({
                  ...prod,
                  quantity: quantities[prod.id],
                  // tomo el primer color disponible
                  color: prod.colors[0]?.color_code
                })
              }
              className="mt-3 w-full bg-orange-600 text-white py-1.5 rounded hover:bg-orange-700"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
