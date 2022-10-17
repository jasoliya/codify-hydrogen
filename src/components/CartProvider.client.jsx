import {useCallback} from 'react';
import {CartProvider as ShopifyCartProvider} from '@shopify/hydrogen/client';

import CartUIProvider, {useCartUI} from './CartUIProvider.client';

export default function CartProvider({children}) {
	return(
		<CartUIProvider>
			<Provider>{children}</Provider>
		</CartUIProvider>
	)
}

function Provider({children}) {
	const {openCart} = useCartUI();

	const open = useCallback(() => {
		openCart();
	},[openCart]);

	return(
		<>
			<ShopifyCartProvider
				onLineAdd={open}
				onCreate={open}
			>
			{children}
			</ShopifyCartProvider>
		</>
	)
}