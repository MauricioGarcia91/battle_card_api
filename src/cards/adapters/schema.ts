import { z } from 'zod';

export const CardSchema = z.object({
  name: z.string(),
  hp: z.number().int(),
  ability: z.string(),
  attack_power: z.number().int(),
  resistance_point: z.number().int(),
  weakness_point: z.number().int(),
  img_url: z.string().url(),
  resistance: z.string().uuid(),
  weakness: z.string().uuid(),
  type: z.string().uuid()
});
