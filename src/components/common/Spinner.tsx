export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="size-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" aria-label="Loading" />
    </div>
  );
};
