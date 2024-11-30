import React, { Fragment, JSX } from 'react'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'
import { cn } from '@/lib/utils'

export type NodeTypes = DefaultNodeTypes

type Props = {
  nodes: NodeTypes[]
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        if (node.type === 'text') {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          } else {
            if (node?.type === 'list' && node?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        const textVariants: Record<(typeof node.type)[number], string> = {
          p: "leading-7",
          h1: "scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl mt-12 mb-12 first:mt-0",
          h2: "scroll-m-20 text-3xl font-bold tracking-tight first:mt-0",
          h3: "scroll-m-20 text-xl font-semibold tracking-tight",
          h4: "scroll-m-20 text-xl font-semibold tracking-tight",
          blockquote: "mt-6 border-l-2 pl-6 italic",
          small: "text-sm font-medium leading-none",
        };

        switch (node.type) {
          case 'linebreak': {
            return <br className="col-start-2" key={index} />
          }
          case 'paragraph': {
            if (node?.children?.length === 0) return <br />
            return (
              <p className={cn(textVariants['p'])
              } key={index} >
                {serializedChildren}
              </p>
            )
          }
          case 'heading': {
            const Tag = node?.tag
            return (
              <Tag className={cn("col-start-2", textVariants[node.tag])} key={index}>
                {serializedChildren}
              </Tag>
            )
          }
          case 'list': {
            const Tag = node?.tag
            return (
              <Tag className="list col-start-2 list-disc ml-4" key={index}>
                {serializedChildren}
              </Tag>
            )
          }
          case 'listitem': {
            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? 'true' : 'false'}
                  className={` ${node.checked ? '' : ''}`}
                  key={index}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              )
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              )
            }
          }
          case 'quote': {
            return (
              <blockquote className="col-start-2" key={index}>
                {serializedChildren}
              </blockquote>
            )
          }

          default:
            return null
        }
      })}
    </Fragment >
  )
}
