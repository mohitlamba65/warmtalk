"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitOnboardingStepAction } from "@/app/actions/onboarding";
import type { SignupRole } from "@/modules/auth/types";

const disorderOptions = [
  { value: "ANXIETY_DISORDERS", label: "Anxiety Disorders" },
  { value: "MOOD_DISORDERS", label: "Mood Disorders" },
  { value: "TRAUMA_AND_STRESSOR", label: "Trauma and Stressor" },
  { value: "NEURODEVELOPMENTAL", label: "Neurodevelopmental" },
  { value: "SUBSTANCE_RELATED", label: "Substance Related" },
  { value: "BEHAVIORAL_ADDICTIONS", label: "Behavioral Addictions" },
  { value: "OBSESSIVE_COMPULSIVE", label: "Obsessive Compulsive" },
  { value: "EATING_DISORDERS", label: "Eating Disorders" },
  { value: "PERSONALITY_DISORDERS", label: "Personality Disorders" },
  { value: "DISRUPTIVE_IMPULSE_CONTROL", label: "Disruptive Impulse Control" },
  { value: "SOMATIC_SYMPTOM", label: "Somatic Symptom" },
  { value: "NEUROCOGNITIVE", label: "Neurocognitive" },
  { value: "DISSOCIATIVE_DISORDERS", label: "Dissociative Disorders" },
  { value: "GENDER_DYSPHORIA", label: "Gender Dysphoria" },
  { value: "SLEEP_DISORDERS", label: "Sleep Disorders" },
] as const;

type Props = {
  role: SignupRole;
  step: number;
};

type DisorderOptionValue = (typeof disorderOptions)[number]["value"];
type FieldErrorMap = Record<string, string[]>;

export function RoleOnboardingStepForm({ role, step }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [primaryDisorder, setPrimaryDisorder] = useState<DisorderOptionValue>(disorderOptions[0].value);
  const [severityScore, setSeverityScore] = useState("5");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [yearsExperience, setYearsExperience] = useState("3");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialties, setSpecialties] = useState<DisorderOptionValue[]>([]);
  const [bio, setBio] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrorMap>({});

  const title = useMemo(() => {
    if (role === "client" && step === 1) return "Tell us your primary concern";
    if (role === "client" && step === 2) return "Your personal details";
    if (role === "therapist" && step === 1) return "Professional details";
    return "Therapist profile";
  }, [role, step]);

  const toggleSpecialty = (value: DisorderOptionValue) => {
    setSpecialties((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const getFieldError = (fieldName: string) => fieldErrors[fieldName]?.[0] ?? null;

  const handleSubmit = () => {
    let payload: unknown;

    if (role === "client" && step === 1) {
      payload = {
        primaryDisorder,
        severityScore: Number(severityScore),
      };
    } else if (role === "client" && step === 2) {
      payload = { dateOfBirth };
    } else if (role === "therapist" && step === 1) {
      payload = {
        yearsExperience: Number(yearsExperience),
        licenseNumber,
        specialties,
      };
    } else {
      payload = { bio };
    }

    startTransition(async () => {
      setFieldErrors({});
      const result = await submitOnboardingStepAction({ role, step, payload });

      if (!result.ok) {
        if (result.error.fieldErrors) {
          setFieldErrors(result.error.fieldErrors);
        }
        toast.error(result.error.message);
        return;
      }

      if (result.data.nextPath) {
        router.push(result.data.nextPath);
        return;
      }

      router.push("/dashboard");
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {role === "client" && step === 1 ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary concern</label>
              <select
                value={primaryDisorder}
                onChange={(event) => setPrimaryDisorder(event.target.value as DisorderOptionValue)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {disorderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {getFieldError("primaryDisorder") ? (
                <p className="text-sm text-red-600">{getFieldError("primaryDisorder")}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Severity score (1-10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={severityScore}
                onChange={(event) => setSeverityScore(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
              {getFieldError("severityScore") ? (
                <p className="text-sm text-red-600">{getFieldError("severityScore")}</p>
              ) : null}
            </div>
          </>
        ) : null}

        {role === "client" && step === 2 ? (
          <div className="space-y-2">
            <label className="text-sm font-medium">Date of birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            />
            {getFieldError("dateOfBirth") ? (
              <p className="text-sm text-red-600">{getFieldError("dateOfBirth")}</p>
            ) : null}
          </div>
        ) : null}

        {role === "therapist" && step === 1 ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Years of experience</label>
              <input
                type="number"
                min={0}
                max={80}
                value={yearsExperience}
                onChange={(event) => setYearsExperience(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
              {getFieldError("yearsExperience") ? (
                <p className="text-sm text-red-600">{getFieldError("yearsExperience")}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">License number</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(event) => setLicenseNumber(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="e.g. CA-LCSW-1023"
              />
              {getFieldError("licenseNumber") ? (
                <p className="text-sm text-red-600">{getFieldError("licenseNumber")}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Specialties</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {disorderOptions.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 rounded-md border p-2 text-sm">
                    <input
                      type="checkbox"
                      checked={specialties.includes(option.value)}
                      onChange={() => toggleSpecialty(option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {getFieldError("specialties") ? (
                <p className="text-sm text-red-600">{getFieldError("specialties")}</p>
              ) : null}
            </div>
          </>
        ) : null}

        {role === "therapist" && step === 2 ? (
          <div className="space-y-2">
            <label className="text-sm font-medium">Professional bio</label>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              className="min-h-36 w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Share your approach and experience"
            />
            {getFieldError("bio") ? (
              <p className="text-sm text-red-600">{getFieldError("bio")}</p>
            ) : null}
          </div>
        ) : null}

        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? "Saving..." : "Continue"}
        </Button>
      </CardContent>
    </Card>
  );
}
