// src/constants.ts

// ACCEPTED_IMAGE_TYPES: Array of strings representing accepted MIME types
export const ACCEPTED_IMAGE_TYPES: string[] = ["image/jpeg", "image/png", "image/gif"];

// IRole: Enum representing different roles
export enum IRole {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

// MAX_MB: Number representing maximum megabytes
export const MAX_MB: number = 10;

// MAX_UPLOAD_SIZE: Number representing maximum upload size in bytes
export const MAX_UPLOAD_SIZE: number = MAX_MB * 1024 * 1024; // Convert megabytes to bytes
