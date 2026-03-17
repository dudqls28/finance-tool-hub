import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
}

export function Seo({ title, description }: SeoProps) {
  // 기획서: 툴 페이지는 "{키워드} | {설명 키워드}" 형태로 전달되면 그대로 사용
  const fullTitle = title === 'Finance Tool Hub' || title.includes(' | ')
    ? title
    : `${title} | Finance Tool Hub`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
