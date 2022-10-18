import { 
	defineConfig,
	CookieSessionStorage,
	PerformanceMetricsServerAnalyticsConnector
} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
  	defaultLanguageCode: 'EN',
    defaultCountryCode: 'AU',
    storeDomain: Oxygen.env.PUBLIC_STORE_DOMAIN,
    storefrontToken: Oxygen.env.PUBLIC_STOREFRONT_API_TOKEN,
    privateStorefrontToken: Oxygen.env.PRIVATE_STOREFRONT_API_TOKEN,
    storefrontApiVersion: '2022-07',
    storefrontId: Oxygen.env.PUBLIC_STOREFRONT_ID
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [PerformanceMetricsServerAnalyticsConnector],
});
