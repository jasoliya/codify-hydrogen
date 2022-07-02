import {Suspense} from 'react';
import {gql, useShopQuery, useUrl, CacheLong, Seo, Link} from '@shopify/hydrogen';
import Header from './Header.client';

export function Layout({children}) {
	const { pathname } = useUrl();

	const isHome = pathname == '/';

	const {
		data: { shop },
	} = useShopQuery({
		query: SHOP_QUERY,
		cache: CacheLong(),
	})

	return (
    	<>
    		<Suspense>
	    		<Seo 
	    			type="defaultSeo"
	    			data={{
	    				title: shop.name,
	    				description: shop.description,
	    			}}
	    		/>
    		</Suspense>
    		<div className="flex flex-col min-h-screen bg-neutral-50">
	    		<Header shop={shop} />
	    		<main id="mainContent">
	    			<Suspense>{children}</Suspense>
	    		</main>
    		</div>
    	</>
    );
}

const SHOP_QUERY = gql`
	query ShopInfo{
		shop {
			name
			description
		}
	}
`;