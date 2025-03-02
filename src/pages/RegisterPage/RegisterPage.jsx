import FormRegister from "../../components/Forms/FormRegister/FormRegister";

function RegisterPage() {
    return (
        <div className="h-[100vh] w-full flex items-center justify-center">
            <div className="w-[400px]">
                <h1 className="text-[1.75rem] font-bold mb-8 text-center">SIGN UP</h1>
                <FormRegister />
            </div>
        </div>
    )
}
export default RegisterPage;