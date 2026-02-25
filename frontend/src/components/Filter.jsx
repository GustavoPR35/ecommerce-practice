import { useFilter } from '../contexts/FilterContext';

const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Home & Kitchen' },
];

const Filter = () => {
    const { selectedCategory, setSelectedCategory, setPriceRange } = useFilter();

    function handleCategoryChange(category) {
        setSelectedCategory(prevCategory => (prevCategory === category ? null : category));
    }

    function handleMinPriceChange(event) {
        const newMin = event.target.value ? parseFloat(event.target.value) : 0;
        setPriceRange(prevRange => ({ ...prevRange, min: newMin })); // prevRange é criado implicitamente.
    }

    function handleMaxPriceChange(event) {
        const newMax = event.target.value ? parseFloat(event.target.value) : Infinity;
        setPriceRange(prevRange => ({ ...prevRange, max: newMax}));
    }

    function clearPriceInputs() {
        document.querySelector('input.minprice').value = '';
        document.querySelector('input.maxprice').value = '';
    }

    return (
        <div className="p-2 bg-gray-200 rounded-lg w-full grow-3 shadow-md flex flex-col items-center">
            <p className="text-xl font-bold mb-2 text-center">Filter</p>
            {/* Limpar filtro */}
            <button className="rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 p-2 shadow-sm w-1/2">
                <span className="text-sm font-medium cursor-pointer text-white" onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange({ min: 0, max: Infinity });
                    clearPriceInputs();
                }}>Clear Filters</span>
            </button>
            {/* Categorias */}
            <div className="rounded-lg bg-white p-4 mt-2 shadow-sm w-full">
                <h2 className="font-bold">Category</h2>
                <div className="flex flex-col">
                    {categories.map(category => (
                        <div key={category.id}>
                            <input
                                type="radio"
                                id={category.id}
                                name="category" // inputs do tipo radio devem compartilhar o mesmo name
                                value={category.name} // valor que será enviado no submit
                                onChange={() => handleCategoryChange(category.name)}
                                checked={selectedCategory === category.name}
                            />
                            <label className="pl-2" htmlFor={category.id}>{category.name}</label>
                        </div>
                    ))}
                </div>
            </div>
            {/* Faixa de Preço */}
            <div className="rounded-lg bg-white p-4 mt-2 shadow-sm w-full">
                <p className="font-bold">Price</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        Min:
                        <input type="text" className="w-full border border-gray-200 rounded-md minprice" 
                            onChange={handleMinPriceChange}
                        />
                    </div>
                    <div>
                        Max:
                        <input type="text" className="w-full border border-gray-200 rounded-md maxprice"
                            onChange={handleMaxPriceChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;