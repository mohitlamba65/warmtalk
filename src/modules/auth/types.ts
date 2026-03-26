export const SIGNUP_ROLES = ["client", "therapist"] as const;

export type SignupRole = (typeof SIGNUP_ROLES)[number];
export type PersistedUserRole = "CLIENT" | "THERAPIST" | "ADMIN";

export type AuthActionErrorCode =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "INVALID_INPUT"
  | "INVALID_STEP"
  | "NOT_FOUND"
  | "INTERNAL_ERROR";

export type ActionResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: {
        code: AuthActionErrorCode;
        message: string;
        fieldErrors?: Record<string, string[]>;
      };
    };

export function normalizeSignupRole(value: string | null | undefined): SignupRole {
  return value === "therapist" ? "therapist" : "client";
}

export function parseSignupRole(value: string | null | undefined): SignupRole | null {
  if (value === "client" || value === "therapist") {
    return value;
  }

  return null;
}

export function toPersistedRole(role: SignupRole): PersistedUserRole {
  return role === "therapist" ? "THERAPIST" : "CLIENT";
}

export function toSignupRole(role: string | null | undefined): SignupRole | null {
  if (role === "CLIENT") return "client";
  if (role === "THERAPIST") return "therapist";
  return null;
}
