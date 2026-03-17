import React, { lazy, Suspense } from 'react'
import { CalculatorErrorBoundary } from '../components/CalculatorErrorBoundary'
import { CalculatorSkeleton } from '../components/CalculatorSkeleton'
import { useLocale } from '../contexts/LocaleContext'

const FireCalculator = lazy(() => import('./fire/FireCalculator').then((m) => ({ default: m.FireCalculator })))
const AveragingCalculator = lazy(() => import('./averaging/AveragingCalculator').then((m) => ({ default: m.AveragingCalculator })))
const CompoundCalculator = lazy(() => import('./compound/CompoundCalculator').then((m) => ({ default: m.CompoundCalculator })))
const DividendCalculator = lazy(() => import('./dividend/DividendCalculator').then((m) => ({ default: m.DividendCalculator })))
const DcaCalculator = lazy(() => import('./dca/DcaCalculator').then((m) => ({ default: m.DcaCalculator })))
const LoanCalculator = lazy(() => import('./loan/LoanCalculator').then((m) => ({ default: m.LoanCalculator })))
const MortgageCalculator = lazy(() => import('./mortgage/MortgageCalculator').then((m) => ({ default: m.MortgageCalculator })))
const SalaryCalculator = lazy(() => import('./salary/SalaryCalculator').then((m) => ({ default: m.SalaryCalculator })))
const SavingsGoalCalculator = lazy(() => import('./savings-goal/SavingsGoalCalculator').then((m) => ({ default: m.SavingsGoalCalculator })))
const InflationCalculator = lazy(() => import('./inflation/InflationCalculator').then((m) => ({ default: m.InflationCalculator })))
const SeveranceCalculator = lazy(() => import('./severance/SeveranceCalculator').then((m) => ({ default: m.SeveranceCalculator })))
const WeeklyRestCalculator = lazy(() => import('./weekly-rest/WeeklyRestCalculator').then((m) => ({ default: m.WeeklyRestCalculator })))
const AnnualLeaveCalculator = lazy(() => import('./annual-leave/AnnualLeaveCalculator').then((m) => ({ default: m.AnnualLeaveCalculator })))
const PrincipalEqualCalculator = lazy(() => import('./principal-equal/PrincipalEqualCalculator').then((m) => ({ default: m.PrincipalEqualCalculator })))
const JeonseLoanCalculator = lazy(() => import('./jeonse-loan/JeonseLoanCalculator').then((m) => ({ default: m.JeonseLoanCalculator })))
const RoiCalculator = lazy(() => import('./roi/RoiCalculator').then((m) => ({ default: m.RoiCalculator })))
const FixedDepositCalculator = lazy(() => import('./fixed-deposit/FixedDepositCalculator').then((m) => ({ default: m.FixedDepositCalculator })))
const EmergencyFundCalculator = lazy(() => import('./emergency-fund/EmergencyFundCalculator').then((m) => ({ default: m.EmergencyFundCalculator })))
const RealReturnCalculator = lazy(() => import('./real-return/RealReturnCalculator').then((m) => ({ default: m.RealReturnCalculator })))
const CreditCardInterestCalculator = lazy(() => import('./credit-card-interest/CreditCardInterestCalculator').then((m) => ({ default: m.CreditCardInterestCalculator })))

const components: Record<string, React.LazyExoticComponent<() => React.ReactElement>> = {
  fire: FireCalculator,
  averaging: AveragingCalculator,
  compound: CompoundCalculator,
  dividend: DividendCalculator,
  dca: DcaCalculator,
  loan: LoanCalculator,
  mortgage: MortgageCalculator,
  salary: SalaryCalculator,
  'savings-goal': SavingsGoalCalculator,
  inflation: InflationCalculator,
  severance: SeveranceCalculator,
  'weekly-rest': WeeklyRestCalculator,
  'annual-leave': AnnualLeaveCalculator,
  'principal-equal': PrincipalEqualCalculator,
  'jeonse-loan': JeonseLoanCalculator,
  roi: RoiCalculator,
  'fixed-deposit': FixedDepositCalculator,
  'emergency-fund': EmergencyFundCalculator,
  'real-return': RealReturnCalculator,
  'credit-card-interest': CreditCardInterestCalculator,
}

interface ToolContentProps {
  toolId: string
}

export function ToolContent({ toolId }: ToolContentProps) {
  const { locale } = useLocale()
  const Component = components[toolId]
  if (!Component) return <p className="text-slate-500">준비 중입니다.</p>
  return (
    <CalculatorErrorBoundary fallbackLocale={locale}>
      <Suspense fallback={<CalculatorSkeleton />}>
        <Component />
      </Suspense>
    </CalculatorErrorBoundary>
  )
}
