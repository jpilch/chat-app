import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { setUsername } from "../authSlice";
import { useNavigate } from "react-router-dom";

import { FormData } from '../types/form-data';

function SignInForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            firstName: ""
        }
    });

    return (
        <section className="sign-in">
            <form onSubmit={handleSubmit((data, e) => {
                e!.target.reset();
                dispatch(setUsername(data.firstName));
                navigate("/chat");
            })}>
                <input
                    {...register("firstName", { required: "First name is required" })}
                    type="text" id='first-name'
                    placeholder='First Name...'
                />
                <p>{errors.firstName?.message}</p>
                <button type='submit'>Login</button>
            </form>
        </section>
    );
}

export default SignInForm;