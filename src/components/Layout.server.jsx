import {Suspense} from 'react';
import {gql, useShopQuery, useUrl, CacheLong, Seo, Link} from '@shopify/hydrogen';
import Header from './Header.client';
import {parseMenu} from '../lib/utils';

export function Layout({children}) {
	const { pathname } = useUrl();

	const isHome = pathname == '/';

	const {data} = useShopQuery({
		query: SHOP_QUERY,
		cache: CacheLong(),
		variables: {
			MenuHandle: 'main-menu'
		}
	})

	const shop = data.shop;

	const customPrefixes = {BLOG: '', CATALOG: 'products'};

	const headerMenu = data?.headerMenu ? parseMenu(data.headerMenu, customPrefixes):undefined;

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
	    		<Header shop={shop} menu={headerMenu} />
	    		<main id="mainContent">
	    			<Suspense>{children}</Suspense>
	    		</main>
    		</div>
    	</>
    );
}

const SHOP_QUERY = gql`
	fragment menuItems on MenuItem {
	  id
	  resourceId
	  title
	  url
	  type
	}
	query ShopInfo($MenuHandle: String!){
		shop {
			name
			description
		}
	  	headerMenu: menu(handle: $MenuHandle) {
	    	id
	    	items {
		 	  	...menuItems 
		 	  	items {
		           ...menuItems
		        } 
		    }
	  	}
	}
`;