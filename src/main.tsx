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
  fetchCostumeBySlug,
  fetchCostumeCount,
  fetchCostumePage,
  fetchCostumePageSEO,
  fetchCostumes,
  fetchDefaultSEO,
  fetchLandingPage,
  fetchMenuItems,
  fetchSiteSettings,
  fetchSocialLinks
} from './lib/requests';

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    loader: async () => {
      return {
        menu: await fetchMenuItems(),
        socials: await fetchSocialLinks(),
        seo: await fetchDefaultSEO(),
        settings: await fetchSiteSettings(),
      }
    },
    children: [
      {
        Component: IndexPage,
        path: '/',
        loader: async () => {
          return {
            rootSeo: await fetchDefaultSEO(),
            page: await fetchLandingPage(),
            settings: await fetchSiteSettings(),
          };
        },
      },
      {
        Component: CostumingPage,
        path: '/costuming',
        loader: async () => {
          return {
            rootSeo: await fetchDefaultSEO(),
            page: await fetchCostumePage(),
            costumes: await fetchCostumes(),
            totalCostumes: await fetchCostumeCount(),
            settings: await fetchSiteSettings(),
          };
        },
      },
      {
        Component: CostumeItemPage,
        path: '/costuming/:slug',
        loader: async ({ params }) => {
          return {
            rootSeo: await fetchDefaultSEO(),
            costumeSeo: await fetchCostumePageSEO(),
            page: await fetchCostumeBySlug(params?.slug ?? ""),
            settings: await fetchSiteSettings(),
          }
        },
      },
      {
        Component: ActingPage,
        path: '/acting',
        loader: () => null,
      },
      {
        Component: ActingItemPage,
        path: '/acting/:slug',
        loader: () => null,
      },
      {
        Component: ArtPage,
        path: '/art',
        loader: () => null,
      },
      {
        Component: ArtItemPage,
        path: '/art/:slug',
        loader: () => null,
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
