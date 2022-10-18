import { Suspense } from "react";
import { Seo, CacheNone, gql } from "@shopify/hydrogen";
import { Layout, AccountRecoverForm } from "~/components";

export default function AccountRecover({response}) {
    response.cache(CacheNone());

    return(
        <Layout>
            <Suspense>
                <Seo type="noindex" data={{'Title': 'Recover password'}} />
            </Suspense>
            <AccountRecoverForm/>
        </Layout>
    )
}

export async function api (request, {queryShop}) {
    const jsonReq = await request.json();

    if(!jsonReq.email || jsonReq.email == '') {
        return new Response(JSON.stringify({error: "Email required"}),{status: 400});
    }

    await queryShop({
        query: CUSTOMER_RECOVER_MUTATION,
        variables: {
            email: jsonReq.email
        },
        cache: CacheNone(),
    });

    return new Response(null, {status: 200});
}

const CUSTOMER_RECOVER_MUTATION = gql`
    mutation recoverCustomer($email:String!){
        customerRecover(email:$email) {
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`