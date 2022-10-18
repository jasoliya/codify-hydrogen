import { 
	defineConfig,
	CookieSessionStorage,
	PerformanceMetricsServerAnalyticsConnector
} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
  	defaultLanguageCode: 'EN',
    defaultCountryCode: 'AU',
    storeDomain: 'georgiemane-dev.myshopify.com',
    storefrontToken: 'ceebd181fea54ae9c5dec117ee96cc5f',
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
