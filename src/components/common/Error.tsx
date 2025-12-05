import { useRouteError } from "react-router";
import { LinkButton } from "./Buttons";
import { Helmet } from "@dr.pogodin/react-helmet";
import { Heading, Paragraph } from "./Typeography";

export interface ErrorPageProps {
  title?: string;
  message?: string;
  helpText?: string;
  homeHref?: string;
  reportHref?: string;
  reportLabel?: string;
}

export default function Error({
  title = "Something went wrong",
  message = "An unexpected error occurred while loading this page.",
  helpText = "Try refreshing, or go back home. If the problem persists you can report it.",
  homeHref = "/",
  reportHref,
  reportLabel = "Report issue",
}: ErrorPageProps) {
  const error = useRouteError() as { data?: string } | null;
  const code = error?.data ? String(error.data) : undefined;

  return (
    <>
      <Helmet>
        <title>Error - Something went wrong</title>
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4">
        <div className="container mx-auto flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
            <i className="fa-solid fa-triangle-exclamation text-3xl"></i>
          </div>

          {code && (
            <Paragraph className="mb-2 px-2 bg-red-50 text-red-700">
              {code}
            </Paragraph>
          )}
          <Heading className="text-amber-950">{title}</Heading>
          <Paragraph className="mt-2 text-base text-amber-700">{message}</Paragraph>
          <Paragraph className="mt-5 text-sm text-amber-950">{helpText}</Paragraph>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <LinkButton to={homeHref}>
              Go home
            </LinkButton>
            {reportHref && (
              <LinkButton to={reportHref}>
                {reportLabel}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}