'use client'
import { getClientSideURL } from '@/lib/get-url'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
    const router = useRouter()
    return <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideURL()} />
}