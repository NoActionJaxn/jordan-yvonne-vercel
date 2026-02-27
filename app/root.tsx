import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import { LinkButton } from "../src/components/ui/Buttons";
import { Heading, Paragraph } from "../src/components/ui/Typeography";
import "../src/styles/globals.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Grand+Hotel&family=Manrope:wght@200..800&family=Petrona:ital,wght@0,100..900;1,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body className="bg-amber-50">
        {children}
        <ScrollRestoration />
        <Scripts />
        <script
          src="https://kit.fontawesome.com/1aad4926f4.js"
          crossOrigin="anonymous"
          defer
        />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Something went wrong";
  let message = "An unexpected error occurred while loading this page.";
  let code: string | undefined;

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "Page not found" : "Something went wrong";
    message =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.statusText || message;
    code = String(error.status);
  } else if (error instanceof Error) {
    code = error.message;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4">
      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
          <i className="fa-solid fa-triangle-exclamation text-3xl"></i>
        </div>

        {code && (
          <Paragraph className="mb-2 px-2 bg-red-50 text-red-700">
            {code}
          </Paragraph>
        )}

        <Heading level={1} className="mb-2">
          {title}
        </Heading>
        <Paragraph className="mb-4 max-w-md">{message}</Paragraph>
        <Paragraph className="mb-6 max-w-sm text-gray-500">
          Try refreshing, or go back home. If the problem persists you can
          report it.
        </Paragraph>

        <div className="flex gap-3">
          <LinkButton to="/">Go Home</LinkButton>
        </div>
      </div>
    </div>
  );
}
