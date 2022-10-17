import { useCallback, useEffect, useRef, useState } from "react";
import { flattenConnection } from "@shopify/hydrogen";
import ProductCard from "./ProductCard.client";

export function ProductsGrid({products, url}) {
    const nextButtonRef = useRef(null);
    const [prdcts, setPrdcts] = useState(products?.nodes || {});
    const [hasNextPage, setHasNextPage] = useState(products?.pageInfo?.hasNextPage || false);
    const [cursor, setCursor] = useState(products?.pageInfo?.endCursor || '');
    const [isPending, setIsPending] = useState(false);

    const loadNext = useCallback(async () => {
        const postUrl = new URL(window.location.origin + url);
        postUrl.searchParams.set('cursor',cursor);
        
        setIsPending(true);

        const response = await fetch(`${url}?cursor=${cursor}`,{
            method: 'POST'
        });

        const {data} = await response.json();

        const newProducts = flattenConnection(data?.collection?.products ||  data?.products || []);       

        const {endCursor, hasNextPage} = data?.products?.pageInfo || {endCursor: '', hasNextPage: false};

        setPrdcts([...prdcts,...newProducts]);
        setCursor(endCursor);
        setHasNextPage(hasNextPage);
        setIsPending(false);
    }, [cursor, prdcts]);

    const handleIntersect = useCallback((enteies) => {
        enteies.forEach((entry) => {
            if (entry.isIntersecting) {
                loadNext();
            }
        });
    },[loadNext]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect,{
            rootMargin: '0px'
        });
        const nextButton = nextButtonRef.current;
        if(nextButton) observer.observe(nextButton);

        return() => {
            if(nextButton) observer.unobserve(nextButton);
        };
    });

    return (
        <>
            <section className="px-6 md:px-8 lg:px-12 pb-6 md:pb-8 lg:pb-12">
                <div className="grid grid-flex-row gap-4 gap-y-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {prdcts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </section>
            {hasNextPage && (
                <div className="p-10 md:p-8 lg:p-12 flex items-center justify-center">
                    <button ref={nextButtonRef} className=" border border-gray-200 py-2 px-3 text-sm rounded disabled:opacity-50" disabled={isPending} onClick={loadNext}>{isPending ? "Loading..." : "Load more"}</button>
                </div>
            )}
        </>
    )
}