import { Outlet, useLoaderData } from "react-router";
import '../styles/globals.css';
import Head from "../components/shared/Head";
import type { SiteInfo } from "../types/siteInfo";

interface Loader {
  siteInfo: SiteInfo;
}

export default function DefaultLayout() {
  const {
    siteInfo
  } = useLoaderData<Loader>();

  return (
    <>
      <Head siteTitle={siteInfo.title} seo={siteInfo.seo} favIcon={siteInfo.favicon?.url} />
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl">My Application</h1>
        </header>
        <main className="grow p-4">
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          &copy; 2024 My Application
        </footer>
      </div>
    </>
  )
}
