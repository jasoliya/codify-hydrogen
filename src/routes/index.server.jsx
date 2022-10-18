import {Suspense} from 'react';
import {Layout} from '../components/Layout.server';
import {FeaturedCollections} from '../components/FeaturedCollections.server';
import { SlideShow } from '~/components/SlideShow.client';

export default function Home() {
  return (
  	<Layout>
  		<Suspense>

			<SlideShow />
	  		<FeaturedCollections />
			
	  	</Suspense>
    </Layout>
  );
}
