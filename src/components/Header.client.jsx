import {useUrl, Link, useCart} from '@shopify/hydrogen';
import {Drawer} from './Drawer.client';
import {CartDetails} from './CartDetails.client';
import {Navigation} from './Navigation.client';
import {useCartUI} from './CartUIProvider.client';

export default function Header({ shop, menu }) {
	const { pathname } = useUrl();
	const { isCartOpen, openCart, closeCart } = useCartUI();

	const isHome = pathname === '/';

	return (
		<>
		<Drawer open={isCartOpen} onClose={closeCart}>
			<div className="grid">
				<CartDetails onClose={closeCart}/>
			</div>
		</Drawer>
		<header className={`flex items-center gap-4 h-16 p-6 sticky backdrop-blur-lg z-40 top-0 justify-between w-full ${
						isHome ? "bg-black/80 text-white" : "bg-white/80"
					}`}
				>
	    		<div className="flex gap-12 w-1/6">
	    			<Link className="font-bold text-2xl" to='/' >
	    				{shop.name}
	    			</Link>
	    		</div>

	    		<div className="w-4/6">
	    			<Navigation menu={menu} />
	    		</div>

	    		<div className="flex justify-end w-1/6">
					<Link to={'/account/'} className="flex items-center justify-center w-8 h-8 mr-4">
						<IconAccount dark={isHome}/>
					</Link>

		    		<button 
		    			onClick={openCart}
		    			className="relative flex items-center justify-center w-8 h-8"
		    		>
		    			<IconBag />
		    			<CartBadge dark={isHome}/>
		    		</button>
	    		</div>
	    	</header>
	    </>
	)
}


function IconBag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </svg>
  );
}

function CartBadge({ dark }) {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark ? "text-black bg-white" : "text-white bg-black"
      } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}

function IconAccount({ dark }) {
	return(
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-4 h-4 ${ dark ? "fill-white" : "fill-black"}`}><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>
	)
}