import { useCart } from "../contexts/CartContext";

const CartItem = ({ product }) => {
    const { id, name, price, itemQuantity } = product;
    const { removeFromCart } = useCart();

    return (
        <div className="grid grid-cols-3 gap-4 p-2 mb-2 bg-gray-100 rounded-md shadow-md">
            <div className="col-span-1">
                <img src={`https://picsum.photos/id/${Math.floor(price)}/400`} alt={name} className="object-contain w-full h-auto rounded-md shadow-md" />
            </div>
            <div className="col-span-2 flex flex-col justify-between">
                <div>
                    <h2 className="text-md font-bold">
                        {name}
                    </h2>
                    <p className="text-sm">
                        {itemQuantity} {itemQuantity > 1 ? "unidades" : "unidade"}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-medium text-md">
                        ${(price * itemQuantity).toFixed(2)}
                    </p>
                    <div 
                        className="cursor-pointer"
                        onClick={() => {
                            removeFromCart(id)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fb2c36" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;