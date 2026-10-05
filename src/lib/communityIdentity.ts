const GUEST_ID_KEY = "wheelybits:community-guest-id";
const DISPLAY_NAME_KEY = "wheelybits:community-display-name";

export function getCommunityGuestId() {
  try {
    let id = window.localStorage.getItem(GUEST_ID_KEY);
    if (!id) {
      id = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      window.localStorage.setItem(GUEST_ID_KEY, id);
    }
    return id;
  } catch {
    return `guest-${Date.now()}`;
  }
}

export function getCommunityDisplayName(userId: string) {
  try {
    return window.localStorage.getItem(`${DISPLAY_NAME_KEY}:${userId}`) || "";
  } catch {
    return "";
  }
}

export function saveCommunityDisplayName(userId: string, name: string) {
  try {
    window.localStorage.setItem(`${DISPLAY_NAME_KEY}:${userId}`, name);
  } catch {
    // The name still applies to the current session if storage is unavailable.
  }
}
