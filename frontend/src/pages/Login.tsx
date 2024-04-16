import { LoginForm } from "../components/LoginForm"
import { Quote } from "../components/Quote"

export const Login = () =>{
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
            <LoginForm/>
        </div>
        <div className="hidden md:block">
            <Quote/>
        </div>
        </div>
        </>
    )
}