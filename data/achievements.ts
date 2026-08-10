export interface AchievementLink {
  label: string;
  href: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  kind: "certification" | "milestone" | "hackathon";
  description: string;
  /** Public verification / credential URL, if available. */
  verifyUrl?: string;
  links?: AchievementLink[];
}

export const achievements: Achievement[] = [
  {
    title: "Flipkart GRiD 8.0 — National Semi-Finalist",
    issuer: "Flipkart",
    kind: "hackathon",
    description: "National Semi-Finalist among 1.65 Lakh+ participating students across India.",
  },
  {
    title: "Goldman Sachs India Hackathon (GSIH) 2026",
    issuer: "Goldman Sachs",
    kind: "hackathon",
    description: "Secured All India Rank (AIR) 159 out of 16,000+ registered participants.",
    verifyUrl: "https://www.hackerrank.com/contests/goldman-sachs-india-hackathon-2026-cs/compare/rohityadav34980",
  },
  {
    title: "3-Star CodeChef (1618) & 550+ DSA Problems",
    issuer: "CodeChef & LeetCode",
    kind: "milestone",
    description: "Achieved 3-Star (Max Rating: 1618) on CodeChef and solved 550+ DSA problems across coding platforms.",
    links: [
      { label: "CodeChef", href: "https://www.codechef.com/users/rohit_yadav34" },
      { label: "LeetCode", href: "https://leetcode.com/u/rohit_yadav34/" },
    ],
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    kind: "certification",
    description: "Official credential verifying expertise in OCI AI Foundations, Machine Learning, and Cloud AI services.",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C87DC98256212DD6C5F12B50D43782BD680D64F03F2C6A0766451E7235EF52CF",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI / Stanford",
    kind: "certification",
    description: "Rigorous ML foundational certification covering supervised learning, linear/logistic regression, and gradient descent.",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/QEYFWXEB6CCI",
  },
];
