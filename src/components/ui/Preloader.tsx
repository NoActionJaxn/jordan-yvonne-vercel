import { Helmet } from "@dr.pogodin/react-helmet";

function Preloader() {
  return (
    <>
    <Helmet>
      <title>Loading | Jordan Yvonne</title>
    </Helmet>
      <div className="min-h-screen w-full bg-amber-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-16">
          <div
            className="bg-[url('/jordan-yvonne.svg')] bg-contain bg-no-repeat bg-center w-80 h-32"
            role="img"
            aria-label="Jordan Yvonne"
          />
          <div className="flex items-center gap-3" aria-hidden>
            <span className="size-2 border-2 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="size-2 border-2 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="size-2 border-2 rounded-full bg-amber-300  animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;