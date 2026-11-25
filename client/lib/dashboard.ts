export type RoleSlug = "priepo" | "investor" | "founder";

export interface DashboardSection {
  slug: string;
  title: string;
}

export interface DashboardRole {
  slug: RoleSlug;
  label: string;
  tagline: string;
  sections: DashboardSection[];
}

export const dashboardRoles: DashboardRole[] = [
  {
    slug: "priepo",
    label: "priepo",
    tagline: "Admin console: approvals, policy, treasury, governance and audit.",
    sections: [
      { slug: "approvals", title: "Approve startups and KYC" },
      { slug: "policy", title: "Policy and fees" },
      { slug: "treasury", title: "Treasury lot" },
      { slug: "proxy-votes", title: "Proxy votes" },
      { slug: "board-meetings", title: "Board meetings" },
      { slug: "visibility", title: "Investor visibility" },
      { slug: "fee-revenue", title: "Fee revenue" },
      { slug: "aml-flags", title: "AML flags" },
      { slug: "audit-log", title: "Audit log" },
      { slug: "compliance-mode", title: "Jurisdiction mode" },
    ],
  },
  {
    slug: "investor",
    label: "Investor",
    tagline: "Verify, fund and manage your pre-IPO share holdings.",
    sections: [
      { slug: "sign-up", title: "Account and 2FA" },
      { slug: "kyc", title: "KYC verification" },
      { slug: "bank-account", title: "Link bank account" },
      { slug: "risk-acknowledgement", title: "Risk questionnaire" },
      { slug: "browse-listings", title: "Browse listings" },
      { slug: "buy-shares", title: "Buy shares" },
      { slug: "sell-orders", title: "Sell orders" },
      { slug: "portfolio", title: "Portfolio and lots" },
      { slug: "transactions", title: "Transaction history" },
      { slug: "tax-export", title: "Tax statement export" },
      { slug: "voting", title: "Resolutions and votes" },
      { slug: "notifications", title: "Notifications" },
    ],
  },
  {
    slug: "founder",
    label: "Founder",
    tagline: "Register your startup, list shares and report to investors.",
    sections: [
      { slug: "register", title: "Register startup" },
      { slug: "verification", title: "Company verification" },
      { slug: "create-listing", title: "Create listing" },
      { slug: "landing-page", title: "Landing page" },
      { slug: "quarterly-updates", title: "Quarterly updates" },
      { slug: "vc-investments", title: "VC investments" },
      { slug: "board-meetings", title: "Board meetings" },
      { slug: "investor-consent", title: "Investor confidentiality" },
    ],
  },
];

export function findRole(slug: string | undefined) {
  return dashboardRoles.find((r) => r.slug === slug);
}

export function findSection(role: DashboardRole, slug: string | undefined) {
  return role.sections.find((s) => s.slug === slug);
}
