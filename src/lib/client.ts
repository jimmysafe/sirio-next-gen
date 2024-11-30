import { getPayload } from "payload";
import configPromise from '@payload-config'

export const apiClient = () => getPayload({
    config: configPromise,
})