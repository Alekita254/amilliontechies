export type MemberRole = "MENTEE" | "MENTOR";
export type MemberStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Member {
  id: number;
  role: MemberRole;
  status: MemberStatus;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  about: string;
  expertise: string;
  linkedin: string;
  show_publicly: boolean;
  mentor: number | null;
  mentor_name: string | null;
  admin_note: string;
  created_at: string;
  decided_at: string | null;
}

export const ROLE_LABEL: Record<MemberRole, string> = { MENTEE: "Mentee", MENTOR: "Mentor" };

export const STATUS_LABEL: Record<MemberStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const STATUS_TONE: Record<MemberStatus, "amber" | "green" | "gray"> = {
  PENDING: "amber",
  APPROVED: "green",
  REJECTED: "gray",
};
