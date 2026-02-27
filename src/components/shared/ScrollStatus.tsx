import Spinner from "../ui/Spinner";

interface ScrollStatusProps {
  isLoadingMore: boolean;
  hasMore: boolean;
}

export default function ScrollStatus({ isLoadingMore, hasMore }: ScrollStatusProps) {
  if (isLoadingMore) {
    return <Spinner />;
  }

  if (!hasMore) {
    return (
      <div className="flex flex-col items-center gap-2 py-6">
        <Spinner />
        <p className="text-center text-sm text-neutral-400">
          You've reached the end of the list.
        </p>
      </div>
    );
  }

  return null;
}
