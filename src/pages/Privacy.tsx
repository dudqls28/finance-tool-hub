import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Seo } from '../components/Seo'

export function Privacy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo title="개인정보처리방침" description="Finance Tool Hub 개인정보처리방침 및 쿠키 사용 안내." />
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-text">개인정보처리방침</h1>
        <p className="mt-2 text-slate-600">최종 업데이트: {new Date().toLocaleDateString('ko-KR')}</p>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-lg font-semibold text-text">1. 수집하는 정보</h2>
          <p>
            본 서비스는 Google Analytics를 통해 방문 통계(페이지 조회, 대략적 위치 등)를 수집할 수 있습니다.
            Google AdSense를 통해 맞춤 광고를 제공하며, 쿠키가 사용될 수 있습니다.
          </p>

          <h2 className="text-lg font-semibold text-text">2. 쿠키 사용</h2>
          <p>
            서비스 개선과 광고 맞춤화를 위해 쿠키를 사용합니다. 브라우저 설정에서 쿠키를 차단할 수 있으나,
            일부 기능이 제한될 수 있습니다.
          </p>

          <h2 className="text-lg font-semibold text-text">3. 제3자 서비스</h2>
          <p>
            Google Analytics, Google AdSense의 개인정보 처리 방침이 적용됩니다.
            자세한 내용은 각 서비스의 정책을 참고해 주세요.
          </p>

          <h2 className="text-lg font-semibold text-text">4. 문의</h2>
          <p>개인정보 처리에 대한 문의는 사이트 내 안내된 채널로 연락해 주세요.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
