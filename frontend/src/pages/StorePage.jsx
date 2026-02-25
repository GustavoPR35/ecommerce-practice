import { useState } from "react";
import { FilterProvider } from "../contexts/FilterContext";
import CartDrawer from "../components/CartDrawer";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductsList from "../components/ProductsList";
import Filter from "../components/Filter";
import { CartProvider } from "../contexts/CartContext";

const StorePage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <CartProvider>
            <FilterProvider>
                <Navbar onCartClick={() => setIsCartOpen(true)} />
                <Banner />
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto my-6 px-4">
                    {/* COLUNA 1: Filtro */}
                    <div className="md:col-span-1">
                        <Filter />
                    </div>
                    {/* COLUNA 2: Produtos */}
                    <div className="md:col-span-3 lg:col-span-4">
                        <ProductsList />
                    </div>
                </div>
                <CartDrawer isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
            </FilterProvider>
        </CartProvider>
    );
}

export default StorePage;