import { useState, useMemo } from "react";
import { Popup } from "../Popup.client";
import { AccountAddressEdit } from "./AccountAddressEdit.client";
import { AcccountAddressDelete } from "./AcccountAddressDelete.client";

export function AccountAddresses({addresses, defaultAddress}) {
    const [editAddress, setEditAddress] = useState(null);
    const [deleteAddress, setDeleteAddress] = useState(null);
    
    const {fullDefaultAddress, addressWithoutDefault} = useMemo(() => {
        const defaultAddressIndex = addresses.findIndex((address) => address.id === defaultAddress);

        return {
            addressWithoutDefault: [
                ...addresses.slice(0,defaultAddressIndex),
                ...addresses.slice(defaultAddress + 1, addresses.length)
            ],
            fullDefaultAddress: addresses[defaultAddressIndex]
        }
    },[addresses,defaultAddress]);
    
    const close = () => {
        setEditAddress(null);
        setDeleteAddress(null);
    };

    const handleEdit = (address) => {
        setEditAddress(address);
    }

    return(
        <>
            {deleteAddress &&
                <Popup isOpen={true} onClose={close} title="Confirm removal">
                    <AcccountAddressDelete addressId={deleteAddress} close={close} />
                </Popup>
            }

            {editAddress &&
                <Popup isOpen={true} onClose={close} title={`${Object.keys(editAddress).length == 0 ? "Add an address" : "Update an address" }`}>
                    <AccountAddressEdit 
                        address={editAddress} 
                        defaultAddress={editAddress === fullDefaultAddress}
                        close={close} 
                    />
                </Popup>
            }
            <div className="grid gap-4 md:gap-8 mt-4 py-6 p-8 md:p-8 lg:p-12">
                <h3 className=" font-bold">Address details</h3>
                <div className="w-48 mb-6">
                    <button className=" inline-block border rounded py-2 px-3 border-gray-300 w-full" onClick={() => handleEdit({})}>Add an address</button>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {addresses.map((address) => (
                        <div className=" p-6 lg:p-8 border border-gray-200 rounded flex flex-col" key={address.id}>
                            {address.id == defaultAddress && (
                                <div className=" mb-3 flex flex-wrap">
                                    <span className=" px-3 py-1 text-xs font-medium rounded-full text-gray-800 bg-gray-300">Default</span>
                                </div>
                            )}
                            <ul className="flex-1 flex-row">
                            {address.firstName || address.lastName ? (
                                <li>{(address.firstName && (address.firstName)+ ' ') + address.lastName}</li>
                            ): (
                                <></>
                            )}
                            {address.formatted && address.formatted.map((line,index) => <li key={index}>{line}</li>)}
                            </ul>
                            <div className=" flex mt-6 font-medium ">
                                <button className="text-sm underline" onClick={() => handleEdit(address)}>Edit</button>
                                <button className=" ml-6 text-sm text-gray-500" onClick={() => setDeleteAddress(address.originalId)}>Remove</button>
                            </div>
                        </div>    
                    ))}
                    
                </div>
            </div>
        </>
    );
}