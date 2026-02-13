
import { InvestmentSector, SectorData, FinancialMetric, SectorPerformance, AuditLogEntry } from './types';

export const SECTORS: SectorData[] = [
  {
    id: InvestmentSector.Mining,
    title: 'Strategic Mining',
    description: 'Exporting Lithium, Beryllium, Copper, and Crystal Quartz to global markets.',
    fullDetail: 'We currently export four key minerals and are actively expanding to eight. Our primary export markets include China, India, and the United States. We focus on high-demand elements like Lithium and Beryllium which are critical for global tech supply chains.',
    projectedProfit: 78.0,
    allocation: 30,
    icon: '⛏️',
    marketTrend: 'up',
    color: '#1a9e55',
    financials: {
      revenue: '$145.2M',
      profit: '$42.8M',
      valuation: '$240M (ETB)',
      growth: '+18.4%',
      financingNeed: 'ETB 240 Million'
    }
  },
  {
    id: InvestmentSector.Bitcoin,
    title: 'PHOENIX Bitcoin Mining',
    description: 'Minor hosting services with a roadmap to becoming a primary Bitcoin miner.',
    fullDetail: 'Operating under the PHOENIX brand, we provide minor hosting services with an current capacity of 80MW (52MW active). Our strategic goal is to scale 16x to become a leading regional Bitcoin miner, leveraging low-cost energy partnerships.',
    projectedProfit: 74.0,
    allocation: 20,
    icon: '₿',
    marketTrend: 'up',
    color: '#e67e22',
    financials: {
      revenue: '$12.5M',
      profit: '$8.2M',
      valuation: '$1.8B (ETB)',
      growth: '+74.0%',
      financingNeed: 'ETB 1.8 Billion'
    }
  },
  {
    id: InvestmentSector.Energy,
    title: 'Hydropower Energy',
    description: 'Rehabilitating Hydro Electric Power Stations for long-term PPAs.',
    fullDetail: 'We are a leading hydropower station rehabilitation company. We hold major Power Purchase Agreements (PPAs) with the government, representing our primary revenue stream. Our flagship Fincha Hydro Power Rehab project is a cornerstone of our energy portfolio.',
    projectedProfit: 130.0,
    allocation: 25,
    icon: '⚡',
    marketTrend: 'stable',
    color: '#0ea5e9',
    financials: {
      revenue: '$88.4M',
      profit: '$115.0M',
      valuation: '$480M (ETB)',
      growth: '+130%',
      financingNeed: 'ETB 480 Million'
    }
  },
  {
    id: InvestmentSector.RealEstate,
    title: 'Real Estate Development',
    description: 'Focusing on middle-income housing in Addis Ababa and Dire Dawa.',
    fullDetail: 'Our real estate business operates primarily in two key Ethiopian markets: Addis Ababa and Dire Dawa. We specialize in middle-income housing developments to meet the growing urban demand in these major economic hubs.',
    projectedProfit: 22.5,
    allocation: 15,
    icon: '🏢',
    marketTrend: 'stable',
    color: '#8b5cf6',
    financials: {
      revenue: '$34.8M',
      profit: '$12.2M',
      valuation: '$120M',
      growth: '+12.5%'
    }
  },
  {
    id: InvestmentSector.Consulting,
    title: 'Strategic Consulting',
    description: 'Extensive experience in Mining and Energy sector consultancy.',
    fullDetail: 'We provide expert advisory services for energy and mineral exploration, supporting both public institutions and private sector clients. Our team has extensive experience navigating the regulatory and operational landscape of East African resource management.',
    projectedProfit: 15.0,
    allocation: 10,
    icon: '📊',
    marketTrend: 'up',
    color: '#ec4899',
    financials: {
      revenue: '$8.2M',
      profit: '$4.5M',
      valuation: '$25M',
      growth: '+15.0%'
    }
  }
];

