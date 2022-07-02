import { Suspense } from 'react';
import { gql, useRouteParams, useShopQuery, Seo, ShopifyAnalyticsConstants, useServerAnalytics } from '@shopify/hydrogen';
import { Layout } from '../../components/Layout.server';
import ProductCard from '../../components/ProductCard.server';

export default function Collection() {
	const { handle } = useRouteParams();

	const {
		data: { collectionByHandle }
	} = useShopQuery ({
		query: QUERY,
		variables: {
			handle,
		},
	})

	const collection = collectionByHandle;

	useServerAnalytics = ({
		shopify: {
			pageType: ShopifyAnalyticsConstants.pageType.collection,
			resourceId: collection.id,
		}
	})

	return (
		<Layout>
		   <Suspense>
		   		<Seo type="collection" data={collection} />
		   </Suspense>
			<section className="p-6 md:p-8 lg:p-12">
				<h1 className="text-4xl  font-bold">{collection.title}</h1>

				{collection.description && (
					<div className="flex mt-6">
						<p className="inline-block">{collection.description}</p>
					</div>
				)}
			</section>
			<section className="px-6 md:px-8 lg:px-12 pb-6 md:pb-8 lg:pb-12">
				<div className="grid grid-flex-row gap-4 gap-y-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{collection.products.edges.map((product) => (
						<ProductCard key={product.node.id} product={product.node}/>
					))}
				</div>
			</section>
		</Layout>
	)
}

const QUERY = gql`
	query Collection($handle: String!) {
		collectionByHandle(handle:$handle) {
			id
			title
			description
	    	products(first:8) {
		      	edges {
		          node {
		            id
		            title
		            publishedAt
		            handle
		            images(first: 1) {
	                  edges {
	                    node {
	                      id
	                      width
	                      height
	                      url: transformedSrc
	                    }
	                  }
	              	}
		            variants(first:1) {
		              edges {
		                node {
		                  id
		                  priceV2 {
		                    amount
		                    currencyCode
		                  }
		                  compareAtPriceV2 {
		                    amount
		                    currencyCode
		                  }
		                }
		              }
		            }
		          }
		        }	
    		}
		}
	}
`;