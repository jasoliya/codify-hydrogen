import {Link, Image, Money, AddToCartButton, ProductOptionsProvider, useProductOptions} from '@shopify/hydrogen';


export default function ProductCard({product}) {
	const {priceV2: price, compareAtPriceV2: compareAtPrice} = product.variants?.edges[0].node || {};

	const variant = product.variants?.edges[0].node || {};

	const isSale = compareAtPrice?.amount > price?.amount;

	return (
		<div className=' grid gap-2'>
			<Link to={`/products/${product.handle}`}>
				<div className="grid gap-4">
					<div className="shadow-sm rounded relative">
						{isSale && (
							<label className="absolute top-0 right-0 m-4 text-notice text-xs">Sale</label>
						)}
						<Image className="aspect-square object-cover rounded" data={product.images.edges[0].node} alt={`Image for ${product.title}`} />
					</div>
					<div className="grid gap-1">
						<h3 className="font-bold">{product.title}</h3>
						<div className="flex gap-4">
							<Money data={price} />
							{isSale && (
								<Money className="line-through" data={compareAtPrice} />
							)}
						</div>
					</div>
				</div>
			</Link>
			{variant.availableForSale && (
				<ProductOptionsProvider data={product}>
					<AddToCart variant={variant}/>
				</ProductOptionsProvider>
			)}
			{!variant.availableForSale && (<button className='button border border-gray-300 rounded py-2 px-3 text-sm disabled:opacity-50' disabled>Soldout</button>)}
		</div>
	)
}

function AddToCart({variant}) {
	
	return (
		<>
			<AddToCartButton 
				variantId={variant.id}
				className=' px-3 py-2 border rounded border-gray-300 text-sm'
				>
					Add to cart
			</AddToCartButton>
		</>
	);
}