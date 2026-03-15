import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
}

export function Seo({ title, description }: SeoProps) {
  const fullTitle = title === 'Finance Tool Hub' ? title : `${title} | Finance Tool Hub`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
