import FormLogin from "../../components/Forms/FormLogin/FormLogin";

function LoginPage() {
    return (
        <div className="h-[100vh] w-full flex items-center justify-center">
            <div className="w-[400px]">
                <h1 className="text-[1.75rem] font-bold mb-8 text-center">SIGN IN</h1>
                <FormLogin />
            </div>
        </div>
    )
}
export default LoginPage;