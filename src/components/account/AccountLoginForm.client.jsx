import { useState } from "react";
import { Link, useNavigate } from "@shopify/hydrogen";

export function AccountLoginForm({Shopname}) {
    const navigate = useNavigate();
    const [showEmailField,setshowEmailField] = useState(true);
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(null);
    const [pwd, setPwd] = useState('');
    const [pwdErr, setPwdErr] = useState(null);
    const [submitErr, setSubmitErr] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailErr(null);
        setSubmitErr(false);
        setPwdErr(null);

        if(showEmailField) {
            checkEmail(e);
        } else {
            checkPwd(e);
        }
    }

    function checkEmail(e) {
        let validity = e.currentTarget.email.validity;
        if(validity.valid) {
            setEmailErr(null);
            setshowEmailField(false);
        } else {
            setEmailErr(validity.valueMissing ? 'Please enter email' : 'Please enter valid email');
        }
    }

    async function checkPwd(e) {
        const validity = e.currentTarget.password.validity;
        if(validity.valid) {
            const response = await callLoginApi({email, pwd});

            if(response.error) {
                setSubmitErr(true);
                resetForm();
            } else {
                navigate('/account');
            }
        } else {
            setPwdErr(validity.valueMissing ? 'Please enter password' : 'Password must be atleast 6 characters');
        }
    }

    function resetForm() {
        setshowEmailField(true);
        setEmail('')
        setEmailErr(null);
        setPwd('');
        setPwdErr(null);
    }

    return(
        <div className="flex justify-center my-24 px-10">
            <div className="max-w-md w-full">
                <h1 className="text-4xl mb-10">Sign In</h1>
                <form noValidate className="mb-4" onSubmit={handleSubmit}>
                    {submitErr && 
                        (
                            <div className="mb-6 bg-zinc-500 text-white p-4 text-sm">
                                Sorry we did not recognize either your email or password. Please
                                try to sign in again or create a new account.
                            </div>
                        )
                    }

                    {showEmailField &&
                        (
                            <>
                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className={`rounded w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 focus:shadow-outline border ${ emailErr == null ? "border-gray-500": "border-red-500"}`} 
                                        id="email"
                                        name="email"
                                        value={email}
                                        required
                                        placeholder="Email Address"
                                        onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                    {emailErr != null &&
                                        (<p className="text-xs text-red-600">{emailErr}</p>)
                                    }
                                </div>

                                <div>
                                    <button 
                                        type="submit"
                                        className="bg-gray-900 text-white rounded py-2 px-4 focus:shadow-outline block w-full"
                                    >
                                        Next
                                    </button>
                                </div>

                                <div className="flex border-t mt-8 border-gary-300">
                                    <p className="text-sm mt-6">
                                        New to {Shopname}? <Link className="inline underline" to="/account/register">Create an account</Link>
                                    </p>
                                </div>
                            </>
                        )
                    }

                    {!showEmailField &&
                        (
                            <div className="flex justify-between mb-3 items-center">
                                <div>
                                    <p>{email}</p>
                                </div>
                                <div>
                                    <button className="inline-block align-baseline text-sm underline" type="button" onClick={resetForm}>Change email</button>
                                </div>
                            </div>
                        )
                    }
                    
                    {!showEmailField &&
                        (
                            <>
                                <div className="mb-3">
                                    <input 
                                        type="password"
                                        className={`rounded w-full px-3 py-2 text-primary/90 placeholder:text-primary/50 focus:shadow-outline border ${pwdErr == null ? "border-gray-500" : "border-red-500"}`}
                                        name="password"
                                        placeholder="Password"
                                        value={pwd}
                                        minLength={8}
                                        required
                                        onChange={(e) => {setPwd(e.target.value)}}
                                    />
                                    {pwdErr != null &&
                                        (<p className="text-xs text-red-600">{pwdErr}</p>)
                                    }
                                </div>

                                <div>
                                    <button 
                                        type="submit"
                                        className="bg-gray-900 text-white rounded py-2 px-4 focus:shadow-outline block w-full"
                                    >
                                        Sign in
                                    </button>
                                </div>

                                <div className="flex justify-end border-t border-gray-300 pt-8 mt-8">
                                    <Link to="/account/recover" className="text-primary/50 text-sm">Forgot password?</Link>
                                </div>
                            </>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export async function callLoginApi({email, pwd}) {
    try {
        const res = await fetch(`/account/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email, pwd})
        });        
        if(res.ok) {
            return {};
        } else {
            return res.json();
        }
    } catch(error) {
        return {
            error: error.toString()
        }
    }
}