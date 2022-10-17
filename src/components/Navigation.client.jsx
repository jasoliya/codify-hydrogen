import {
	useRef,
	useState
} from 'react';
import {
	Link,
	useUrl
} from '@shopify/hydrogen';

export function Navigation({ menu }) {

	const [activeMenuId, setActiveMenu] = useState();

	const handleClick = (id,e) => {
		setActiveMenu(() => {
			return (activeMenuId == id) ? null : id;
		});
	}

	return (
		<div className="flex flex-wrap items-center">
		    {(menu?.items || []).map((item) => {

		    	if(Object.keys(item.items).length == 0) {
		    		return(
		    			<Link key={item.id} className="p-2 mx-2" to={item.to} target={item.target}>
			   				{item.title} 
			   			</Link>
			   		)
		    	} else {
		    		return (
		    			<div className="relative mx-2" key={item.id}>
		    				<button className="flex p-2 items-center gap-1" onClick={(e) => handleClick(item.id,e)}><span>{item.title}</span><DownArrow active={activeMenuId === item.id}/></button>
		    				
		    				<div className={`absolute bg-white border-grey-100 text-black p-2 w-40 shadow ${activeMenuId === item.id ? "" : "hidden"}`}>
								{item.items.map((subitem) => {
									return (<Link key={subitem.id} to={subitem.to} target={subitem.target} className="block p-2">{subitem.title}</Link>)
								})}
							</div>
		    			</div>
		    		);
		    	}
		    })}
		</div>
	)
}

function DownArrow({active}) {
	const {pathname} = useUrl();
	const isHome = pathname === '/';
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={`w-[14px] h-[14px] ${isHome ? "fill-white" : "" } ${active ? "rotate-180" : ""}`} viewBox="0 0 384 512"><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg>
	);
}