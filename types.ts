
export enum InvestmentSector {
  Mining = 'Mining',
  Bitcoin = 'Bitcoin',
  Energy = 'Energy',
  RealEstate = 'Real Estate',
  Consulting = 'Consulting'
}

export type ViewTab = 'portfolio' | 'sectors' | 'financials' | 'governance' | 'insights';

export interface SectorFinancialSnapshot {
  revenue: string;
  profit: string;
  valuation: string;
  growth: string;
  financingNeed?: string;
}

export interface SectorData {
  id: InvestmentSector;
  title: string;
  description: string;
  fullDetail: string;
  projectedProfit: number; // Percentage
  allocation: number; // Percentage of portfolio
  icon: string;
  marketTrend: 'up' | 'down' | 'stable';
  color: string;
  financials: SectorFinancialSnapshot;
}

export interface FinancialMetric {
  quarter: string;
  revenue: number;
  profit: number;
  assets: number;
}

export interface SectorPerformance {
  month: string;
  roi: number;
  volatility: number;
}

export interface AuditLogEntry {
  id: string;
  date: string;
  action: string;
  sector: InvestmentSector;
  status: 'Verified' | 'Pending' | 'Flagged';
  verifiedBy: string;
}

export interface AIAnalysisResponse {
  executiveSummary: string;
  recommendations: string[];
  riskAssessment: string;
}

export interface GlobalMarketInsights {
  marketOutlook: string;
  topOpportunities: string[];
  macroRisks: string;
}
