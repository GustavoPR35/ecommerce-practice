import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(product, exists) {
        // console.log(`Será adicionado ${product.itemQuantity} unidade`)
        setCartItems(prev => {
            if (exists) {
                // console.log("existe", product.itemQuantity)
                return prev.map(p =>
                    p.id === product.id ? {...p, itemQuantity: p.itemQuantity + product.itemQuantity}
                    : p
                )
            }
            // console.log("n existe ainda")
            return [...prev, product]
        })
        // console.log(cartItems)
    }
    
    function removeFromCart(id) {
        setCartItems(prev => 
            prev.filter(p => p.id !== id)
        )
    }

    function findInCart(productId) {
        return cartItems.find(p => p.id === productId);
    }

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        findInCart,
    }
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
