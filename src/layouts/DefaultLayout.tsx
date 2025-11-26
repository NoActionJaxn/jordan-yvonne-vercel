import { Outlet, useLoaderData } from "react-router";
import { Helmet } from "@dr.pogodin/react-helmet";
import { titleBuilder } from "../lib/util/titleBuilder";
import '../styles/globals.css';

export default function DefaultLayout() {
  const {siteInfo, siteSeo} = useLoaderData();

  console.log({ siteInfo, siteSeo })
  return (
    <>
      <Helmet>
        <title></title>
      </Helmet>
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
