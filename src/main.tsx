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
import ActingItemPage from './pages/acting/actingItem';
import ArtItemPage from './pages/art/artItem';
import {
  actorPageLoader,
  costumeItemLoader,
  costumePageLoader,
  defaultLayoutLoader,
  illustratorPageLoader,
  landingPageLoader
} from './lib/loaders';

let router = createBrowserRouter([
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
        loader: async () => {
          return null
        },
      },
      {
        Component: ArtPage,
        path: '/art',
        loader: illustratorPageLoader,
      },
      {
        Component: ArtItemPage,
        path: '/art/:slug',
        loader: async () => {
          return null
        },
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
