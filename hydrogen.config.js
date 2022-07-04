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
    storefrontToken: '4688419cdcf2c79ace46d0738b22d24f',
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
