import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import DefaultLayout from './layouts/DefaultLayout';
import IndexPage from './pages';
import CostumingPage from './pages/costuming';
import ActingPage from './pages/acting';
import ArtPage from './pages/art';
import CostumeItemPage from './pages/costuming/costumeItem';
import ActingItemPage from './pages/acting/actingItem';
import ArtItemPage from './pages/art/artItem';
import { defaultLayoutLoader } from './lib/loaders';
import { STRAPI_URL } from './constants/strapi';

const client = new ApolloClient({
  link: new HttpLink({
    uri: STRAPI_URL + '/graphql',
  }),
  cache: new InMemoryCache(),
});

let router = createBrowserRouter([
  {
    Component: DefaultLayout,
    loader: defaultLayoutLoader,
    children: [
      {
        Component: IndexPage,
        path: '/',
        loader: async () => {
          return null
        },
      },
      {
        Component: CostumingPage,
        path: '/costuming',
        loader: async () => {
          return null
        },
      },
      {
        Component: CostumeItemPage,
        path: '/costuming/:slug',
        loader: async () => {
          return null
        },
      },
      {
        Component: ActingPage,
        path: '/acting',
        loader: async () => {
          return null
        },
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
        loader: async () => {
          return null
        },
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
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </HelmetProvider>
  </StrictMode>,
);
