'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  isSpaceMode?: boolean;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, isSpaceMode, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center group',
        className
      )}
      {...props}>
      <SliderPrimitive.Track
        className={cn(
          'relative h-1.5 w-full grow overflow-hidden rounded-full',
          isSpaceMode ? 'bg-white/10' : 'bg-black/10'
        )}>
        <SliderPrimitive.Range
          className={cn(
            'absolute h-full',
            isSpaceMode
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
              : 'bg-[#B68D97]'
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block h-4 w-4 rounded-full border-2 shadow-sm ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-hover:scale-110 active:scale-95',
          isSpaceMode
            ? 'border-white/50 bg-gradient-to-r from-indigo-400 to-purple-400'
            : 'border-black/20 bg-[#B68D97]'
        )}
      />
    </SliderPrimitive.Root>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
