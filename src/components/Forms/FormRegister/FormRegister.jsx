import { Button, Form, Input, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";
import { useState } from "react";

function FormRegister() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [errorRegister, setErrorRegister] = useState('');
    const navigate = useNavigate();

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFinish = async (values) => {
        try {
            const result = await authApi.registerAuth({
                username: values.email,
                password: values.password,
                fullName: values.fullName
            });
            if (result) {
                messageApi.open({
                    type: 'success',
                    content: 'Registration successful!',
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1500)
            }
        } catch (error) {
            console.log(error.response?.data?.message || 'Registration failed');
            setErrorRegister(error.response?.data?.message || 'Registration failed. Please try again.')
            setIsModalOpen(true);
        }
    }

    return (
        <>
            <Modal title="Notice" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <span className="text-red-500">{errorRegister}</span>
            </Modal>
            {contextHolder}
            <Form
                onFinish={onFinish}
                className="bg-white p-6 rounded-lg shadow-sm"
            >
                <Form.Item
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Full name is required!'
                        }
                    ]}
                >
                    <Input 
                        prefix={<span className="text-gray-400">👤</span>}
                        placeholder="FULL NAME" 
                        className="h-11 text-sm" 
                    />
                </Form.Item>

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

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password 
                        prefix={<span className="text-gray-400">🔒</span>}
                        placeholder="CONFIRM PASSWORD" 
                        className="h-11 text-sm"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full h-11 bg-black hover:bg-gray-800">
                        REGISTER
                    </Button>
                </Form.Item>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                </div>
            </Form>
        </>
    )
}

export default FormRegister;