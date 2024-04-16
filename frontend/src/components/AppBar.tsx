import { Link, useNavigate } from "react-router-dom";

export const AppBar = () => {
    const navigate = useNavigate();

    const logoutClick = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const newClick = () => {
        navigate('/create-blog');
    }

    return (
        <>
        <div className="flex justify-between px-10 p-3">
            <Link to='/blogs'>
            <div className="flex justify-center font-bold text-xl p-2 cursor-pointer">
                Medium
            </div>
            </Link>
            <div>
                <div className="flex justify-center">
                    <button onClick={newClick} type="button" className="text-black bg-gradient-to-r from-blue-400 via-blue-500
                    to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm text-center w-full me-2 p-2">New Blog</button>
                    <button onClick={logoutClick} type="button" className="text-black bg-gradient-to-r from-green-400 via-green-500
                    to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300
                    font-medium rounded-lg text-sm text-center w-full me-2 p-2">Logout</button>
                    <div className="relative inline-flex items-center justify-center w-20 h-10 overflow-hidden bg-gray-300 rounded-full">
                        <span className="font-medium text-gray-600 text-2xl">👦🏻</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-slate-200 h-1 w-full"></div>
        </>
    );
}