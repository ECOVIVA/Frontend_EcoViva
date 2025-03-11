export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    sustainability: number;
    badges: string[];
    description: string;
    category: number;
    carbonFootprint: number;
    waterUsage: number;
    wasteProduction: number;
    energy: number;
    locallySourced: boolean;
    lifespan: number;
    recyclable: boolean;
    ingredients?: string[];
    alternativeText?: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    icon: string;
    description: string;
    color: string;
    gradientFrom: string;
    gradientTo: string;
  }
  
  export interface EnvironmentalImpact {
    carbonFootprint: number;
    waterSavings: number;
    wasteReduction: number;
    energySavings: number;
    biodiversityImpact: number;
  }
  
  export interface LessonState {
    cart: number[];
    budget: number;
    remainingBudget: number;
    sustainabilityScore: number;
    isCompleted: boolean;
    score: number;
    environmentalImpact: EnvironmentalImpact;
  }
  
  export interface SustainabilityTip {
    id: number;
    title: string;
    description: string;
    icon: string;
    category: number;
  }
  