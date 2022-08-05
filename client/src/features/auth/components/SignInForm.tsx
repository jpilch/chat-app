import React from "react";
import { useForm } from "react-hook-form";

function SignInForm() {
    const { register, handleSubmit } = useForm();

    return (
        <section className="sign-in">
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <input
                    {...register("firstName")}
                    type="text" id='first-name'
                    placeholder='First Name...'
                />
                <button type='submit'>Login</button>
            </form>
        </section>
    );
}

export default SignInForm;