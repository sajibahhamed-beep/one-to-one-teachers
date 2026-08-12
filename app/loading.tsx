export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#00A896]/20 border-t-[#00A896] rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-500 font-mono">লোড হচ্ছে... (Loading)</span>
      </div>
    </div>
  );
}
