
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResponse, GlobalMarketInsights } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getPortfolioInsights = async (selectedSectors: string[]): Promise<AIAnalysisResponse> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze a portfolio with the following sectors: ${selectedSectors.join(', ')}. 
    Provide a professional investor's executive summary, 3 specific recommendations, and a brief risk assessment. 
    Focus on synergy between these specific sectors (Engineering, Bitcoin, Mining, Real Estate, Consulting).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { type: Type.STRING },
          recommendations: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          riskAssessment: { type: Type.STRING }
        },
        required: ["executiveSummary", "recommendations", "riskAssessment"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      executiveSummary: "Portfolio maintains a robust posture across primary industrial and digital growth vectors.",
      recommendations: ["Maintain current allocations", "Monitor Bitcoin volatility", "Leverage engineering synergies"],
      riskAssessment: "Moderate risk due to digital asset exposure, offset by tangible real estate and engineering backing."
    };
  }
};

export const getGlobalMarketOutlook = async (): Promise<GlobalMarketInsights> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as a senior macro strategist at a top-tier hedge fund. Provide a 2024 global market outlook focusing on the intersection of infrastructure, Bitcoin treasury management, and rare-earth mining.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          marketOutlook: { type: Type.STRING },
          topOpportunities: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          macroRisks: { type: Type.STRING }
        },
        required: ["marketOutlook", "topOpportunities", "macroRisks"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return {
      marketOutlook: "The global economy is entering a phase of structural transition driven by digital scarcity and tangible infrastructure demand.",
      topOpportunities: ["Green energy grid integration", "Institutional BTC adoption", "Latin American mining expansion"],
      macroRisks: "Geopolitical tensions impacting supply chains and regulatory shifts in digital asset frameworks."
    };
  }
};
