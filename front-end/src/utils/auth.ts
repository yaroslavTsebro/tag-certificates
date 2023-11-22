import Cookies from "js-cookie";

export function getAuthToken(): string {
  const token = Cookies.get("refreshToken");
  if (!token) return null;

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}
