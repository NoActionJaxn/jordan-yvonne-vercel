import { client } from '../client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

const builder = createImageUrlBuilder(client)

export function imageBuilder(source: SanityImageSource) {
  return builder.image(source)
}
