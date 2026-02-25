import defaultImage from '../assets/stock-image.jpg';

function ProductCard({ img, title, price, stock, onClick }) {
    return (
        <div className="
            flex flex-col w-full
            border border-gray-200 rounded-lg overflow-hidden cursor-pointer 
            shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" onClick={onClick}>
            <img src={img || defaultImage} alt={title} className="object-cover w-full h-auto"/>
            <div className='m-2 md:m-4 h-full flex flex-col justify-between'>
                <h2 className="font-semibold text-base md:text-lg">{title}</h2>
                <div className="flex flex-col lg:flex-row justify-between items-baseline">
                    <p className="text-gray-600 text-sm md:text-base">${price.toFixed(2)}</p>
                    {
                        stock >= 1 &&
                        <p className="text-sm text-green-500 lg:text-end">{stock} in stock</p>
                    }
                    {
                        stock === 0 &&
                        <p className="text-sm text-red-500 lg:text-end">Out of stock</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductCard;