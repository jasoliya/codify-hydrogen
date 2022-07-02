import {Link, Image, Money} from '@shopify/hydrogen';

export default function ProductCard({product}) {
	const {priceV2: price, compareAtPriceV2: compareAtPrice} = product.variants?.edges[0].node || {};

	const isSale = compareAtPrice?.amount > price?.amount;

	return (
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
	)
}