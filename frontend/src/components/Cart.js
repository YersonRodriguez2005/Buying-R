import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const Cart = ({ cartUpdate }) => {
  const [cart, setCart] = useState({ cart: [], total: 0 });

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const formatCurrency = (value) => {
    return typeof value === "number"
      ? `$${value.toFixed(2)}`
      : "No disponible";
  };

  const handleRemoveItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/cart/remove/${id}`, {
        method: "DELETE",
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch carrito inicial
  }, []);

  useEffect(() => {
    fetchCart(); // Refresca el carrito al recibir actualizaciones
  }, [cartUpdate]);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6">Carrito de Compras</h2>
      <div className="space-y-2">
        {cart.cart.length > 0 ? (
          cart.cart.map((item) => (
            <div
              key={item.id_producto}
              className="bg-gray-700 p-2 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div className="mb-2 md:mb-0">
                <h3 className="font-bold text-lg">{item.nombre}</h3>
                <p className="text-sm text-gray-300">
                  Precio unitario: {formatCurrency(item.precio_unitario)}
                </p>
                <p className="text-xs text-gray-300">
                  Cantidad: {item.cantidad} | Total:{" "}
                  {formatCurrency(item.precio_unitario * item.cantidad)}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id_producto)}
                className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
              >
                <FaTrash className="inline mr-1" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">El carrito está vacío</p>
        )}
      </div>
      <div className="border-t border-gray-600 mt-6 pt-4">
        <h3 className="text-xl font-bold text-right">
          Total General: {formatCurrency(cart.total)}
        </h3>
      </div>
    </div>
  );
};

export default Cart;
