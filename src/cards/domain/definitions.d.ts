export interface SearchCardsParams {
  q?: string;
  limit?: string;
  card_type?: string;
  resistance?: string;
  weakness?: string;
}

export interface BattleParams {
  attacker_id: string;
  defender_id: string;
}

export interface BattleResult {
  attacker_id: string;
  defender_id: string;
  attacker_initial_power: number;
  attacker_power_damage: number;
  defender_hp: number;
  defender_remaining_hp: number;
  win: boolean;
}
