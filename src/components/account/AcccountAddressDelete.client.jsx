import { useRenderServerComponents } from "~/lib/utils";

export function AcccountAddressDelete({addressId, close}) {
    const renderServerComponents = useRenderServerComponents();

    async function DeleteAddress(addressId) {
        const response = await CallDeleteApi(addressId);

        if(response.error) {
            alert(response.error);
            return;
        }

        renderServerComponents();
        close();
    }

    return (
        <>
            <p>Are you sure to remove this address?</p>
            <div className=" mt-4 flex w-full flex-wrap">
                <button className=" border rounded bg-black text-white border-black py-2 px-3 text-sm w-full" onClick={() => DeleteAddress(addressId)}>Confirm</button>
                <button className=" border rounded border-gray-200 py-2 px-3 text-sm mt-3 w-full" onClick={close}>Cancel</button>
            </div>
        </>
    )
}

export async function CallDeleteApi(addressId) {
    try {
        const res = await fetch(`/account/address/${encodeURIComponent(addressId)}`,{
            method: 'DELETE',
            headers: {
                Accept: 'application/json'
            }
        });

        if(res.ok) {
            return {};
        } else {
            return res.json();
        }
    } catch (error) {
        return {
            error: 'Error removing address. Please try again.'
        }
    }
}