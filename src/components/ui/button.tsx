
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm font-montserrat",
  {
    variants: {
      variant: {
        default: "bg-veloz-black text-veloz-white hover:bg-veloz-yellow hover:text-veloz-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-veloz-yellow bg-veloz-black text-veloz-white hover:bg-veloz-yellow hover:text-veloz-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-veloz-yellow hover:text-veloz-white",
        ghost: "bg-transparent hover:bg-veloz-yellow hover:text-veloz-white",
        link: "text-veloz-yellow underline-offset-4 hover:underline",
        veloz: "bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90 hover:text-veloz-white font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
        "veloz-outline": "border-2 border-veloz-yellow bg-veloz-black text-veloz-white hover:bg-veloz-yellow hover:text-veloz-white font-bold",
        "veloz-dark": "bg-veloz-black text-veloz-yellow border border-veloz-yellow hover:bg-veloz-yellow hover:text-veloz-white font-bold shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
