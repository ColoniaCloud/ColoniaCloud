import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cc-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: "bg-cc-accent hover:bg-cc-accent-hover text-white shadow-sm",
        secondary: "glass-button",
        outline: "border border-black/20 hover:border-cc-accent text-cc-text-body hover:text-cc-accent bg-transparent",
        outlineWhite: "border border-white/30 hover:border-cc-accent text-white hover:text-cc-accent bg-white/5 backdrop-blur-sm",
        ghost: "hover:bg-cc-surface hover:text-cc-text text-cc-text-body",
        link: "text-cc-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-[14px]",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-8 text-[15px]",
        icon: "h-10 w-10",
      },
      radius: {
        default: "rounded-md", // Equivale a 8px por la variable CSS
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      radius: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    if (variant === "secondary") {
      const radiusClass = radius === "full" ? "rounded-full" : "rounded-md";
      return (
        <div className={cn("glass-button-wrap", radiusClass, size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base")}>
          <Comp
            className={cn(buttonVariants({ variant, size, radius }), className)}
            ref={ref}
            {...props}
          />
          <div className={cn("glass-button-shadow", radiusClass)} aria-hidden="true" />
        </div>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
