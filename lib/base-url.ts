export default function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  if (process.env.VERCEL_URL) return `https://${process.env.DOMAN_URL}`;

  return "http://localhost:3000";
}
