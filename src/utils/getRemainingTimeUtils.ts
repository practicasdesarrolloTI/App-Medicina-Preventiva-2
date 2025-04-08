export const getRemainingTime = (targetDate: string | Date) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return null;

  const diffMinutes = Math.floor(diffMs / 60000);
  const months = Math.floor(diffMinutes / (30 * 24 * 60));
  const days = Math.floor((diffMinutes % (30 * 24 * 60)) / (24 * 60));
  const hours = Math.floor((diffMinutes % (24 * 60)) / 60);

  const parts = [];
  if (months > 0) parts.push(`${months} mes${months > 1 ? "es" : ""}`);
  if (days > 0) parts.push(`${days} día${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hora${hours > 1 ? "s" : ""}`);

  return parts.join(", ");
};
