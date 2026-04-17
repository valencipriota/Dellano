import { createClient } from '@sanity/client';
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID ?? 'placeholder',
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
