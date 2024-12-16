import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/media'
import { Button } from '@/components/ui/button'
import { ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const HomeHero: React.FC<Page['hero']> = ({ title, subtitle, description, medias }) => {
  return (
    <section>
      <div className="contained flex flex-col items-center">
        <div className="w-full text-clip rounded-lg bg-accent/50 2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))]">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="container flex flex-col items-center p-16 text-center lg:mx-auto lg:items-start lg:px-16 lg:py-32 lg:text-left">
              <h1 className="mt-6 mb-1 text-pretty text-4xl font-bold lg:text-6xl">
                {title}
              </h1>
              <div>
                <h3 className="mb-4">{subtitle}</h3>
                <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                  {description}
                </p>

              </div>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button className="w-full sm:w-auto">
                  Scopri di più <ArrowDownRight className="ml-2 size-4" />
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/courses">I nostri corsi</Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative aspect-[7/8] size-full">
                {medias?.map(({ image }, index) => {
                  if (!image || typeof image !== 'object') return <></>
                  return (
                    <Media
                      key={index}
                      imgClassName={cn(
                        "object-cover absolute flex justify-center rounded-lg border border-border", {
                        "right-[50%] top-[12%] aspect-square w-[24%]": index === 0,
                        "right-[50%] top-[36%] aspect-[5/6] w-2/5": index === 1,
                        "bottom-[36%] left-[54%] aspect-[5/6] w-2/5": index === 2,
                        "bottom-[12%] left-[54%] aspect-square w-[24%]": index === 3,
                      })}
                      priority={false}
                      loading="lazy"
                      resource={image}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
