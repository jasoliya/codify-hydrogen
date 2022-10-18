import { Seo, CacheNone, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import { Suspense } from "react"; 
import { Layout, AccountLoginForm } from "~/components";

export default function Login({response}) {
    response.cache(CacheNone());

    const {
        data: {
            shop: {name}
        }
    } = useShopQuery ({
        query: SHOP_QUERY,
        cache: CacheLong(),
        preload: "*"
    })

    return(
        <Layout>
            <Suspense>
                <Seo type="noindex" data={{title: 'Login'}} />
            </Suspense>
            <AccountLoginForm Shopname={name}/>
        </Layout>
    );
}

const SHOP_QUERY = gql`
    query shopInfo {
        shop {
            name
        }
    }
`;

export async function api(request, {session, queryShop}) {
    if(!session) {
        return new Response('Session storage not available', {status: 400});
    }

    const jsonBody = await request.json()
    
    if(!jsonBody.email ||
        jsonBody.email == '' ||
        !jsonBody.pwd ||
        jsonBody.pwd == ''
    ) {
        return Response('Incorrect email or password',{status: 400});
    }

    const {data, errors} = await queryShop({
        query: MUTATION_QUERY,
        variables: {
            input: {
                email: jsonBody.email,
                password: jsonBody.pwd
            }
        },
        cache: CacheNone()
    });

    if(data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
        await session.set('customerAccessToken',data.customerAccessTokenCreate.customerAccessToken.accessToken);
        return new Response(null,{status: 200});
    } else {
        return new Response(
            JSON.stringify({
                error: data?.customerAccessTokenCreate?.customerUserErrors ?? errors,
            }),
            {status: 401}
        )
    }
}

const MUTATION_QUERY = gql`
    mutation createCustomerAccessToken($input:CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input:$input) {
            customerUserErrors {
                code
                field
                message
            }
            customerAccessToken {
                accessToken
                expiresAt
            }
        }
    }
`