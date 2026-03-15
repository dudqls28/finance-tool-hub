import React from 'react'
import { FireCalculator } from './fire/FireCalculator'
import { AveragingCalculator } from './averaging/AveragingCalculator'
import { CompoundCalculator } from './compound/CompoundCalculator'
import { DividendCalculator } from './dividend/DividendCalculator'
import { DcaCalculator } from './dca/DcaCalculator'
import { LoanCalculator } from './loan/LoanCalculator'
import { MortgageCalculator } from './mortgage/MortgageCalculator'
import { SalaryCalculator } from './salary/SalaryCalculator'
import { SavingsGoalCalculator } from './savings-goal/SavingsGoalCalculator'
import { InflationCalculator } from './inflation/InflationCalculator'

const components: Record<string, () => React.ReactElement> = {
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
}

interface ToolContentProps {
  toolId: string
}

export function ToolContent({ toolId }: ToolContentProps) {
  const Component = components[toolId]
  if (!Component) return <p className="text-slate-500">준비 중입니다.</p>
  return <Component />
}
