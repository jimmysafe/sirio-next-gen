'use client';
import React from 'react';

import type { Page } from '@/payload-types'

import { Media } from '@/components/media'

export const SmallHero: React.FC<Page['hero']> = ({ media, title }) => {
  return (
    <section>
      <div className="contained flex flex-col items-center">
        <div className="w-full text-clip rounded-lg bg-accent/50 2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))]">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="container flex flex-col items-center p-16 text-center lg:mx-auto lg:items-start lg:px-16 lg:py-32 lg:text-left">
              <h1 className="mt-6 mb-1 text-pretty text-4xl font-bold lg:text-6xl">
                {title}
              </h1>
            </div>
            <div className="lg:block marker:select-none p-10">
              {media && typeof media === 'object' && (
                <Media
                  imgClassName="-z-10 object-cover rounded-lg"
                  priority={false}
                  loading="lazy"
                  resource={media}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// <div className="min-h-[35vh] select-none">
//   <div className="absolute inset-0 bg-black/40 z-0" />
//   {media && typeof media === 'object' && (
//     <Media
//       fill
//       imgClassName="-z-10 object-cover"
//       priority={false}
//       loading="lazy"
//       resource={media}
//     />
//   )}
// </div>