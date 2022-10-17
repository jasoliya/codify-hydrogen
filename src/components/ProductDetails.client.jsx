import { useCallback, useState } from 'react';
import { 
	ProductOptionsProvider, 
	MediaFile,
	useProductOptions,
	ProductPrice,
	BuyNowButton,
	AddToCartButton,
	useCart,
	useUrl,
	isBrowser
} from '@shopify/hydrogen';

import {useEffect} from 'react';

export default function ProductDetails({ product }) {	
	const cartAdd = useCart();
	
	return (
		<ProductOptionsProvider data={product}>
			<section className="w-full grid gap-4 px-6 md:px-8 lg:px-12">
				<div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
					<div className="grid md:grid-flow-row md:p-0 md:overflow-x-auto md:grid-cols-2 md:w-full lg:col-span-2">
						<div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw] shadow rounded">
							<ProductGallery media={product.media.edges}/>
						</div>
					</div>
					<div className="sticky md:mx-auto max-x-xl md:mx-w-[24rem] grid gap-8 p-0 md:p-6 md:px-8 top-[6rem] lg:top-[8rem] xl:top-[10rem]">
						<div className="grid gap-2">
							<h1 className="text-4xl font-bold">{product.title}</h1>
							{product.vendor && (<span className="text-copy opacity-50">{product.vendor}</span>)}
						</div>
						<ProductForm product={product} />
						<div className="mt-8">
							<div className="text-prose" dangerouslySetInnerHTML={{__html: product.descriptionHtml}}></div>
						</div>
					</div>
				</div>
			</section>
		</ProductOptionsProvider>
	)
}

function OptionRadio({ name, values }) {
	const { options, selectedOptions, setSelectedOption } = useProductOptions();
	const {pathname, search} = useUrl();
	const [params, setParams] = useState(new URLSearchParams(search));
	const [currentOptions, setCurrentOptions] = useState(selectedOptions);

	const handleChange = useCallback(({name, value}) => {
		setSelectedOption(name,value);

		const selectedOpts = currentOptions;

		if(typeof selectedOpts[name] != 'undefined') selectedOpts[name] = value;
		setCurrentOptions(selectedOpts);

		if(!params) return;

		for(var key in selectedOpts) {
			params.set(
				encodeURIComponent(key.toLowerCase()),
				encodeURIComponent(selectedOpts[key].toLowerCase()),
			);
		}
		if(isBrowser) {
			window.history.replaceState(
				null,
				'',
				`${pathname}?${params.toString()}`
			);
		}
	}, [setCurrentOptions, params, pathname]);

	useEffect(() => {
		options.map(({name, values}) => {
			if(!params) return;
			const currentValue = params.get(name.toLowerCase()) || null;
			if(currentValue) {
				const matchedValue = values.filter((value) => encodeURIComponent(value.toLowerCase()) === currentValue);
				if(matchedValue.length) {
					setSelectedOption(name, matchedValue[0]);
					const selectedOpts = currentOptions;
					if(typeof selectedOpts[name] != 'undefined') selectedOpts[name] = matchedValue[0];
					setCurrentOptions(selectedOpts);
				}
			} else {
				params.set(
					encodeURIComponent(name.toLocaleLowerCase()),
					encodeURIComponent(selectedOptions[name].toLocaleLowerCase())
				);
				window.history.replaceState(
					null,
					'',
					`${pathname}?${params.toString()}`
				)
			}
		});
	},[]);

	return (
		<>
			{values.map((value) => {
				const checked = currentOptions[name] === value;
				const id = `option-${name}-${value}`;

				return (
					<label key={id} htmlFor={id}>
						<input
							className="sr-only"
							type="radio"
							id={id}
							name={`option[${name}]`}
							value={value}
							checked={checked}
							onChange={() => handleChange({name,value})}
						/>
						<div className={`border-b-[2px] py-1 cursor-pointer transition-all-duration-200 ${
										checked ? "border-gray-500" : "border-nuetral-50"
									}`}
									>
									{value}
						</div>
					</label>
				)
			})}
		</>
	)
}

function ProductForm({ product }) {
	const { options, selectedVariant } = useProductOptions();
	const isOutOfStock = !selectedVariant?.availableForSale || false;

	return(
		<form className="grid gap-8">
			<div className="grid gap-4">
				{options.map(({name, values}) => {
					if(values.length === 1) return null;
					return (
						<div
							key={name}
							className="flex flex-wrap items-baseline gap-6">

							<legend className="font-bold">{name}</legend>
							<div className="flex flex-wrap gap-4">
								<OptionRadio name={name} values={values} />
							</div>
						</div>
					);
				})}
			</div>

			<div>
				<ProductPrice 
					className="text-gray-500 line-through text-lg font-semibold inline-block mr-2 mb-2"	
					priceType="compareAt"
					variantId={selectedVariant.id}
					data={product}
				/>

				<ProductPrice 
					className="text-gray-900 text-lg font-semibold inline-block mb-2"	
					variantId={selectedVariant.id}
					data={product}
				/>
			</div>

			<div className="grid items-stratch gap-4">
				<PurchaseMarkup />
			</div>

		</form>
	)
}

function PurchaseMarkup () {
	const { selectedVariant } = useProductOptions();
	const isOutOfStock = !selectedVariant?.availableForSale || false;

	const AddToCartText = isOutOfStock ? "Out Of Stock" : "Add to bag";

	return (
		<>
			<AddToCartButton
				variantId={selectedVariant.id}
				quantity={1}
				accessibleAddingToCartLabel="Adding item to your cart"
				disabled={isOutOfStock}
			>
				<span className="bg-black text-white inline-block rounded-sm text-center py-3 px-6 max-w-xl w-full">
					{AddToCartText}
				</span>
			</AddToCartButton>
			{isOutOfStock ? (
				<span className="text-black text-center py-3 px-6 border rounded-sm leading-none ">
			      Available in 2-3 weeks
			    </span>
			) : (
				<BuyNowButton variantId={selectedVariant.id}>
		          <span className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none border w-full">
		            Buy it now
		          </span>
		        </BuyNowButton>
			)}
		</>
	)
}

function ProductGallery({ media }) {
	if(!media.length) return null;

	return (		
		<div className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row md:p-0 md:overflow-x-auto md:grid-cols-2 w-screen md:w-full lg:col-span-2`}>
			{media.map((mad,i) => {
				let extraProps = {};
				let med = mad.node;
				if(med.mediaContentType == 'MODEL_3D') {
					extraProps = {
						interactionPromptThreshold: "0",
			            ar: true,
			            loading: "eager",
			            disableZoom: true,
					};
				}

				const data = {
					...med, 
					image: {
						...med.image,
						altText: med.alt || 'Product image'
					}
				};

				return(
					<div
						className={`${
							i % 3 == 0 ? "md:col-span-2" : "md:col-span-1"
						} snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
						key={data.id || data.image.id}
					>
						<MediaFile 
							tabIndex="0"
							className={`w-full h-full aspect-square object-cover`}
							data={data}
							options={{
								crop: "center"
							}}
							{...extraProps}
						/>
					</div>
				)
			})}
		</div>
	)
}