import './SignUpForm.scss';

function SignUpForm() {
    return (
        <div className='sign-up-form'>
            <form className="sign-up-form__form">
                <input
                    type="text"
                    className="sign-up-form__input"
                    id='email'
                    placeholder='Email address'
                />
                <input
                    type="text"
                    className="sign-up-form__input"
                    id='username'
                    placeholder='Username'
                />
                <input
                    type="password"
                    className="sign-up-form__input"
                    id='password'
                    placeholder='Password'
                />
                <input
                    type="password"
                    className="sign-up-form__input"
                    id='password-confirm'
                    placeholder='Repeat password'
                />
                <button
                    className='sign-up-form__button'
                    type='submit'
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUpForm;