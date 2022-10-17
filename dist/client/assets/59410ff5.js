import{T as e,r as a,C as f,j as l,c as g}from"./index.cf70f272.js";import{Performance as b}from"./20bc200e.js";import{Settings as v}from"./92ea83e8.js";import"./a55c5aec.js";const w=()=>e.createElement("svg",{style:{height:"2.75em",width:"2.75em",padding:"1em"},viewBox:"0 0 460.775 460.775",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{fill:"black",d:`M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z`})),E=()=>e.createElement("svg",{style:{height:"2.5em",width:"2.5em"},width:"131",height:"130",viewBox:"0 0 131 130",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{d:"M64.9548 106.281L27.1377 86.1894L40.0714 79.3723L54.6329 87.1049L66.851 80.6638L52.2895 72.9313L65.2231 66.0979L103.04 86.1894L90.1065 93.0064L76.35 85.6989L64.114 92.1563L77.8884 99.4638L64.9548 106.281Z",fill:"black"}),e.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M65.2247 25L105.178 46.2267L90.105 54.1716L76.3488 46.8642L66.2525 52.1924L80.028 59.5005L64.9532 67.446L25 46.2196L40.0734 38.2748L54.6349 46.0073L64.713 40.6944L50.1533 32.9628L65.2247 25ZM54.4262 32.9673L68.9896 40.7008L54.6315 48.27L40.0699 40.5374L29.276 46.2267L64.9569 65.1833L75.7495 59.4947L61.9761 52.1878L76.3518 44.6012L90.1087 51.9088L100.902 46.2196L65.2221 27.2634L54.4262 32.9673Z",fill:"black"}));function k({children:i,onClose:n,onOpen:o,...t}){const s=t.open;return e.createElement("div",{id:"hydrogen-dev-tools","aria-hidden":!0,style:{position:"fixed",zIndex:100,display:"flex",flexDirection:"column",right:0,bottom:0,padding:"1.5em",maxWidth:"100%",flexWrap:"wrap"}},e.createElement("button",{type:"button",style:{position:"relative",background:"white",border:"1px solid",padding:"0em 0.5em 0.25em 1.25em",boxShadow:"10px 10px 0px black",display:"flex",alignItems:"center",color:"black"},onClick:o},e.createElement("div",{style:{textAlign:"left",flex:1}},e.createElement("span",{style:{fontFamily:"monospace",fontWeight:"bold",paddingRight:"0.5em"}},"Dev tools"))," ",s?e.createElement(w,null):e.createElement(E,null)),e.createElement("div",{style:{display:s?"block":"none",position:"relative",top:"-1px",overflow:"scroll",color:"black",background:"white",border:"1px solid",boxShadow:"10px 10px 0px black",maxWidth:"50em",width:"100vw",height:"50vh"}},i))}function C({settings:i}){const[n,o]=a.exports.useState(0),[t,s]=a.exports.useState([]);a.exports.useEffect(()=>{f.subscribe(f.eventNames.PERFORMANCE,({response_start:c,navigation_start:r,first_contentful_paint:h,largest_contentful_paint:p,response_end:L,page_load_type:x,url:u,transfer_size:y})=>{s([...t,{ttfb:c-r,fcp:h,lcp:p,duration:L-r,type:`${x} load`,size:y,url:u}])})},[s,t]);const d=S({settings:i,performance:{navigations:t}}),m=d.map((c,r)=>l("div",{style:{display:n===r?"block":"none"},children:c.panel},c.content));return g("div",{style:{display:"flex",height:"100%"},children:[l("div",{style:{borderRight:"1px solid",padding:"1em 0em"},children:d.map(({content:c,icon:r,id:h},p)=>g("button",{type:"button",style:{lineHeight:2,padding:"0em 1.25em",fontWeight:n===p?"bold":"normal",display:"flex",alignItems:"center"},onClick:()=>o(p),children:[l("span",{style:{paddingRight:"0.4em"},children:r}),l("span",{style:{fontFamily:"monospace"},children:c})]},h))}),l("div",{style:{padding:"1.25em",width:"100%"},children:m[n||0]})]})}function S({settings:i,performance:n}){const o={settings:{content:"Settings",panel:l(v,{...i}),icon:"\u{1F39B}"},performance:{content:"Performance",panel:l(b,{...n}),icon:"\u23F1"}};return Object.keys(o).map(t=>({...o[t],id:t}))}function O({dataFromServer:i}){const[n,o]=a.exports.useState(!1),t=a.exports.useCallback(()=>{o(m=>!m)},[]),[s,d]=a.exports.useState(!1);return a.exports.useEffect(()=>{d(!0)},[]),s?l(k,{open:n,onClose:t,onOpen:t,children:l(C,{...i})}):null}export{O as DevTools};
//# sourceMappingURL=59410ff5.js.map
