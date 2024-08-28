import { useState } from 'react';

import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [menuOpen, setMenuOpen] = useState(true);

    return (
        <>
            <aside className={`flex flex-col bg-gray-800 text-gray-500 min-h-screen ${menuOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-500 hover:text-gray-400 p-3 mt-4 ml-auto"
                >
                    {menuOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    }
                </button>
                <div className="flex flex-col flex-grow justify-between">
                    <nav className="flex flex-col mx-4 my-6 space-y-4">
                        <Link to="/" className={`flex items-center py-3 px-2 rounded-lg ${menuOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            {menuOpen && <span className="ml-2">Folders</span>}
                        </Link>
                        <Link to="/dashboard" className={`flex items-center py-3 px-2 rounded-lg ${menuOpen ? 'justify-start' : 'justify-center'} bg-white text-blue-600`}>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            {menuOpen && <span className="ml-2">Dashboard</span>}
                        </Link>
                        <Link to="/messages" className={`flex items-center py-3 px-2 rounded-lg ${menuOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {menuOpen && <span className="ml-2">Messages</span>}
                        </Link>
                        <Link to="/documents" className={`flex items-center py-3 px-2 rounded-lg ${menuOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            {menuOpen && <span className="ml-2">Documents</span>}
                        </Link>
                    </nav>
                    <div className="flex justify-end p-3">
                        <button className="text-gray-500 hover:text-gray-400">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573.953c1.175.716 1.706 1.949 1.452 3.23-.137.706-.353 1.398-.635 2.046.788.008 1.496.318 2.01.846a3.875 3.875 0 01.85 4.247c-.137.706-.352 1.398-.634 2.046a3.969 3.969 0 01-2.015 1.422c-.826.354-1.676.424-2.558.219-.13-.222-.269-.437-.42-.647a3.732 3.732 0 01-1.535-2.553c-.37-1.855-2.558-2.867-4.049-1.725a2.68 2.68 0 01-1.156 1.558c-.822.547-1.78.723-2.676.434-.367-.068-.724-.235-1.014-.5-.106-.091-.215-.193-.317-.294-.551-.488-1.006-1.04-1.358-1.619-.303-.527-.46-1.106-.466-1.702-.034-3.737 2.772-6.786 6.095-6.829.377 0 .749.027 1.118.079a4.01 4.01 0 01.897-1.374z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside></>
    );
};

export default Sidebar;