export const FINANCIAL_REPORTS: FinancialMetric[] = [
  { quarter: 'Q1 2024', revenue: 12000000, profit: 4500000, assets: 4500000 },
  { quarter: 'Q2 2024', revenue: 15500000, profit: 6200000, assets: 8200000 },
  { quarter: 'Q3 2024', revenue: 19800000, profit: 8900000, assets: 12400000 },
  { quarter: 'Q4 2024 (Proj)', revenue: 24500000, profit: 12500000, assets: 18500000 },
];

export const HISTORICAL_PERFORMANCE: Record<InvestmentSector, SectorPerformance[]> = {
  [InvestmentSector.Mining]: [
    { month: 'Jan', roi: 4.2, volatility: 1.5 },
    { month: 'Feb', roi: 5.5, volatility: 1.4 },
    { month: 'Mar', roi: 6.8, volatility: 1.6 },
    { month: 'Apr', roi: 8.1, volatility: 1.5 },
    { month: 'May', roi: 9.5, volatility: 1.4 },
    { month: 'Jun', roi: 11.0, volatility: 1.3 },
  ],
  [InvestmentSector.Bitcoin]: [
    { month: 'Jan', roi: 12.5, volatility: 6.2 },
    { month: 'Feb', roi: -4.1, volatility: 8.1 },
    { month: 'Mar', roi: 18.4, volatility: 9.8 },
    { month: 'Apr', roi: 10.6, volatility: 5.5 },
    { month: 'May', roi: -8.2, volatility: 7.8 },
    { month: 'Jun', roi: 22.2, volatility: 10.2 },
  ],
  [InvestmentSector.Energy]: [
    { month: 'Jan', roi: 8.4, volatility: 0.8 },
    { month: 'Feb', roi: 9.1, volatility: 0.9 },
    { month: 'Mar', roi: 10.8, volatility: 1.1 },
    { month: 'Apr', roi: 12.2, volatility: 0.9 },
    { month: 'May', roi: 14.9, volatility: 1.0 },
    { month: 'Jun', roi: 18.1, volatility: 1.2 },
  ],
  [InvestmentSector.RealEstate]: [
    { month: 'Jan', roi: 1.8, volatility: 0.4 },
    { month: 'Feb', roi: 2.1, volatility: 0.3 },
    { month: 'Mar', roi: 2.4, volatility: 0.4 },
    { month: 'Apr', roi: 2.2, volatility: 0.3 },
    { month: 'May', roi: 2.5, volatility: 0.4 },
    { month: 'Jun', roi: 2.8, volatility: 0.3 },
  ],
  [InvestmentSector.Consulting]: [
    { month: 'Jan', roi: 1.2, volatility: 0.2 },
    { month: 'Feb', roi: 1.4, volatility: 0.1 },
    { month: 'Mar', roi: 1.3, volatility: 0.2 },
    { month: 'Apr', roi: 1.5, volatility: 0.1 },
    { month: 'May', roi: 1.6, volatility: 0.2 },
    { month: 'Jun', roi: 1.8, volatility: 0.1 },
  ],
};

export const AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'GR-001', date: '2024-06-15', action: 'FCY Mobilization Audit', sector: InvestmentSector.Mining, status: 'Verified', verifiedBy: 'Federal Bank' },
  { id: 'GR-002', date: '2024-06-10', action: 'Fincha Project ROI Review', sector: InvestmentSector.Energy, status: 'Verified', verifiedBy: 'Ministry of Water' },
  { id: 'GR-003', date: '2024-06-05', action: 'Beryllium Reserve Audit', sector: InvestmentSector.Mining, status: 'Verified', verifiedBy: 'Mining Commission' },
  { id: 'GR-004', date: '2024-05-28', action: 'Hosting Center Capacity Audit', sector: InvestmentSector.Bitcoin, status: 'Verified', verifiedBy: 'Energy Authority' },
  { id: 'GR-005', date: '2024-05-15', action: 'Addis Ababa Housing Progress', sector: InvestmentSector.RealEstate, status: 'Verified', verifiedBy: 'Construction Bureau' },
];
