import{T as e}from"./index.cf70f272.js";import{H as i}from"./a55c5aec.js";function u({navigations:n}){const t=n.map(({url:l,ttfb:r,fcp:m,size:s,duration:o,type:c})=>e.createElement("li",{key:l,style:{padding:"0.5em 0",borderBottom:"1px solid"}},e.createElement(a,{label:c,value:l.replace("http://localhost:3000","")}),e.createElement("div",{style:{display:"flex"}},e.createElement(a,{label:"TTFB",value:r}),e.createElement(a,{label:"Duration",value:o}),e.createElement(a,{label:"FCP",value:m}))));return e.createElement(e.Fragment,null,e.createElement(i,null,"Performance"),e.createElement("ul",null,t))}const a=({label:n,value:t,unit:l})=>{if(!t)return null;const r=typeof t=="string"?e.createElement("span",{style:{fontWeight:"bold"}},t):`${Math.round(t)}${l||"ms"}`;return e.createElement("span",{style:{fontFamily:"monospace",padding:"0 2em 0 0",fontSize:"0.75em"}},n&&n.padEnd(10),r)};export{u as Performance};
//# sourceMappingURL=20bc200e.js.map
