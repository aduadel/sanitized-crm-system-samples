import { API_BASE_URL } from "./config";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getRedirectUri(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/redirect-uri`, {
    cache: "no-store",
  });
  const data = await parseJson<{ redirectUri: string }>(response);
  return data.redirectUri;
}

export async function exchangeAuthorizationCode(code: string, state?: string) {
  const search = new URLSearchParams({ code });
  if (state) {
    search.set("state", state);
  }

  const response = await fetch(`${API_BASE_URL}/auth/exchange-code?${search}`, {
    credentials: "include",
  });

  return parseJson<{ target: string }>(response);
}
