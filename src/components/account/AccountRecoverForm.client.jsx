import {React, useState} from "react";

export function AccountRecoverForm({response}) {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null);

    async function handleSubmit(e) {
      e.preventDefault();
      
      setEmailErr(null)

      const validity = e.currentTarget.email.validity;
      if(!validity.valid) {
        setEmailErr(validity.valueMissing ? 'Enter email address' : 'Enter valid email address');
        return;
      } 

      await callAccountRecoverApi({email});

      setEmail('');
      setSubmitSuccess(true);
    }   

    return(
        <>
          <div className="my-24 px-10 flex justify-center">
            <div className="max-w-md w-full">
              {submitSuccess ? (
                <>
                  <h1 className="text-4xl">Request sent</h1>
                  <p className="mt-4">If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.</p>
                </>
              )  : (
                <>
                  <h1 className="text-4xl">Forgot password</h1>
                  <p className="mt-4">Enter the email address associated with your account to receive a link to reset your password.</p>
                </>
              ) }
              

              <form className="my-6" noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`rounded border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 focus:shadow-outline ${emailErr == null ? "border-gray-500" : "border-red-500"}`}
                    value={email}
                    name="email"
                    required
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    {emailErr != null && 
                      (
                        <p className="text-xs text-red-600">{emailErr}</p>
                      )
                    }
                </div>

                <div>
                  <button 
                      type="submit"
                      className="bg-gray-900 text-white rounded py-2 px-4 focus:shadow-outline block w-full"
                  >
                      Request Reset Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
    );
}

export async function callAccountRecoverApi({
  email,
  password,
  firstName,
  lastName
}) {
  try {
    const res = await fetch('/account/recover', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({email,password,firstName,lastName})
    });
    if(res.status == 200) {
      return {};
    } else {
      return res.json()
    }
  } catch (error) {
    return {
      error: error.toString()
    }
  }
}