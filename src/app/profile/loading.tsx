export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Show a skeleton or a spinner that matches your Profile UI */}
      <div className="animate-pulse bg-slate-200 h-64 w-full max-w-md rounded-xl" />
    </div>
  );
}