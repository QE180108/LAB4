import { Button, Form, Input, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";
import { useContext, useState } from "react";
import { userContext } from "../../../App";

function FormLogin() {
    const { token } = useContext(userContext);
    const navigate = useNavigate();
    const [errorLogin, setErrorLogin] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFinish = async (values) => {
        try {
            const result = await authApi.loginAuth({
                username: values.email, // Map email to username for API compatibility
                password: values.password
            });
            token(result.token);
            if (result) {
                messageApi.open({
                    type: 'success',
                    content: 'Login successful!',
                });
            }
            setTimeout(() => {
                navigate('/user-profile')
            }, 1500)
        } catch (error) {
            console.log(error.response?.data?.message || 'Login failed');
            setErrorLogin(error.response?.data?.message || 'Invalid email or password');
            setIsModalOpen(true);
        }
    }

    return (
        <>
            <Modal title="Notice" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <span className="text-red-500">{errorLogin}</span>
            </Modal>
            {contextHolder}
            <Form
                onFinish={onFinish}
                className="bg-white p-6 rounded-lg shadow-sm"
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Email is required!'
                        },
                        {
                            type: 'email',
                            message: 'Please enter a valid email address!'
                        }
                    ]}
                >
                    <Input 
                        prefix={<span className="text-gray-400">✉</span>}
                        placeholder="EMAIL ADDRESS" 
                        className="h-11 text-sm" 
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Password is required!'
                        },
                        {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: 'Password must be at least 8 characters and include letters and numbers'
                        }
                    ]}
                >
                    <Input.Password 
                        prefix={<span className="text-gray-400">🔒</span>}
                        placeholder="PASSWORD" 
                        className="h-11 text-sm"
                    />
                </Form.Item>

                <div className="flex justify-between mb-6">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </div>
                    </Form.Item>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full h-11 bg-black hover:bg-gray-800">
                        SIGN IN
                    </Button>
                </Form.Item>

                <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">or sign in with</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <div className="flex gap-4 mb-6">
                    <Button icon={<span>G</span>} className="flex-1 h-11 flex items-center justify-center" />
                    <Button icon={<span>f</span>} className="flex-1 h-11 flex items-center justify-center" />
                    <Button className="flex-1 h-11 flex items-center justify-center">
                        <span>𝕏</span>
                    </Button>
                </div>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </div>
            </Form>
        </>
    )
}

export default FormLogin;