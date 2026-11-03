import { cn } from "@/lib/cn";

/** One choice among a few, for the switches that change what a section shows (Leitura, Artigos).
 *  A `disabled` option stays visible (and is announced as unavailable) but cannot be chosen. */
export function Segmented<T extends string>({ label, options, value, onChange, describedBy }: {
  label: string; options: { id: T; label: string; disabled?: boolean }[]; value: T; onChange: (id: T) => void; describedBy?: string;
}) {
  return (
    <div role="group" aria-label={label} aria-describedby={describedBy} className="inline-flex w-fit max-w-full gap-0.5 rounded-full bg-ivory p-1 text-sm shadow-[0_2px_4px_rgb(0_0_0/0.06),0_24px_40px_-14px_rgb(57_0_7/0.32)]">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          disabled={o.disabled}
          onClick={() => onChange(o.id)}
          className={cn(
            "rounded-full px-3 py-2 transition-colors duration-200 min-[360px]:px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink pointer-coarse:min-h-11 sm:px-5",
            value === o.id
              ? "bg-graphite font-semibold text-white"
              : o.disabled
                ? "cursor-not-allowed font-medium text-text-3/60 line-through decoration-text-3/40"
                : "font-medium text-text-2 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-cream",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
