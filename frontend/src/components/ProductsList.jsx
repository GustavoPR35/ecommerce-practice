import { useState } from "react";
import { useFilter } from "../contexts/FilterContext";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";

const ProductsList = () => {
    const { filteredProducts, sortOption, setSortOption } = useFilter();
    const [isViewing, setIsViewing] = useState(false);
    const [viewingProduct, setViewingProduct] = useState(null);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleProductClick = (product) => {
        setIsViewing(true);
        setViewingProduct(product);
    }

    return (
        <div id="products-list">
            <div className="flex flex-col md:flex-row items-baseline md:justify-between mb-4">
                <div className="flex flex-row items-baseline">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <p className="ml-2 text-gray-600 mt-1">({filteredProducts.length} items found)</p>
                </div>
                <div>
                    <label htmlFor="sort" className="mr-2 font-medium">Sort by:</label>
                    <select id="sort" name="sort" className="border border-gray-300 rounded-md p-1" 
                        value={sortOption} 
                        onChange={handleSortChange}
                    >
                        <option value="relevance">Relevance</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="
            grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
            justify-items-center gap-2 md:gap-6">
                {filteredProducts.map(product =>
                (
                    <ProductCard
                        key={product.id}
                        img={`https://picsum.photos/id/${Math.floor(product.price)}/400`}
                        title={product.name}
                        price={product.price}
                        stock={product.stock}
                        onClick={() => handleProductClick(product)}
                    />
                ))}
            </div>
            {isViewing && <ProductDetails 
                key={viewingProduct.id}
                product={viewingProduct} 
                isViewing={isViewing}
                setIsViewing={setIsViewing} 
            />}
        </div>
    );
}

export default ProductsList;