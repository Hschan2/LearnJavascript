import { INITIAL_IMAGE } from "../../constants";

export function getSafeAvatar(url?: string | null): string {
  if (!url) return INITIAL_IMAGE;
  return url;
}
