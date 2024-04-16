import { SignupForm } from "../components/SignupForm"
import { Quote } from "../components/Quote"

export const Signup = () =>{
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
            <SignupForm/>
        </div>
        <div className="hidden md:block">
            <Quote/>
        </div>
        </div>
        </>
    )
}