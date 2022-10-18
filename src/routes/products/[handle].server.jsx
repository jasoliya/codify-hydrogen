import {
	gql,
	useShopQuery,
	useServerAnalytics,
	useRouteParams,
	ShopifyAnalyticsConstants,
	Seo
} from '@shopify/hydrogen';

import { Suspense } from 'react';
import { Layout } from '../../components/Layout.server';
import ProductDetails from '../../components/ProductDetails.client';

export default function Product() {
	const { handle } = useRouteParams();

	const { 
		data: { productByHandle }
	} = useShopQuery({
		query: QUERY,
		variables: {
			handle: handle
		}
	});

	const product = productByHandle;

	useServerAnalytics({
	    shopify: {
	      	pageType: ShopifyAnalyticsConstants.pageType.product,
	      	resourceId: product.id,
	    },
	});

	return (
		<Layout>
			<Suspense>
				<Seo type="product" data={product} />
			</Suspense>
			<ProductDetails product={product}/>
		</Layout>
	)
}

const QUERY = gql`
	fragment MetaFields on Media {
	  mediaContentType 
	  alt
	  previewImage {
	    url:originalSrc
	  }
	  ... on MediaImage {
	    id
	    image {
	      width
	      height
	      url:originalSrc
	    }
	  }
	  ... on Video {
	    id
	    sources {
	      mimeType
	      url
	    }
	  }
	  ... on Model3d {
	    id
	    sources {
	      mimeType
	      url
	    }
	  }
	  ... on ExternalVideo {
	    id
	    embeddedUrl
	    host
	  }
	}

	query productDetails($handle: String!) {
		productByHandle(handle: $handle) {
			id
	    	title
	    	vendor
	    	descriptionHtml
		    media(first:8) {
		      	edges {
		          node {
		            ... MetaFields
		          }
		        }
    		}
	    	variants(first:100) {
	      	edges {
	          node {
		            id
		            title
		            sku
		            availableForSale
		            priceV2 {
		              amount
		              currencyCode
		            }
		            compareAtPriceV2 {
		              amount
		              currencyCode
		            }
		            selectedOptions {
		              name
		              value
		            }
		            image {
		              id
		              width
		              height
		              url:originalSrc
		            }
		          }
		        }
    		}
	    	seo {
		        title
		        description
		    }
		}
	}
`;