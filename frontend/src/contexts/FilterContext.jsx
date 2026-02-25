import { createContext, useContext, useMemo, useState } from 'react';

const ALL_PRODUCTS = [
    { 
        id: 1, 
        name: 'Smart Speaker com Alexa', 
        price: 20.00, 
        stock: 15, 
        categories: ['Electronics', 'Home & Kitchen'],
        description: 'Controle sua casa inteligente e ouça músicas com comando de voz.'
    },
    { 
        id: 2, 
        name: 'O Alquimista (Edição Especial)', 
        price: 10.00, 
        stock: 10, 
        categories: ['Books'],
        description: 'A clássica jornada de Santiago em busca do seu tesouro interior.'
    },
    { 
        id: 3, 
        name: 'Camiseta Básica de Algodão', 
        price: 50.00, 
        stock: 8, 
        categories: ['Clothing'],
        description: 'Conforto e durabilidade para o dia a dia, 100% algodão egípcio.'
    },
    { 
        id: 4, 
        name: 'Fritadeira Elétrica Air Fryer', 
        price: 60.00, 
        stock: 20, 
        categories: ['Home & Kitchen'],
        description: 'Cozinhe alimentos crocantes sem utilizar óleo, com tecnologia de ar quente.'
    },
    { 
        id: 5, 
        name: 'Mouse Sem Fio Ergonômico', 
        price: 40.00, 
        stock: 5, 
        categories: ['Electronics'],
        description: 'Design pensado para reduzir a fadiga muscular durante o uso prolongado.'
    },
    { 
        id: 6, 
        name: 'Calça Jeans Slim Fit', 
        price: 30.00, 
        stock: 0, 
        categories: ['Clothing'],
        description: 'Corte moderno com elastano para maior flexibilidade e ajuste perfeito.'
    },
    { 
        id: 7, 
        name: 'Guia do Mochileiro das Galáxias', 
        price: 15.50, 
        stock: 25, 
        categories: ['Books'],
        description: 'A série de ficção científica mais engraçada de todos os tempos.'
    },
    { 
        id: 8, 
        name: 'Monitor Gamer 24" LED', 
        price: 120.00, 
        stock: 10, 
        categories: ['Electronics'],
        description: 'Alta taxa de atualização e tempo de resposta de 1ms para jogos competitivos.'
    },
    { 
        id: 9, 
        name: 'Jaqueta Corta-Vento', 
        price: 25.00, 
        stock: 30, 
        categories: ['Clothing'],
        description: 'Proteção leve contra vento e chuva, ideal para atividades ao ar livre.'
    },
    { 
        id: 10, 
        name: 'Jogo de Panelas Antiaderentes', 
        price: 45.00, 
        stock: 12, 
        categories: ['Home & Kitchen'],
        description: 'Conjunto com 5 peças que não grudam e são fáceis de limpar.'
    },
    { 
        id: 11, 
        name: 'Lâmpada Inteligente Wi-Fi', 
        price: 85.00, 
        stock: 7, 
        categories: ['Electronics', 'Home & Kitchen'],
        description: 'Mude a cor e a intensidade da iluminação através do seu smartphone.'
    },
    { 
        id: 12, 
        name: 'Box de Livros Sherlock Holmes', 
        price: 12.99, 
        stock: 40, 
        categories: ['Books'],
        description: 'A coleção completa das aventuras do detetive mais famoso do mundo.'
    },
    { 
        id: 13, 
        name: 'Vestido Midi Floral', 
        price: 70.00, 
        stock: 15, 
        categories: ['Clothing'],
        description: 'Peça elegante com estampa exclusiva para ocasiões especiais.'
    },
    { 
        id: 14, 
        name: 'Cafeteira Italiana Inox', 
        price: 35.00, 
        stock: 22, 
        categories: ['Home & Kitchen'],
        description: 'Prepara um café expresso encorpado e saboroso diretamente no fogão.'
    },
    { 
        id: 15, 
        name: 'Placa de Vídeo RTX 3060', 
        price: 200.00, 
        stock: 4, 
        categories: ['Electronics'],
        description: 'Desempenho incrível com Ray Tracing para os jogos mais recentes.'
    },
    { 
        id: 16, 
        name: 'Biografias: Grandes Inventores', 
        price: 18.00, 
        stock: 18, 
        categories: ['Books', 'Clothing'],
        description: 'Um livro sobre mentes brilhantes (acompanha marcador de página em tecido).'
    }
];

// 1. Cria o objeto Contexto
const FilterContext = createContext(null);

// Hook customizado para facilitar o uso nos componentes (Boas Práticas!)
export const useFilter = () => useContext(FilterContext);

// 2. Cria o Provider (o "Medidor Mestre")
export function FilterProvider({ children }) {
    // ESTADO centralizado AQUI
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOption, setSortOption] = useState("relevance");
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

    const filteredProducts = useMemo(() => {
        if (!selectedCategory) {
            if (priceRange.min === 0 && priceRange.max === Infinity) {
                return ALL_PRODUCTS;
            } else {
                return ALL_PRODUCTS.filter(product => product.price >= priceRange.min && product.price <= priceRange.max);
            }
        }
        
        return ALL_PRODUCTS.filter(product => {
            const categoryMatch = product.categories.includes(
                selectedCategory
            );
            const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;

            return categoryMatch && priceMatch; // retorna (inclui) o product apenas se ambas as condições forem verdadeiras
        });
    }, [selectedCategory, priceRange]);

    const sortedProducts = useMemo(() => {
        if (sortOption === "price-asc") {
            return [...filteredProducts].sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            return [...filteredProducts].sort((a, b) => b.price - a.price);
        } else {
            return [...filteredProducts].sort((a, b) => a.id - b.id);
        }
    }, [filteredProducts, sortOption]); // dentro do array ficam as dependências. Se uma delas mudar, a função será re-executada.

    // O objeto de valor que será passado a todos os consumidores
    const value = {
        selectedCategory,
        setSelectedCategory,
        
        priceRange,
        setPriceRange,

        filteredProducts: sortedProducts,
        sortOption,
        setSortOption,

        allProductsCount: ALL_PRODUCTS.length,
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}