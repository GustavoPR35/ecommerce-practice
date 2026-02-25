import { useState } from "react";
import { useCart } from "../contexts/CartContext";

const ProductDetails = ({ product, isViewing, setIsViewing }) => {
    const [itemQuantity, setItemQuantity] = useState(1);
    const { name, price, stock, categories, description } = product;
    const { addToCart, findInCart } = useCart();

    const handleQuantity = (type) => {
        switch (type) {
            case "add":
                if (itemQuantity < product.stock) {
                    setItemQuantity(prev => prev + 1);
                }
                break;
            case "rem":
                if (itemQuantity > 1) {
                    setItemQuantity(prev => prev - 1);
                }
                break;
            default:
                console.log('Default em handleQuantity');
                break;
        }
    }

    const handleCartAdd = (product) => {
        const exists = findInCart(product.id)
        // console.log(exists);
        if (exists && exists.itemQuantity + itemQuantity > exists.stock) {
            console.log("na na ni na nao");
            window.alert(`Limite de unidades para "${exists.name}" atingido.`)
            return;
        }
        const productWithQuantity = { ...product, itemQuantity: itemQuantity }
        addToCart(productWithQuantity, exists);
    }

    return (
        <>
            {/* Exibição de detalhes do produto */}
            {isViewing && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        onClick={() => setIsViewing(false)}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white w-[90%] max-w-lg rounded-lg shadow-2xl">
                            <div className="p-4 flex justify-between items-center border-b-2 border-gray-200">
                                <h2 className="text-xl font-bold">{name}</h2>
                                <button onClick={() => setIsViewing(false)} className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="md:grid md:grid-cols-3 md:gap-4 m-4">
                                <div className="md:col-span-1">
                                    <img src={`https://picsum.photos/id/${Math.floor(price)}/400`} alt={name} className="object-contain w-full h-auto rounded-sm" />
                                </div>
                                <div className="md:col-span-2 flex flex-col justify-between">
                                    <p>{description}</p>
                                    <div className="flex justify-between">
                                        <div className="flex mt-4 bg-gray-100 rounded-full border-2 border-gray-400 font-bold shadow-md overflow-hidden">
                                            <button className="w-7 text-center cursor-pointer hover:bg-gray-200 active:bg-gray-300 text-red-500 rem-button disabled:cursor-not-allowed disabled:opacity-50"
                                                onClick={() => handleQuantity("rem")}
                                                disabled={itemQuantity === 1}
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center border-x-2 border-gray-400">
                                                {itemQuantity}
                                            </span>
                                            <button className="w-7 text-center cursor-pointer hover:bg-gray-200 active:bg-gray-300 text-green-700 add-button disabled:cursor-not-allowed disabled:opacity-50"
                                                onClick={() => handleQuantity("add")}
                                                disabled={itemQuantity === stock || stock === 0}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="mt-4 text-lg font-semibold">Price: ${price.toFixed(2) * itemQuantity}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-4 mt-0 mb-3">
                                <button className={`w-full p-2 font-bold rounded-full text-white
                                    ${stock === 0
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
                                    }`}
                                    onClick={() => {
                                        if (stock != 0) {
                                            handleCartAdd(product);
                                            setIsViewing(false);
                                        }
                                    }}
                                >
                                    {stock != 0 ? "ADD TO CART" : "OUT OF STOCK"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

export default ProductDetails;