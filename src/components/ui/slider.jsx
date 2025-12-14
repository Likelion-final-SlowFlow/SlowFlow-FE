// @ts-nocheck
import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none items-center select-none', className)}
    {...props}
  >
    <SliderPrimitive.Track className='bg-disabled relative h-1.5 w-full grow overflow-hidden rounded-full'>
      <SliderPrimitive.Range className='bg-main-green absolute h-full' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='border-main-green focus-visible:ring-ring block h-4.5 w-4.5 rounded-full border bg-white shadow transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50' />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
