interface TierThreshold {
  name: string;
  division: string | null;
  minScore: number;
  color: string;
  gradient: readonly [string, string];
}

export const TIER_THRESHOLDS: readonly TierThreshold[] = [
  // Challenger (98~100)
  { name: "Challenger", division: null, minScore: 98, color: "#FF4655", gradient: ["#FF4655", "#FFD700"] },

  // Grandmaster (95~97)
  { name: "Grandmaster", division: null, minScore: 95, color: "#E44D4D", gradient: ["#E44D4D", "#FF6B6B"] },

  // Master (90~94)
  { name: "Master", division: null, minScore: 90, color: "#9B59B6", gradient: ["#9B59B6", "#C39BD3"] },

  // Diamond (80~89)
  { name: "Diamond", division: "I", minScore: 87, color: "#68B8F8", gradient: ["#5B9BF0", "#A78BFA"] },
  { name: "Diamond", division: "II", minScore: 84, color: "#68B8F8", gradient: ["#5B9BF0", "#A78BFA"] },
  { name: "Diamond", division: "III", minScore: 82, color: "#68B8F8", gradient: ["#5B9BF0", "#A78BFA"] },
  { name: "Diamond", division: "IV", minScore: 80, color: "#68B8F8", gradient: ["#5B9BF0", "#A78BFA"] },

  // Emerald (65~79)
  { name: "Emerald", division: "I", minScore: 76, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "II", minScore: 72, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "III", minScore: 68, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "IV", minScore: 65, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },

  // Platinum (50~64)
  { name: "Platinum", division: "I", minScore: 61, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "II", minScore: 57, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "III", minScore: 54, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "IV", minScore: 50, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },

  // Gold (35~49)
  { name: "Gold", division: "I", minScore: 46, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "II", minScore: 42, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "III", minScore: 39, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "IV", minScore: 35, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },

  // Silver (20~34)
  { name: "Silver", division: "I", minScore: 31, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "II", minScore: 27, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "III", minScore: 24, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "IV", minScore: 20, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },

  // Bronze (8~19)
  { name: "Bronze", division: "I", minScore: 17, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "II", minScore: 14, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "III", minScore: 11, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "IV", minScore: 8, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },

  // Iron (0~7)
  { name: "Iron", division: "I", minScore: 6, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "II", minScore: 4, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "III", minScore: 2, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "IV", minScore: 0, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
] as const;