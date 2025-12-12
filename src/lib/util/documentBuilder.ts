import { client } from '../client';

/**
 * Sanity file/document asset reference type
 */
export interface SanityFileSource {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

/**
 * Build a URL for a Sanity file asset (PDFs, documents, etc.)
 * Similar to imageBuilder but for non-image files.
 *
 * @param source - Sanity file reference object
 * @returns Object with url() method to get the file URL
 *
 * @example
 * const pdfUrl = documentBuilder(resume).url();
 */
export function documentBuilder(source: SanityFileSource | null | undefined) {
  if (!source?.asset?._ref) {
    return {
      url: () => '',
    };
  }

  const ref = source.asset._ref;
  // File refs look like: file-<id>-<extension>
  // e.g., file-abc123def456-pdf
  const [, id, extension] = ref.split('-');

  if (!id || !extension) {
    console.warn('Invalid file reference:', ref);
    return {
      url: () => '',
    };
  }

  const projectId = client.config().projectId;
  const dataset = client.config().dataset;

  // Sanity CDN URL pattern for files
  const fileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;

  return {
    url: () => fileUrl,
    /**
     * Get URL with download disposition
     */
    download: (filename?: string) => {
      const dl = filename ? `?dl=${encodeURIComponent(filename)}` : '?dl=';
      return fileUrl + dl;
    },
  };
}
