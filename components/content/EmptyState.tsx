export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[#cfcac0] bg-stone-100/40 px-6 py-16 text-center">
      <h2 className="text-xl font-bold tracking-tight text-[#151515]">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">{description}</p>
    </div>
  );
}
