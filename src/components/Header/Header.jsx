import { Input } from "antd";
import { useContext } from "react";
import { userContext } from "../../App";

function Header() {
    const { dataUser } = useContext(userContext); 
    
    return (
        <div className="py-4 border-b flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    👤
                </div>
                <span className="font-medium">{dataUser?.role}</span>
            </div>
            <div className="flex items-center gap-2">
                <Input 
                    placeholder="Find something..." 
                    className="w-64 rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">
                    Search
                </button>
            </div>
        </div>
    )
}

export default Header;