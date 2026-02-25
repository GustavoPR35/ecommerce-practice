import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem";

const CartDrawer = ({ isCartOpen, setIsCartOpen }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    
    // Classes de transição
    const drawerClasses = `fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl 
                           transform transition-transform duration-300 ease-in-out md:rounded-l-lg`;

    const calculateTotal = () => {
        if (cartItems.length < 1) {
            return null;
        }
        let itemCount = 0;
        let totalPrice = 0;
        cartItems.forEach(product => {
            itemCount += product.itemQuantity;
            totalPrice += product.price * product.itemQuantity;
        });
        return [itemCount, totalPrice];
    }

    return (
        <>
            {/* 1. OVERLAY (Fundo Escuro) */}
            {isCartOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40" 
                    onClick={() => setIsCartOpen(false)} // Fecha ao clicar no fundo
                />
            )}

            {/* 2. PAINEL LATERAL (DRAWER) */}
            <div 
                className={`${drawerClasses} ${
                    // Se estiver aberto, move para a posição 0 (dentro da tela)
                    isCartOpen ? 'translate-x-0' : 'translate-x-full' 
                }`}
            >
                {/* Cabeçalho */}
                <div className="p-4 border-b-2 border-gray-200 flex justify-between items-center">
                    <p>
                        <span className="text-xl font-bold">
                            Your Cart
                        </span>
                        {cartItems.length > 0 &&
                            (<span className="text-sm">
                                {` (${calculateTotal()[0]} ${cartItems.length > 1 ? "unidades" : "unidade"}, $${calculateTotal()[1].toFixed(2)})`}
                            </span>)
                        }
                    </p>
                    <button 
                        onClick={() => setIsCartOpen(false)} 
                        className="text-gray-500 hover:text-gray-900 cursor-pointer"
                    >
                        {/* Ícone de fechar (X) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Conteúdo do Carrinho */}
                <div className="p-2 max-h-[calc(100vh-52px)] overflow-y-auto">
                    {/* Aqui vai a lista de itens do carrinho */}
                    {cartItems.map(cartItem => (
                        // <p key={cartItem.id}>
                        //     {cartItem.name}, {cartItem.itemQuantity}
                        // </p>
                        <CartItem
                            key={cartItem.id}
                            product={cartItem}
                        />
                        // console.log(cartItem)
                    ))}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;