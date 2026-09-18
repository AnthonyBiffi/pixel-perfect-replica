import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQ } from "@/data/bscent";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-xl leading-snug">{item.q}</span>
              <span
                className={cn(
                  "relative h-4 w-4 shrink-0 transition-transform duration-500",
                  isOpen && "rotate-45",
                )}
              >
                <span className="absolute top-1/2 left-0 h-px w-4 bg-foreground" />
                <span className="absolute top-0 left-1/2 h-4 w-px bg-foreground" />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
