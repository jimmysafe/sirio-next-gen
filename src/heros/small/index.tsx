'use client';
import React from 'react';

import type { Page } from '@/payload-types'

import { Media } from '@/components/media'

export const SmallHero: React.FC<Page['hero']> = ({ media, title }) => {
  return (
    <div className="relative flex items-center justify-center text-white">
      <div className="container z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          <h1 className="mt-6 mb-1 text-pretty text-4xl font-bold lg:text-6xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="min-h-[35vh] select-none">
        <div className="absolute inset-0 bg-black/40 z-0" />
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            priority={false}
            loading="lazy"
            resource={media}
          />
        )}
      </div>
    </div>
  )
}
