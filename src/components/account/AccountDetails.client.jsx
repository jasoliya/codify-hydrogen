import { useState } from "react";
import { Popup } from "../Popup.client";
import { AccountDetailsEdit } from "./AccountDetailsEdit.client";

export function AccountDetails ({firstName,lastName,email,phone}) {
    const [isEditing, setIsEditing] = useState(false);
    
    const close = () => setIsEditing(false);

    return(
        <>
            {isEditing && 
                (
                    <Popup isOpen={isEditing} onClose={close} title="Update your profile">
                    <AccountDetailsEdit 
                        firstName={firstName}
                        lastName={lastName}
                        phone={phone}
                        email={email}
                        close={close} 
                    />
                    </Popup>
                )
            }
            <div className="grid mt-4 p-6 py-8 md:p-8 lg:p-12 gap-4 md:gap-6 lg:gap-8">
                <h3 className="font-bold">Account Details</h3>
                <div className="p-6 lg:p-8 border rounded border-gray-200">
                    <div className="flex gap-2 mb-4">
                        <h3 className="font-bold flex-1">Profile and Security</h3>
                        <button className=" text-sm underline" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">Name</p>
                    <p className="mt-1 text-gray-700">{firstName} {lastName}</p>
                    <p className="mt-4 text-sm text-gray-500">Phone</p>
                    <p className="mt-1 text-gray-700">{phone ?? 'Add mobile'}</p>
                    <p className="mt-4 text-sm text-gray-500">Email address</p>
                    <p className="mt-1 text-gray-700">{email}</p>
                    <p className="mt-4 text-sm text-gray-500">Password</p>
                    <p className="mt-1 text-gray-700">******</p>
                </div>
            </div>
        </>
    )
}