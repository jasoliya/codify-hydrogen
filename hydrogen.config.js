import { 
	defineConfig,
	CookieSessionStorage,
	PerformanceMetricsServerAnalyticsConnector
} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
  	defaultLanguageCode: 'EN',
    defaultCountryCode: 'AU',
    storeDomain: 'sample-store-1331.myshopify.com',
    storefrontToken: '5d6b9cd59b284d0b271ea5c726a54dc3',
    storefrontApiVersion: '2022-07',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [PerformanceMetricsServerAnalyticsConnector],
});
