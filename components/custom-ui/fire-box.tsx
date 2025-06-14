import { cn } from "@/lib/utils";

type FireBorderBoxProps = {
  children: React.ReactNode;
  className?: string;
  svgHeight?: string; // Tailwind height class or CSS value (e.g., "h-24" or "100px")
};

export default function FireBorderBox({
  children,
  className,
  svgHeight = "h-24", // default height
}: FireBorderBoxProps) {
  return (
    <div className="relative max-w-xl mx-auto my-10">
      <svg
        className={cn(
          "absolute top-0 left-0 w-full z-0 pointer-events-none",
          svgHeight
        )}
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C25,50 50,120 75,70 C100,20 125,120 150,60 C175,10 200,120 225,70 C250,20 275,120 300,60 C325,10 350,120 375,70 C400,20 400,100 400,100 L0,100 Z"
          fill="orange"
        />
      </svg>

      <div
        className={cn(
          "relative z-10 bg-white shadow-xl text-black p-6 font-semibold rounded-md border border-orange-500",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}