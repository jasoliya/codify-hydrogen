import{T as l,a as I,b as p,r as C,d as f,e as F,f as h,g as S}from"./index.cf70f272.js";import{u as b}from"./ce1402c4.js";import"./920a254b.js";import{f as D}from"./92add5bc.js";import{u as L}from"./d6282b27.js";const R=t=>`
mutation CartLineAdd($cartId: ID!, $lines: [CartLineInput!]!, $numCartLines: Int = 250, $country: CountryCode = ZZ) @inContext(country: $country) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFragment
    }
  }
}

${t}
`,A=t=>`
mutation CartCreate($input: CartInput!, $numCartLines: Int = 250, $country: CountryCode = ZZ) @inContext(country: $country) {
  cartCreate(input: $input) {
    cart {
      ...CartFragment
    }
  }
}

${t}
`,E=t=>`
mutation CartLineRemove($cartId: ID!, $lines: [ID!]!, $numCartLines: Int = 250, $country: CountryCode = ZZ) @inContext(country: $country) {
  cartLinesRemove(cartId: $cartId, lineIds: $lines) {
    cart {
      ...CartFragment
    }
  }
}

${t}
`,N=t=>`
mutation CartLineUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $numCartLines: Int = 250, $country: CountryCode = ZZ) @inContext(country: $country) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFragment
    }
  }
}

${t}
`,P=t=>`
mutation CartNoteUpdate($cartId: ID!, $note: String, $numCartLines: Int = 250, $country: CountryCode = ZZ) @inContext(country: $country) {
  cartNoteUpdate(cartId: $cartId, note: $note) {
    cart {
      ...CartFragment
    }
  }
}

${t}
`,v=t=>`
mutation CartBuyerIdentityUpdate(
  $cartId: ID!
  $buyerIdentity: CartBuyerIdentityInput!
  $numCartLines: Int = 250
  $country: CountryCode = ZZ
) @inContext(country: $country) {
  cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
    cart {
      ...CartFragment
    }
  }
}

${t}
`,H=t=>`
mutation CartAttributesUpdate($attributes: [AttributeInput!]!, $cartId: ID!, $numCartLines: Int = 250, $country: CountryCode = ZZ) @inContext(country: $country) {
  cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
    cart {
      ...CartFragment
    }
  }
}

${t}
`,M=t=>`
mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!], $numCartLines: Int = 250, $country: CountryCode = ZZ) @inContext(country: $country) {
  cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
    cart {
      ...CartFragment
    }
  }
}

${t}
`,V=t=>`
query CartQuery($id: ID!, $numCartLines: Int = 250, $country: CountryCode = ZZ) @inContext(country: $country) {
  cart(id: $id) {
    ...CartFragment
  }
}

${t}
`,U=`
fragment CartFragment on Cart {
  id
  checkoutUrl
  totalQuantity
  buyerIdentity {
    countryCode
    customer {
      id
      email
      firstName
      lastName
      displayName
    }
    email
    phone
  }
  lines(first: $numCartLines) {
    edges {
      node {
        id
        quantity
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          compareAtAmountPerQuantity {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            availableForSale
            compareAtPriceV2 {
              ...MoneyFragment
            }
            priceV2 {
              ...MoneyFragment
            }
            requiresShipping
            title
            image {
              ...ImageFragment
            }
            product {
              handle
              title
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount {
      ...MoneyFragment
    }
    totalAmount {
      ...MoneyFragment
    }
    totalDutyAmount {
      ...MoneyFragment
    }
    totalTaxAmount {
      ...MoneyFragment
    }
  }
  note
  attributes {
    key
    value
  }
  discountCodes {
    code
  }
}

fragment MoneyFragment on MoneyV2 {
  currencyCode
  amount
}
fragment ImageFragment on Image {
  id
  url
  altText
  width
  height
}
`;function g(){const{storeDomain:t,storefrontApiVersion:n,storefrontToken:u,storefrontId:r}=b();return l.useCallback(({query:s,variables:d})=>{const e={"Content-Type":"application/json","X-SDK-Variant":"hydrogen","X-SDK-Version":n,[f]:u};r&&(e[F]=r);const a=L(document.cookie);return a[I]&&a[p]&&(e[h]=a[I],e[S]=a[p]),fetch(`https://${t}/api/${n}/graphql.json`,{method:"POST",headers:e,body:JSON.stringify({query:s.toString(),variables:d})}).then(o=>o.json()).catch(o=>({data:void 0,error:o.toString()}))},[t,n,u,r])}function _(){const[t,n]=C.exports.useState(),[u,r]=C.exports.useState(),[s,d]=C.exports.useState(),e=g(),a=l.useCallback(async o=>{var m,$;const{data:c,errors:y}=await e({query:A(U),variables:{input:o}});if(y&&(d(y),n(void 0),r(void 0)),(m=c==null?void 0:c.cartCreate)!=null&&m.cart){const i=c.cartCreate.cart;n({...i,lines:D(i.lines),note:($=i.note)!=null?$:void 0}),r(i.checkoutUrl)}},[e]);return{cart:t,checkoutUrl:u,error:s,createInstantCheckout:a}}var Y=Object.freeze(Object.defineProperty({__proto__:null,useCartFetch:g,useInstantCheckout:_},Symbol.toStringTag,{value:"Module"}));export{V as C,A as a,R as b,E as c,N as d,P as e,v as f,H as g,M as h,U as i,_ as j,Y as k,g as u};
//# sourceMappingURL=5d366af3.js.map
