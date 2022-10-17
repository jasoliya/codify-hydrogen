import{r as o,T}from"./index.cf70f272.js";import{C as _}from"./2d57a4bb.js";const $=["cdn.shopify.com","cdn.shopifycdn.net","shopify-assets.shopifycdn.com","shopify-assets.shopifycdn.net"],L=["spin.dev"],g=[...$,...L],N=[352,832,1200,1920,2560];function M({src:t,width:r,height:h,crop:n,scale:e}){const u=new URL(t),c=e!=null?e:1;if(r){let i;typeof r=="string"?i=(N[0]*c).toString():i=(Number(r)*c).toString(),u.searchParams.append("width",i)}return h&&typeof h=="number"&&u.searchParams.append("height",(h*c).toString()),n&&u.searchParams.append("crop",n),u.toString()}function R(t){const r=new URL(t.src);return!g.some(n=>r.hostname.endsWith(n))||!t.width&&!t.height&&!t.crop&&!t.scale?t.src:M(t)}function d({data:t,loaderOptions:r,elementProps:h}){var e,u,c,i,S,y;let n=null;return(t==null?void 0:t.width)&&(t==null?void 0:t.height)&&(n=(t==null?void 0:t.width)/(t==null?void 0:t.height)),(r==null?void 0:r.width)||(r==null?void 0:r.height)?{width:(e=r==null?void 0:r.width)!=null?e:n&&typeof r.height=="number"?Math.round(n*r.height):null,height:(u=r==null?void 0:r.height)!=null?u:n&&typeof r.width=="number"?Math.round(n*r.width):null}:(h==null?void 0:h.width)||(h==null?void 0:h.height)?{width:(c=h==null?void 0:h.width)!=null?c:n&&typeof h.height=="number"?Math.round(n*h.height):null,height:(i=h==null?void 0:h.height)!=null?i:n&&typeof h.width=="number"?Math.round(n*h.width):null}:(t==null?void 0:t.width)||(t==null?void 0:t.height)?{width:(S=t==null?void 0:t.width)!=null?S:null,height:(y=t==null?void 0:t.height)!=null?y:null}:{width:null,height:null}}function j(t){if(!t.data&&!t.src)throw new Error("<Image/>: requires either a 'data' or 'src' prop.");return t.data?o.exports.createElement(D,{...t}):o.exports.createElement(U,{...t})}function D({data:t,width:r,height:h,loading:n,loader:e=R,loaderOptions:u,widths:c,...i}){var E,b,x,C,A;if(!t.url)throw new Error("<Image/>: the 'data' prop requires the 'url' property");const{width:S,height:y}=d({data:t,loaderOptions:u,elementProps:{width:r,height:h}});let f=t.url;if(e&&(f=e({...u,src:t.url,width:S,height:y}),typeof f!="string"||!f))throw new Error(`<Image/>: 'loader' did not return a valid string. ${`Image: ${(E=t.id)!=null?E:t.url}`}`);const w=r&&S&&r<S?r:S,v=(b=i.srcSet)!=null?b:W({...u,widths:c,src:t.url,width:w,height:y,loader:e});return o.exports.createElement("img",{id:(x=t.id)!=null?x:"",alt:(A=(C=t.altText)!=null?C:i.alt)!=null?A:"",loading:n!=null?n:"lazy",...i,src:f,width:S!=null?S:void 0,height:y!=null?y:void 0,srcSet:v})}function U({src:t,width:r,height:h,alt:n,loader:e,loaderOptions:u,widths:c,loading:i,...S}){var w,v,E,b;if(!r||!h)throw new Error(`<Image/>: when 'src' is provided, 'width' and 'height' are required and need to be valid values (i.e. greater than zero). Provided values: 'src': ${t}, 'width': ${r}, 'height': ${h}`);if(c&&Array.isArray(c)&&c.some(x=>isNaN(x)))throw new Error("<Image/>: the 'widths' property must be an array of numbers");let y=t;if(e&&(y=e({src:t,width:r,height:h,...u}),typeof y!="string"||!y))throw new Error("<Image/>: 'loader' did not return a valid string");let f=(w=S.srcSet)!=null?w:void 0;if(!f&&e&&c){const x=parseInt(h.toString())/parseInt(r.toString());f=(v=c==null?void 0:c.map(C=>parseInt(C,10)))==null?void 0:v.map(C=>`${e({...u,src:t,width:C,height:Math.floor(C*x)})} ${C}w`).join(", ")}return o.exports.createElement("img",{...S,src:y,width:(E=u==null?void 0:u.width)!=null?E:r,height:(b=u==null?void 0:u.height)!=null?b:h,alt:n!=null?n:"",loading:i!=null?i:"lazy",srcSet:f})}function W({src:t,width:r,crop:h,scale:n,widths:e,loader:u,height:c}){const i=e&&Array.isArray(e);if(i&&e.some(w=>isNaN(w)))throw new Error("<Image/>: the 'widths' must be an array of numbers");let S=1;r&&c&&(S=Number(c)/Number(r));let y=i?e:N;!i&&r&&r<N[N.length-1]&&(y=N.filter(w=>w<=r));const f=u||M;return y.map(w=>`${f({src:t,width:w,height:h?Number(w)*S:void 0,crop:h,scale:n})} ${w}w`).join(", ")}function G(){const t=T.useContext(_);if(!t)throw new Error("Expected a Cart Context, but no Cart Context was found");return t}const H=o.exports.createContext(null);export{H as C,j as I,R as s,G as u};
//# sourceMappingURL=a0211137.js.map