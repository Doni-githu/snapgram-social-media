"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import * as Label2 from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof Label2.Root>,
  React.ComponentPropsWithoutRef<typeof Label2.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <Label2.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = Label2.Root.displayName

export { Label }
