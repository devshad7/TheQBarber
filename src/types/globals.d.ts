export {};

// Create a type for the roles
export type Roles = "user" | "barber";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
