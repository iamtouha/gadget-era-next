import type { User } from "../types";

export default async function fetchUser(url: string) {
  const res = await fetch(url, { next: { revalidate: 10 } });
  if (!res.ok) return null;
  return (await res.json()) as User;
}
