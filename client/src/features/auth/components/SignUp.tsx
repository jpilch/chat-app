import './SignUp.scss'

import CompanyTrademark from "../../app/components/CompanyTrademark";
import SignUpForm from "./SignUpForm";

function SignUp() {
    return (
        <main className="sign-up">
            <section className="sign-up__logo">
                <CompanyTrademark />
            </section>
            <section className='sign-up__form'>
                <SignUpForm />
            </section>
        </main>
    );
}

export default SignUp;