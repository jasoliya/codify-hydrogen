import {React} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import { Route, Router, FileRoutes, ShopifyProvider, PerformanceMetrics, PerformanceMetricsDebug, ShopifyAnalytics } from '@shopify/hydrogen';
import {Suspense} from 'react';
import CartProvider from './components/CartProvider.client';

function App({ routes }) {
  return (
    <Suspense>
      <ShopifyProvider>
      	<CartProvider>
	        <Router>
            <FileRoutes/>
            <Route path="*" page={<NotFound />} />
	        </Router>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}
function NotFound() {
  return <h1 className="m-8 text-4xl">404: Not found</h1>;
}

export default renderHydrogen(App);