import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/utils/utils";
import { useDarkMode } from "../../context/DarkModeContext";

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(({ className, ...props }, ref) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleClick = () => {
    toggleDarkMode(); // Memanggil fungsi toggleDarkMode untuk mengubah mode gelap atau terang
  };

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        darkMode ? "bg-gray-700 data-[state=checked]:bg-primary" : "bg-gray-200 data-[state=checked]:bg-input",
        className
      )}
      {...props}
      ref={ref}
      onClick={handleClick} // Menetapkan fungsi handleClick sebagai event handler untuk onClick
    >
      <SwitchPrimitives.Thumb className={cn("pointer-events-none block h-5 w-5 rounded-full bg-blue-500 shadow-lg ring-0 transition-transform", darkMode ? "data-[state=checked]:translate-x-5" : "data-[state=checked]:translate-x-0")} />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
