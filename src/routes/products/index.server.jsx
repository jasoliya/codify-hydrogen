import { Suspense } from "react";
import { Layout } from "~/components/Layout.server";
import { PRODUCT_CARD_FRAGMENT } from "~/lib/fragments";
import { Seo, useShopQuery, gql } from '@shopify/hydrogen';
import { ProductsGrid } from "~/components/ProductsGrid.client";

export default function AllProducts() {
    return(
        <Layout>
            <Suspense>
                <Seo type="page" data={{title: 'All Products'}} />
            </Suspense>
            <div className=' p-6 md:p-8 lg:p-12 flex gap-4 justify-between'>
                <section>
                    <h1 className="text-4xl  font-bold">Products</h1>
                </section>
            </div>
            <AllProductsGrid />
        </Layout>
    )
}

function AllProductsGrid() {
    const {data} = useShopQuery({
        query: ALL_PRODUCTS_QUERY,
        variables: {
            pageBy: 8
        },
        preload: true
    });

    const products = data.products;

    return(
        <>
            <ProductsGrid key="products" products={products} url="/products" />
        </>
    )
}

export async function api (request, {queryShop}) {
    if(request.method !== 'POST') {
        return new Response('Method not allowed', {
            status: 405,
            headers: {Allow: 'POST'}
        })
    }

    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');

    return await queryShop({
        query: ALL_PRODUCTS_PAGINATE_QUERY,
        variables: {
            cursor: cursor,
            pageBy: 8
        },
        preload: true
    });
}

const ALL_PRODUCTS_QUERY = gql`
    ${PRODUCT_CARD_FRAGMENT}
    query ProductsPage (
        $pageBy: Int!
    ) {
        products(first: $pageBy) {
            nodes {
                ...ProductCard
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                endCursor
            }
        }
    }
`;

const ALL_PRODUCTS_PAGINATE_QUERY = gql`
    ${PRODUCT_CARD_FRAGMENT}
    query AllProductsPage (
        $cursor: String
        $pageBy: Int!
    ) {
        products(first: $pageBy, after: $cursor) {
            nodes {
                ...ProductCard
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                endCursor
            }
        }
    }
`;