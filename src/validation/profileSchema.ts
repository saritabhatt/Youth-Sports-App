import { z } from 'zod';

/**
 * Zod validation schema for child profile
 * Ensures all profile data is valid before submission
 */
export const ChildProfileSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  age: z
    .number()
    .int('Age must be a whole number')
    .min(4, 'Age must be at least 4 years old')
    .max(18, 'Age must be 18 or younger'),
  gender: z
    .enum(['male', 'female', 'other', 'prefer-not-to-say'])
    .default('male'),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Enter a valid 5-digit ZIP code'),
  state: z
    .string()
    .length(2, 'State must be 2-letter abbreviation'),
  athleticism: z
    .number()
    .int()
    .min(1, 'Please rate athleticism')
    .max(10, 'Rating must be between 1-10'),
  competitiveness: z
    .number()
    .int()
    .min(1, 'Please rate competitiveness')
    .max(10, 'Rating must be between 1-10'),
  endurance: z
    .number()
    .int()
    .min(1, 'Please rate endurance')
    .max(10, 'Rating must be between 1-10'),
  teamOriented: z
    .number()
    .int()
    .min(1, 'Please select team preference')
    .max(10, 'Rating must be between 1-10'),
  riskTolerance: z
    .number()
    .int()
    .min(1, 'Please rate risk tolerance')
    .max(10, 'Rating must be between 1-10'),
  currentHeightInches: z
    .number()
    .positive('Height must be positive')
    .min(30, 'Height seems too low')
    .max(84, 'Height seems too high'),
  estimatedAdultHeightInches: z
    .number()
    .positive()
    .min(48, 'Estimated height seems too low')
    .max(84, 'Estimated height seems too high')
    .optional(),
  fatherHeightInches: z
    .number()
    .positive()
    .min(48, 'Height seems too low')
    .max(84, 'Height seems too high')
    .optional(),
  motherHeightInches: z
    .number()
    .positive()
    .min(48, 'Height seems too low')
    .max(84, 'Height seems too high')
    .optional(),
  ethnicity: z.string().optional(),
});

export type ChildProfile = z.infer<typeof ChildProfileSchema>;

/**
 * Scoring weights validation schema
 * Ensures weights are normalized and valid
 */
export const ScoringWeightsSchema = z.object({
  athleticism: z.number().min(0).max(100),
  competitiveness: z.number().min(0).max(100),
  endurance: z.number().min(0).max(100),
  teamOriented: z.number().min(0).max(100),
  riskTolerance: z.number().min(0).max(100),
  heightAdvantage: z.number().min(0).max(100),
}).refine(
  (data) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    return total > 0; // At least one weight must be non-zero
  },
  { message: 'At least one weight must be selected' }
);

export type ScoringWeights = z.infer<typeof ScoringWeightsSchema>;
