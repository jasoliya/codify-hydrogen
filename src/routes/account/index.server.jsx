import { Seo, CacheNone, useSession, useShopQuery, gql, flattenConnection } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Layout, LogoutButton, AccountOrderHistory, AccountDetails, AccountAddresses } from "~/components";
import { getApiErrorMessage } from "~/lib/utils";

export default function Account({response}) {
    response.cache(CacheNone());

    const {customerAccessToken} = useSession();

    if (!customerAccessToken) return response.redirect('/account/login');

    const {data} = useShopQuery({
        query: CUSTOMER_QUERY,
        variables: {
            customerAccessToken
        },
        cache: CacheNone()
    })

    const {customer} = data;

    if (!customer) return response.redirect('/account/login');

    const addresses = flattenConnection(customer.addresses).map((address) => {
      return ({ 
        ...address,
        id: address.id.substring(0, address.id.lastIndexOf('?')),
        originalId: address.id
      })
    });

    const defaultAddress = customer?.defaultAddress?.id.substring(
      0,
      customer.defaultAddress.id.lastIndexOf('?')
    )

    return (
        <>
            <AuthenticatedAccount 
                customer={customer}
                addresses={addresses}
                defaultAddress={defaultAddress}
            />
        </>
    )
}

function AuthenticatedAccount({
    customer,
    addresses,
    defaultAddress
}) {
    const heading = customer
        ? customer.firstName 
            ? `Welcome, ${customer.firstName}`
            : `Welcome to your account`
        : `Account details`;

    const orders = flattenConnection(customer?.orders) || null;

    return(
        <Layout>
            <Suspense>
                <Seo type="noindex" data={{title: 'Account details'}} />
            </Suspense>
            <div className="p-6 py-8 md:p-8 lg:p-12 grid gap-4 md:gap-6 lg:gap-8">
                <h1 className="text-4xl font-bold">{heading}</h1>
                <LogoutButton />
            </div>

            <AccountOrderHistory orders={orders} />
            <AccountDetails 
                firstName={customer.firstName} 
                lastName={customer.lastName}
                phone={customer.phone}
                email={customer.email}
            />
            <AccountAddresses 
              addresses={addresses} 
              defaultAddress={defaultAddress} 
            />
        </Layout>
    );
}

export async function api(request,{session,queryShop}) {
    if(request.method !== 'PATCH' && request.method !== 'DELETE') {
        return new Response({
            status: 405,
            headers: {
                Allow: 'PATCH,DELETE'
            }
        });
    }

    if(!session) return new Response('Session storage not available', {status: 400});
    
    const {customerAccessToken} = await session.get();

    if(!customerAccessToken) return new Response(null, {status: 401});
    
    const {email, phone, firstName, lastName} = await request.json();

    const customer = {};

    if(email) customer.email = email;
    if(phone) customer.phone = phone;
    if(firstName) customer.firstName = firstName;
    if(lastName) customer.lastName = lastName;

    const {data, errors} = await queryShop({
        query: CUSTOMER_MUTATION_QUERY,
        variables: {
            customer,
            customerAccessToken
        },
        cache: CacheNone()
    });

    const error = getApiErrorMessage('customerUpdate', data, errors);

    if(error) return new Response(JSON.stringify({error}), {status: 400});

    return new Response(null);
}

const CUSTOMER_QUERY = gql`
query getCustomer($customerAccessToken: String!) {
	customer(customerAccessToken: $customerAccessToken)  {
    id
    firstName
    lastName
    email
    phone
    defaultAddress {
      id
      formatted
    }
    addresses(first: 6) {
      edges {
        node {
          id
          formatted
          firstName
          lastName
          company
          address1
          address2
          country
          province
          city
          zip
          phone
        }
      }
    }
    orders(first:250, reverse: true) {
      edges {
        node {
          id
          orderNumber
          processedAt
          financialStatus
          fulfillmentStatus
          currentTotalPrice {
            amount
            currencyCode
          }
          lineItems(first:2) {
            edges {
              node {
                variant {
                  image {
                    url
                    altText
                    height
                    width
                  }
                }
                title
              }
            }
          }
        }
      }
    }
  }
}
`;

const CUSTOMER_MUTATION_QUERY = gql`
  mutation updateCustomer(
    $customer:CustomerUpdateInput!
    $customerAccessToken:String!
  ) {
    customerUpdate (
      customer: $customer,
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors{
        code
        field
        message
      }
    }
  }
`;