import { useState } from 'react';

function Navbar({ onCartClick }) {
    const [isOpen, setIsOpen] = useState(false);

    // posso redirecionar alguns pra outras páginas quando tiver mais
    const navLinks = [
        { name: 'Products', href: '#', onClick: () => {} },
        { name: 'Your Cart', href: '#', onClick: onCartClick },
    ];

    return (
        <nav className="bg-gray-100 p-4 sticky top-0 z-20 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                {/* Logo/Nome da Loja */}
                <a href="/" className="text-2xl font-bold text-blue-600">
                    Store
                </a>

                {/* ÍCONE DE HAMBÚRGUER */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* Ícone simples de hambúrguer */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                    </svg>
                </button>

                {/* LINKS DE NAVEGAÇÃO HORIZONTAL */}
                <div className="hidden md:flex space-x-4">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={link.onClick}
                            className="text-lg font-medium text-gray-700 hover:text-blue-600"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* MENU MOBILE (Abre/Fecha) */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-2`}>
                <div className="flex flex-col space-y-2 p-2 bg-gray-50 rounded-lg">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className="text-base font-medium text-gray-700 hover:text-blue-600 block py-1"
                            onClick={() => {
                                setIsOpen(false);
                                link.onClick();
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;