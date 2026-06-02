const blockedTerms = ["spam", "scam", "fake"];

export function moderateText(body: string) {
  const normalized = body.toLowerCase();
  const hits = blockedTerms.filter((term) => normalized.includes(term));

  return {
    status: hits.length ? "spam" : "pending",
    moderation_json: {
      blockedTerms: hits,
      checkedAt: new Date().toISOString()
    }
  };
}

