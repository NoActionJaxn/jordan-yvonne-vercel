import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import DefaultLayout from './layouts/DefaultLayout';
import IndexPage from './pages';
import CostumingPage from './pages/costuming';
import ActingPage from './pages/acting';
import ArtPage from './pages/art';
import CostumeItemPage from './pages/costuming/slug';
import ActingItemPage from './pages/acting/slug';
import ArtItemPage from './pages/art/slug';
import Error from './components/ui/Error';
import {
  actorPageLoader,
  costumeItemLoader,
  costumePageLoader,
  defaultLayoutLoader,
  illustratorPageLoader,
  illustrationItemLoader,
  landingPageLoader,
  actorItemLoader
} from './lib/loaders';

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    loader: defaultLayoutLoader,
    children: [
      {
        Component: IndexPage,
        path: '/',
        loader: landingPageLoader,
      },
      {
        Component: CostumingPage,
        path: '/costuming',
        loader: costumePageLoader,
      },
      {
        Component: CostumeItemPage,
        path: '/costuming/:slug',
        loader: costumeItemLoader,
      },
      {
        Component: ActingPage,
        path: '/acting',
        loader: actorPageLoader,
      },
      {
        Component: ActingItemPage,
        path: '/acting/:slug',
        loader: actorItemLoader,
      },
      {
        Component: ArtPage,
        path: '/art',
        loader: illustratorPageLoader,
      },
      {
        Component: ArtItemPage,
        path: '/art/:slug',
        loader: illustrationItemLoader,
      },
    ],
    errorElement: <Error />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
