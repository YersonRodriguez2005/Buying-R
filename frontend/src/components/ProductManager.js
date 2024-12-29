import React, { useState, useEffect, useCallback } from "react";
import { FaEdit, FaTrash, FaShoppingCart } from "react-icons/fa";

const ProductManager = ({ onCartUpdate }) => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({
        nombre: "",
        precio_min: "",
        precio_max: "",
        cantidad_min: "",
        cantidad_max: "",
    });
    const [showFilters, setShowFilters] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success",
    });
    const [formData, setFormData] = useState({
        id_producto: null,
        nombre: "",
        precio_unitario: "",
        cantidad_disponible: "",
    });

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 3000);
    };

    const formatCurrency = useCallback((value) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/productos");
            if (!response.ok) throw new Error("Failed to fetch products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
            showNotification("Error al cargar productos", "error");
        }
    }, []);

    const handleAddToCart = async (product) => {
        try {
            const response = await fetch("http://localhost:5000/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_producto: product.id_producto,
                    nombre: product.nombre,
                    precio_unitario: product.precio_unitario,
                    cantidad: 1,
                }),
            });
            if (response.ok) {
                onCartUpdate(); // Notifica al componente `Cart` que hay cambios
                console.log(`${product.nombre} agregado al carrito`);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };


    const handleEdit = (product) => {
        setFormData({
            id_producto: product.id_producto,
            nombre: product.nombre,
            precio_unitario: product.precio_unitario,
            cantidad_disponible: product.cantidad_disponible,
        });
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/productos/${id}`, {
                method: "DELETE",
            });
            setProducts((prevProducts) => prevProducts.filter((product) => product.id_producto !== id));
            showNotification("Producto eliminado exitosamente", "success");
        } catch (error) {
            console.error("Error deleting product:", error);
            showNotification("Error al eliminar el producto", "error");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id_producto) {
                await fetch(`http://localhost:5000/productos/${formData.id_producto}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                showNotification("Producto actualizado exitosamente", "success");
            } else {
                await fetch("http://localhost:5000/productos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                showNotification("Producto agregado exitosamente", "success");
            }
            setFormData({ id_producto: null, nombre: "", precio_unitario: "", cantidad_disponible: "" });
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
            showNotification("Error al guardar el producto", "error");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = products.filter((product) => {
        const matchesNombre =
            !filter.nombre ||
            product.nombre.toLowerCase().includes(filter.nombre.toLowerCase());
        const matchesPrecio =
            (!filter.precio_min || product.precio_unitario >= parseFloat(filter.precio_min)) &&
            (!filter.precio_max || product.precio_unitario <= parseFloat(filter.precio_max));
        const matchesCantidad =
            (!filter.cantidad_min || product.cantidad_disponible >= parseInt(filter.cantidad_min)) &&
            (!filter.cantidad_max || product.cantidad_disponible <= parseInt(filter.cantidad_max));
        return matchesNombre && matchesPrecio && matchesCantidad;
    });

    return (
        <div className="bg-slate-900 text-white p-4 rounded-lg shadow-lg">
            {notification.show && (
                <div
                    className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${notification.type === "success" ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {notification.message}
                </div>
            )}

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Formulario de Producto</h2>
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg"
                    />
                    <input
                        type="number"
                        placeholder="Precio unitario"
                        value={formData.precio_unitario}
                        onChange={(e) => setFormData({ ...formData, precio_unitario: e.target.value })}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg"
                    />
                    <input
                        type="number"
                        placeholder="Cantidad disponible"
                        value={formData.cantidad_disponible}
                        onChange={(e) => setFormData({ ...formData, cantidad_disponible: e.target.value })}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white w-full md:col-span-3"
                    >
                        {formData.id_producto ? "Actualizar Producto" : "Agregar Producto"}
                    </button>
                </form>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Productos</h2>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    Filtros
                </button>
            </div>

            {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={filter.nombre}
                        onChange={(e) =>
                            setFilter((prev) => ({ ...prev, nombre: e.target.value }))
                        }
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg"
                    />
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Precio mínimo"
                            value={filter.precio_min}
                            onChange={(e) => setFilter((prev) => ({ ...prev, precio_min: e.target.value }))}
                            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Precio máximo"
                            value={filter.precio_max}
                            onChange={(e) => setFilter((prev) => ({ ...prev, precio_max: e.target.value }))}
                            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg"
                        />
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Cantidad mínima"
                            value={filter.cantidad_min}
                            onChange={(e) => setFilter((prev) => ({ ...prev, cantidad_min: e.target.value }))}
                            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Cantidad máxima"
                            value={filter.cantidad_max}
                            onChange={(e) => setFilter((prev) => ({ ...prev, cantidad_max: e.target.value }))}
                            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg"
                        />
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="px-4 py-2 text-left text-slate-300">Nombre</th>
                            <th className="px-4 py-2 text-left text-slate-300">Precio</th>
                            <th className="px-4 py-2 text-left text-slate-300">Cantidad</th>
                            <th className="px-4 py-2 text-left text-slate-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id_producto} className="hover:bg-slate-800">
                                <td className="px-4 py-2">{product.nombre}</td>
                                <td className="px-4 py-2">{formatCurrency(product.precio_unitario)}</td>
                                <td className="px-4 py-2">{product.cantidad_disponible}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="p-1 bg-green-500 hover:bg-green-600 rounded flex items-center gap-1 text-xs"
                                        >
                                            <FaShoppingCart className="h-3 w-3" />
                                            Agregar
                                        </button>
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-1 bg-yellow-500 hover:bg-yellow-600 rounded flex items-center gap-1 text-xs"
                                        >
                                            <FaEdit className="h-3 w-3" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id_producto)}
                                            className="p-1 bg-red-600 hover:bg-red-700 rounded flex items-center gap-1 text-xs"
                                        >
                                            <FaTrash className="h-3 w-3" />
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ProductManager;
