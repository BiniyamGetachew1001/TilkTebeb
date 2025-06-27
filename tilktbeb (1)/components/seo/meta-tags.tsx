import Head from "next/head"

interface MetaTagsProps {
  title: string
  description: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'book'
  twitterCard?: 'summary' | 'summary_large_image'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  schema?: object
}

export function MetaTags({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  author,
  publishedTime,
  modifiedTime,
  tags,
  schema
}: MetaTagsProps) {
  const fullTitle = title.includes('Astewai') ? title : `${title} | Astewai`
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://astewai.com'
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined
  const imageUrl = ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : `${siteUrl}/og-default.png`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Astewai" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@astewai" />
      
      {/* Article specific tags */}
      {ogType === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="en" />
      
      {/* Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  )
}

// Specific meta tag components for different page types
export function BlogPostMeta({
  title,
  description,
  author,
  publishedDate,
  slug,
  tags,
  readTime,
  coverImage
}: {
  title: string
  description: string
  author: string
  publishedDate: string
  slug: string
  tags?: string[]
  readTime: number
  coverImage?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "publisher": {
      "@type": "Organization",
      "name": "Astewai",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astewai.com'}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astewai.com'}/blog/${slug}`
    },
    "image": coverImage ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astewai.com'}${coverImage}` : undefined,
    "keywords": tags?.join(', '),
    "timeRequired": `PT${readTime}M`
  }

  return (
    <MetaTags
      title={title}
      description={description}
      canonical={`/blog/${slug}`}
      ogType="article"
      ogImage={coverImage}
      author={author}
      publishedTime={publishedDate}
      tags={tags}
      schema={schema}
    />
  )
}

export function BookMeta({
  title,
  author,
  description,
  category,
  rating,
  price,
  coverImage,
  id,
  isFree
}: {
  title: string
  author: string
  description: string
  category: string
  rating: number
  price?: number
  coverImage: string
  id: string
  isFree?: boolean
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": title,
    "author": {
      "@type": "Person",
      "name": author
    },
    "description": description,
    "genre": category,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "ratingCount": 100 // This would come from actual data
    },
    "offers": {
      "@type": "Offer",
      "price": isFree ? "0" : price?.toString() || "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astewai.com'}${coverImage}`,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astewai.com'}/books/${id}`
  }

  const metaTitle = `${title} by ${author} - ${isFree ? 'Free' : 'Premium'} Digital Book`
  const metaDescription = `${description.substring(0, 150)}... Read "${title}" by ${author} on Astewai. ${isFree ? 'Available for free!' : `Available for $${price}`}`

  return (
    <MetaTags
      title={metaTitle}
      description={metaDescription}
      canonical={`/books/${id}`}
      ogType="book"
      ogImage={coverImage}
      schema={schema}
    />
  )
}

export function FreeBooksMeta() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Books - Astewai",
    "description": "Discover our collection of free books, including public domain classics, author samples, and exclusive content.",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astewai.com'}/free-books`,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Free Books Collection"
    }
  }

  return (
    <MetaTags
      title="Free Books - Discover Public Domain Classics & Author Samples"
      description="Explore our extensive collection of free books including public domain classics, author samples, and exclusive content from the Astewai community. Start reading today!"
      canonical="/free-books"
      schema={schema}
    />
  )
}
