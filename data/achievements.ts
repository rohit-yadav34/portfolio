export interface Achievement {
  title: string;
  issuer: string;
  kind: "certification" | "milestone";
  /** Public verification / credential URL, if available. */
  verifyUrl?: string;
}

export const achievements: Achievement[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    kind: "certification",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C87DC98256212DD6C5F12B50D43782BD680D64F03F2C6A0766451E7235EF52CF",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI / Stanford",
    kind: "certification",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/QEYFWXEB6CCI",
  },
  {
    title: "Solved 550+ problems across competitive coding platforms",
    issuer: "LeetCode & others",
    kind: "milestone",
  },
];
