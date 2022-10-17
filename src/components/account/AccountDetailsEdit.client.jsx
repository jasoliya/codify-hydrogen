import { useState } from "react";
import { useServerProps } from "@shopify/hydrogen";
import { emailValidation } from "~/lib/utils";

export function AccountDetailsEdit({
    firstName: _firstName,
    lastName: _lastName,
    email: _email,
    phone: _phone,
    close
}) {
    const [firstName, setFirstName] = useState(_firstName);
    const [lastName, setLastName] = useState(_lastName);
    const [phone, setPhone] = useState(_phone);
    const [email, setEmail] = useState(_email);
    const [emailError, setEmailError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    const {serverProps, setServerProps} = useServerProps()

    async function handleSubmit(e){
        e.preventDefault();

        setEmailError(null);

        const emailErr = emailValidation(e.currentTarget.email);
        if(emailErr) {
            setEmailError(emailErr);
            return;
        }

        const AccountUpdateReponse = await CallAccountUpdateAPI({firstName, lastName, email, phone});

        if(AccountUpdateReponse.error) {
            setSubmitError(AccountUpdateReponse.error);
            return;
        }

        setServerProps('renderRsc', !serverProps.renderRsc);

        close();
    }

    return(
        <>
            {submitError &&
                <div className="p-4 bg-red-200 rounded mb-4">
                    <p className=" text-sm text-red-900">{submitError}</p>
                </div>
            }
            <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        className=" border w-full py-2 px-3 focus:shadow-outline border-gray-500 rounded"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        aria-label="First name"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                        />
                </div>
                <div className="mb-3">
                    <input 
                        className=" border w-full py-2 px-3 focus:shadow-outline border-gray-500 rounded"
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        aria-label="Last name"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                        />
                </div>
                <div className="mb-3">
                    <input 
                        className=" border w-full py-2 px-3 focus:shadow-outline border-gray-500 rounded"
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Mobile"
                        aria-label="Mobile"
                        value={phone || ''}
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                        />
                </div>
                <div className="mb-3">
                    <input 
                        className={`border w-full py-2 px-3 focus:shadow-outline border-gray-500 rounded ${
                            emailError ? "border-red-500" : "border-gray-500"
                        }`}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email address"
                        aria-label="Email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        />

                    {emailError && 
                        (<p className="text-sm text-red-500">{emailError}</p>)
                    }
                </div>

                <div className=" mt-4">
                    <button className="block w-full px-3 py-2 border rounded bg-black text-white mb-2">Save</button>
                    <button type="button" className="block w-full px-3 py-2 border border-gray-300 rounded" onClick={close}>Cancel</button>
                </div>
            </form>
        </>
    )
}

async function CallAccountUpdateAPI ({firstName, lastName, email, phone}) {
    try {
        const res = await fetch(`/account`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                phone: phone,
                firstName: firstName,
                lastName: lastName
            })
        });
        
        if(res.ok) {
            return {};
        } else {
            return res.json();
        }
    } catch(error) {
        return {
            error: 'Error saving account, please try again.',
        }
    }
}