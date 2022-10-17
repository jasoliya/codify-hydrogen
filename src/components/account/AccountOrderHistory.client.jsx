import { Link, Image, flattenConnection } from "@shopify/hydrogen"

export function AccountOrderHistory({orders}) {
    return(
        <div className="grid mt-4 gap-4 py-6 p-4 md:gap-8 md:p-8 lg:p-12">
            <h2 className=" font-bold">Order history</h2>
            {orders?.length ? <OrderList orders={orders} /> : <EmptyOrder />}
        </div>
    )
}

function OrderList({orders}) {
    return (
        <ul className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-3">
            {orders.map((order) => (
                <OrderCard order={order} key={order.id}/>
            ))}
        </ul>
    )
}

function EmptyOrder() {
    return (
        <div>
            <p>You haven't place any order yet.</p>        
            <Link to={'/'} className="mt-6 text-sm underline">Continue shopping</Link>
        </div>
    )
}

function OrderCard({order}) {
    const LineItems = flattenConnection(order?.lineItems);
    const LegacyOrderId = order.id.split('/').pop().split('?')[0];

    return(
        <li className="grid border rounded ">
            <Link to={`/account/orders/${LegacyOrderId}`} className="grid gap-4 p-4 md:p-6 md:gap-6 md:grid-cols-2 items-center">
                {LineItems[0].variant?.image && (
                    <div className="aspect-square">
                        <Image 
                            height={168}
                            width={168}
                            className="w-full"
                            alt={LineItems[0].variant?.image?.alt ?? 'Order Image'}
                            data={LineItems[0].variant?.image}
                            loaderOptions={{scale: 2, crop: 'center'}}             
                        />
                    </div>
                )}

                <div className={`justify-center ${!LineItems[0].variant?.image && "md:col-span-2" }`}>
                    <h3 className=" uppercase font-bold">{LineItems.length > 1
                        ? `${LineItems[0].title} + ${LineItems.length - 1} more`
                        : LineItems[0].title
                    }</h3>
                    <div className="grid gap-1 mt-1">
                        <p className=" text-sm text-gray-500">Order no.: {order.orderNumber}</p>
                        <p className=" text-sm text-gray-500">{new Date(order.processedAt).toDateString()}</p>
                    </div>
                    <div className="mt-2">
                        <span className={`py-1 px-3 text-xs rounded-full capitalize ${
                            order.fulfillmentStatus == 'FULFILLED' 
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`} >
                            {order.fulfillmentStatus}
                        </span>
                    </div>
                </div>
            </Link>
            <div className=" self-end border-t">
                <Link to={`/account/order/${LegacyOrderId}`} className="p-2 max-w-prose block text-center text-gray-600">View Details</Link>
            </div>
        </li>
    )
}