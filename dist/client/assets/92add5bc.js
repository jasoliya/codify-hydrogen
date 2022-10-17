function t(r){return r.nodes?r.nodes:r.edges?r.edges.map(n=>{if(!(n!=null&&n.node))throw new Error("Connection edges must contain nodes");return n.node}):[]}export{t as f};
//# sourceMappingURL=92add5bc.js.map
