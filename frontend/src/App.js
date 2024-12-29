import React, { useState } from "react";
import ProductManager from "./components/ProductManager";
import Cart from "./components/Cart";

function App() {
  const [cartUpdate, setCartUpdate] = useState(0);

  const handleCartUpdate = () => {
    setCartUpdate((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center">Sistema POS</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ProductManager ocupa 2/3 del ancho en pantallas grandes */}
          <div className="w-full lg:w-2/3">
            <ProductManager onCartUpdate={handleCartUpdate} />
          </div>
          {/* Cart ocupa 1/3 del ancho en pantallas grandes */}
          <div className="w-full lg:w-1/3">
            <Cart cartUpdate={cartUpdate} />
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 mt-8">
        <p className="text-sm">
          © {new Date().getFullYear()} Sistema POS. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;
