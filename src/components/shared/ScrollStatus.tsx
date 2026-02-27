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
      <p className="text-center text-sm text-neutral-400 py-6">
        You've reached the end of the list.
      </p>
    );
  }

  return null;
}
