import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Seo } from '../components/Seo'

export function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo title="이용약관" description="Finance Tool Hub 이용약관 및 면책 고지 안내." />
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-text">이용약관</h1>
        <p className="mt-2 text-slate-600">최종 업데이트: {new Date().toLocaleDateString('ko-KR')}</p>

        <section className="mt-8 space-y-4 text-slate-700">
          <h2 className="text-lg font-semibold text-text">1. 서비스 목적</h2>
          <p>
            본 서비스는 금융 계산 결과를 참고용으로 제공하는 도구입니다. 제공되는 모든 계산 결과는 일반적인 가정에 기반한
            추정값이며, 투자·세무·법률 자문을 대체하지 않습니다.
          </p>

          <h2 className="text-lg font-semibold text-text">2. 책임 제한</h2>
          <p>
            사용자는 본인의 판단과 책임 하에 서비스를 이용합니다. 서비스 이용으로 발생한 손실 또는 손해에 대해 운영자는
            법령이 허용하는 범위 내에서 책임을 지지 않습니다.
          </p>

          <h2 className="text-lg font-semibold text-text">3. 콘텐츠 및 기능 변경</h2>
          <p>
            서비스의 계산식, 문구, 디자인, 기능은 예고 없이 변경되거나 중단될 수 있습니다. 운영자는 서비스 품질 향상을 위해
            지속적으로 내용을 업데이트할 수 있습니다.
          </p>

          <h2 className="text-lg font-semibold text-text">4. 외부 서비스</h2>
          <p>
            본 서비스는 Google Analytics, Google AdSense 등 제3자 서비스를 사용할 수 있으며, 관련 정책은 각 제공자의
            약관과 개인정보처리방침을 따릅니다.
          </p>

          <h2 className="text-lg font-semibold text-text">5. 문의</h2>
          <p>
            서비스 이용 관련 문의는 사이트 내 문의 채널을 통해 접수해 주세요.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
