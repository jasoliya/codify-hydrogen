import {gql, useShopQuery, Link, Image, CacheLong} from '@shopify/hydrogen';

export function FeaturedCollections() {
	const {
		data: { collections },
	} = useShopQuery({
		query: QUERY,
		cache: CacheLong()
	});

	return (
		<div className="md:gap-8 md:p-8 lg:p-12 p-6">
			<h2 className="text-4xl text-center text-lead font-bold mb-10">Collections {Oxygen.env.MY_STORE_NAME}</h2>
			<div className="grid grid-flow-row gap-6 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
			 {collections.edges.map((collection) => {
			 	let coll = collection.node;
			 	let img = coll?.image ? coll.image : coll.products.edges[0].node.images.edges[0].node;

			 	return (
			 		<Link key={coll.id} to={`collections/${coll.handle}`}>
			 			<div className="coll-inner grid gap-2">
			 				{img && (
			 					<Image className="rounded show-border aspect-square object-cover" alt={`Image of ${coll.title}`} data={img} />
			 				)}
			 				<h2 className="text-lg text-center">{coll.title}</h2>
			 			</div>
			 		</Link>
			 	)
			 })}
			</div>
		</div>
	)
}

const QUERY = gql`
	query FeaturedCollections{
		collections(first: 4, sortKey: UPDATED_AT) {
			edges {
		    	node {
		          id
		          title
		          handle
		          image {
		            id
		            width
		            height
		            url: transformedSrc
		          }
		          products(first:1) {
			      	edges {
			          node {
			          	images(first: 1) {
			          	  edges {
			          	  	node {
			          	  	  url: transformedSrc
			          	  	}
			          	  }
			          	}
			          }
			      	}
			      }
		        }
  			}
		}
	}
`
