import { Suspense } from 'react';
import { gql, useRouteParams, useShopQuery, Seo, ShopifyAnalyticsConstants, useServerAnalytics } from '@shopify/hydrogen';
import { Layout } from '~/components/Layout.server';
import { PRODUCT_CARD_FRAGMENT } from "~/lib/fragments";
import { ProductsGrid } from '~/components/ProductsGrid.client';
import { SortOptions } from '~/components/SortOptions.client';

export default function Collection({sortKey, pageBy}) {
	return (
		<Layout>
			<CollectionLayout sortKey={sortKey} pageBy={pageBy} />
		</Layout>
	)
}

export function CollectionLayout({sortKey,pageBy}) {
	const { handle } = useRouteParams();

	const sort_key = sortKey || 'COLLECTION_DEFAULT';
	const page_by = pageBy || 8;

	const {
		data: { collection }
	} = useShopQuery ({
		query: QUERY,
		variables: {
			handle,
			pageBy: page_by,
			sortKey: sort_key
		},
	});

	useServerAnalytics({
		shopify: {
			pageType: ShopifyAnalyticsConstants.pageType.collection,
			resourceId: collection.id,
		}
	});

	return(
		<>
			<Suspense>
		   		<Seo type="collection" data={collection} />
		   	</Suspense>
			   
			<div className='p-6 md:p-8 lg:p-12 flex gap-4 justify-between' >
				<div className=''>
					<section>
						<h1 className="text-4xl  font-bold">{collection.title}</h1>

						{collection.description && (
							<div className="flex mt-6">
								<p className="inline-block">{collection.description}</p>
							</div>
						)}
					</section>
				</div>
				<SortOptions />		
			</div>
			<ProductsGrid key={collection.id} products={collection.products} url={`/collections/${handle}`} />
		</>
	)
}

export async function api (request, {params, queryShop}) {
	if(request.method !== 'POST') {
        return new Response('Method not allowed', {
            status: 405,
            headers: {Allow: 'POST'}
        })
    }

	const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
	const { handle } = params;

	return await queryShop({
        query: ALL_PRODUCTS_PAGINATE_QUERY,
        variables: {
			handle,
            cursor: cursor,
            pageBy: 8
        },
        preload: true
    });
}

const QUERY = gql`
	${PRODUCT_CARD_FRAGMENT}
	query Collection(
		$handle: String!
		$pageBy: Int!
		$sortKey: ProductCollectionSortKeys
	) {
		collection:collectionByHandle(handle:$handle) {
			id
			title
			description
	    	products(first:$pageBy, sortKey: $sortKey) {
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
	}
`;

const ALL_PRODUCTS_PAGINATE_QUERY = gql`
    ${PRODUCT_CARD_FRAGMENT}
    query GetMoreProducts (
        $cursor: String
        $pageBy: Int!
		$handle: String!
    ) {
        collection:collectionByHandle(handle: $handle) {
			products(first:$pageBy, after: $cursor) {
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
    }
`;