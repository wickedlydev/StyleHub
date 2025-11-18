import { useState } from "react";
import InputForm from "../input-form/inputform.component";
import './signin.component.scss'
import Button from "../button/button.component";
import { SignInWithGoogleAuth , signInUserWithEmailAndPasswordFunc } from "../../utils/firebase.utils";
// import { UserContext } from "../../contexts/externalcontexts";

const formFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    // In this form we need to verify the email and password entered by user

    const [formField, setformField] = useState(formFields);
    // const {setuserStorage} = useContext(UserContext);

    const onChangeHandler = (event) => {
        // The event will give name, value, etc
        const {name, value} = event.target;

        setformField({...formField , [name]: value});
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault(); // This will not submit anything any where

        console.log(formField);

        try {
            await signInUserWithEmailAndPasswordFunc(formField.email, formField.password);
            // setuserStorage(user);
        }catch (e){
            console.log(e);
            if(e.code === 'auth/invalid-login-credentials'){
                alert('Invalid Login Credentials');
            }
        }
    }

    const logUser = async () => {
        await SignInWithGoogleAuth();
        // setuserStorage(user);
        // const userDocRefOb = await createUserDocument(res.user);
        // console.log(userDocRefOb);
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account? Let's go!!!</h2>
            <form onSubmit={onSubmitHandler}>

                <InputForm required label='Email' type='email' name='email' value={formField.email} onChange={onChangeHandler} />
                <InputForm required label='Password' type='password' name='password' value={formField.password} onChange={onChangeHandler} />
                
                <div className="buttons-container">
                    <Button label="Sign In" buttonType="inverted" type="submit"></Button>
                    <Button label="Google Sign In" buttonType="google" onClick={logUser} type="button"></Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;