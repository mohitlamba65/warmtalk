import { z } from "zod";
import { normalizeSignupRole } from "@/modules/auth/types";

const disorderTypes = [
  "ANXIETY_DISORDERS",
  "MOOD_DISORDERS",
  "TRAUMA_AND_STRESSOR",
  "NEURODEVELOPMENTAL",
  "SUBSTANCE_RELATED",
  "BEHAVIORAL_ADDICTIONS",
  "OBSESSIVE_COMPULSIVE",
  "EATING_DISORDERS",
  "PERSONALITY_DISORDERS",
  "DISRUPTIVE_IMPULSE_CONTROL",
  "SOMATIC_SYMPTOM",
  "NEUROCOGNITIVE",
  "DISSOCIATIVE_DISORDERS",
  "GENDER_DYSPHORIA",
  "SLEEP_DISORDERS",
] as const;

export const DisorderTypeSchema = z.enum(disorderTypes);
export type DisorderTypeValue = z.infer<typeof DisorderTypeSchema>;

export const SignupIntentSchema = z.object({
  role: z.preprocess((value) => normalizeSignupRole(String(value ?? "")), z.enum(["client", "therapist"])),
  callbackUrl: z.string().optional(),
});

export const ClientStepOneSchema = z.object({
  primaryDisorder: DisorderTypeSchema,
  severityScore: z.coerce.number().int().min(1).max(10),
});

export const ClientStepTwoSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

export const TherapistStepOneSchema = z.object({
  yearsExperience: z.coerce.number().int().min(0).max(80),
  licenseNumber: z.string().min(3),
  specialties: z.array(DisorderTypeSchema).min(1),
});

export const TherapistStepTwoSchema = z.object({
  bio: z.string().min(30).max(1000),
});

export function getSchemaForRoleAndStep(role: "client" | "therapist", step: number) {
  if (role === "client" && step === 1) return ClientStepOneSchema;
  if (role === "client" && step === 2) return ClientStepTwoSchema;
  if (role === "therapist" && step === 1) return TherapistStepOneSchema;
  if (role === "therapist" && step === 2) return TherapistStepTwoSchema;
  return null;
}
