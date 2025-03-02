import { Input } from "antd";
import Header from "../../components/Header/Header";
import { useContext } from "react";
import { userContext } from "../../App";
import { Navigate } from "react-router-dom";

function UserProfile() {
    const { dataUser, tokenAuth } = useContext(userContext);
    
    return (
        <>
            {tokenAuth ? (
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <div className="max-w-3xl mx-auto px-6 py-8">
                        <h1 className="text-2xl font-bold mb-8">USER PROFILE</h1>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Full name
                                </label>
                                <Input 
                                    value={dataUser.data.fullName} 
                                    disabled 
                                    className="w-full max-w-md h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <Input 
                                    value={dataUser.data.username} 
                                    disabled 
                                    className="w-full max-w-md h-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to='/'/>
            )}
        </>
    )
}

export default UserProfile;