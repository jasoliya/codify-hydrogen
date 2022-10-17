import { useState, useMemo } from "react";
import { useRenderServerComponents } from "~/lib/utils";

export function AccountAddressEdit ({address, defaultAddress, close}) {
    const isNewAddress = useMemo(() => Object.keys(address).length == 0, [address]);

    const [saving, setSaving] = useState(false);
    const [address1, setAddress1] = useState(address?.address1 || '');
    const [address2, setAddress2] = useState(address?.address2 || '');
    const [firstName, setFirstName] = useState(address?.firstName || '');
    const [lastName, setLastName] = useState(address?.lastName || '');
    const [company, setCompany] = useState(address?.company || '');
    const [country, setCountry] = useState(address?.country || '');
    const [province, setProvince] = useState(address?.province || '');
    const [city, setCity] = useState(address?.city || '');
    const [zip, setZip] = useState(address?.zip || '');
    const [phone, setPhone] = useState(address?.phone || '');
    const [isDefaultAddress, setIsDefaultAddress] = useState(defaultAddress);
    const [submitError, setSubmitError] = useState(null);

    const renderServerComponents = useRenderServerComponents();

    async function handleSubmit(e) {
        e.preventDefault();

        setSaving(true);

        const response = await callUpdateAddressApi({
            id: address?.originalId,
            firstName,
            lastName,
            company,
            address1,
            address2,
            country,
            province,
            city,
            zip,
            phone,
            isDefaultAddress,
        });

        setSaving(false);

        if (response.error) {
            setSubmitError(response.error);
            return;
        }

        renderServerComponents();
        close();
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
             {submitError && (
                <div className="flex items-center justify-center mb-6 bg-red-100 rounded">
                <p className="m-4 text-sm text-red-900">{submitError}</p>
                </div>
            )}
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="firstName"
                    required
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="lastName"
                    placeholder="Last name"
                    required
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="company"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => {
                        setCompany(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="address1"
                    placeholder="Address line 1*"
                    required
                    value={address1}
                    onChange={(e) => {
                        setAddress1(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="address2"
                    placeholder="Address line 2"
                    value={address2}
                    onChange={(e) => {
                        setAddress2(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="city"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="state"
                    placeholder="Province / State"
                    required
                    value={province}
                    onChange={(e) => {
                        setProvince(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="zip"
                    placeholder="Zip / Postal Code"
                    required
                    value={zip}
                    onChange={(e) => {
                        setZip(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="text"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="country"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <input 
                    type="tel"
                    className="border border-gray-300 py-2 px-3 rounded w-full"
                    name="phone"
                    placeholder="Phone"
                    required
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                />
            </div>
            <div className="mb-4">
                <input 
                    type="checkbox"
                    name="defaultAddress"
                    id="defaultAddress"
                    className=" cursor-pointer rounded-sm border-gray-500"
                    checked={isDefaultAddress}
                    onChange={(e) => {
                        setIsDefaultAddress(!isDefaultAddress)
                    }}
                />
                <label htmlFor="defaultAddress" className=" text-sm ml-2 cursor-pointer">Set as a default address?</label>
            </div>
            <div className="mt-8">
                <button 
                    type="submit"
                    className=" rounded px-3 py-2 w-full border border-gray-300 disabled:opacity-60"
                    disabled={saving}
                >{saving ? "Saving..." : "Save" }</button>
                <button 
                    type="button"
                    className=" rounded px-3 py-2 w-full mt-3 text-white bg-black border border-black "
                    disabled={saving}
                    onClick={close}
                >Cancel</button>
            </div>
        </form>
    )
}

async function callUpdateAddressApi ({
  id,
  firstName,
  lastName,
  company,
  address1,
  address2,
  country,
  province,
  city,
  phone,
  zip,
  isDefaultAddress,
}) {
    try {
        const res = await fetch(
            id ? `/account/address/${encodeURIComponent(id)}` : '/account/address',
            {
                method: id ? 'PATCH' : 'POST',
                headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    company,
                    address1,
                    address2,
                    country,
                    province,
                    city,
                    phone,
                    zip,
                    isDefaultAddress,
                }),
            },
        );
        if (res.ok) {
            return {};
        } else {
            return res.json();
        }
    } catch (error) {
        return {
            error: 'Error saving address. Please try again.',
        };
    }
}