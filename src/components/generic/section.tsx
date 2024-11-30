import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export function Section({
  className,
  children,
  containerClassname,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  containerClassname?: string;
}) {
  return (
    <section
      {...props}
      className={cn("w-full bg-background md:py-12 py-6", className)}
    >
      <div className={cn("contained w-full", containerClassname)}>
        {children}
      </div>
    </section>
  );
}
