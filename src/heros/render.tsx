import React from 'react'

import type { Page } from '@/payload-types'

import { HomeHero } from '@/heros/home'
import { SmallHero } from '@/heros/small'

const heroes = {
  home: HomeHero,
  small: SmallHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
