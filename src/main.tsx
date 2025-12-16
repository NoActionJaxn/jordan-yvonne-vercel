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
import Preloader from './components/ui/Preloader';
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
  fetchSocialLinks,
  fetchActingPage,
  fetchActingPageSEO,
  fetchActors,
  fetchActorCount,
  fetchActorBySlug,
  fetchIllustrationPage,
  fetchIllustrationPageSEO,
  fetchIllustrations,
  fetchIllustrationCount,
  fetchIllustrationBySlug
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
        loader: async () => {
          return {
            rootSeo: await fetchDefaultSEO(),
            page: await fetchActingPage(),
            actors: await fetchActors(),
            totalActors: await fetchActorCount(),
            settings: await fetchSiteSettings(),
          };
        },
      },
      {
        Component: ActingItemPage,
        path: '/acting/:slug',
        loader: async ({ params }) => {
          return {
            rootSeo: await fetchDefaultSEO(),
            actingSeo: await fetchActingPageSEO(),
            page: await fetchActorBySlug(params?.slug ?? ""),
            settings: await fetchSiteSettings(),
          };
        },
      },
      {
        Component: ArtPage,
        path: '/art',
        loader: async () => {
          return {
            rootSeo: await fetchDefaultSEO(),
            page: await fetchIllustrationPage(),
            illustrations: await fetchIllustrations(),
            totalIllustrations: await fetchIllustrationCount(),
            settings: await fetchSiteSettings(),
          };
        },
      },
      {
        Component: ArtItemPage,
        path: '/art/:slug',
        loader: async ({ params }) => {
          return {
            rootSeo: await fetchDefaultSEO(),
            illustrationSeo: await fetchIllustrationPageSEO(),
            page: await fetchIllustrationBySlug(params?.slug ?? ""),
            settings: await fetchSiteSettings(),
          };
        },
      },
    ],
    errorElement: <Error />,
    HydrateFallback: () => <Preloader />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
