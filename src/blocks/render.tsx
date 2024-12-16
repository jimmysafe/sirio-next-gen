import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { LatestCoursesBlock } from '@/blocks/latest-courses/component'
import { OurMissionBlock } from './our-mission/component'
import { ForProfessionalsAndStudentsBlock } from './professionals-students/component'
import { TeamBlock } from './team/component'
import { ContactBlock } from './contact/component'

const blockComponents = {
    'latest-courses': LatestCoursesBlock,
    'our-mission': OurMissionBlock,
    'professionals-students': ForProfessionalsAndStudentsBlock,
    'team': TeamBlock,
    'contact': ContactBlock
}

export const RenderBlocks: React.FC<{
    blocks: Page['layout'][0][]
}> = (props) => {
    const { blocks } = props

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType]

                        if (Block) {
                            return (
                                <div key={index}>
                                    {/* @ts-expect-error */}
                                    <Block {...block} />
                                </div>
                            )
                        }
                    }
                    return null
                })}
            </Fragment>
        )
    }

    return null
}
