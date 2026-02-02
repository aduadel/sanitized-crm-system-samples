// login.js
// Sample OAuth2 login flow (front-end part only)

/**
 * Helper to read query parameters from the current URL.
 */
const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

/**
 * Exchanges an authorization code for tokens
 * by calling a backend endpoint.
 *
 * NOTE: This is a sample only. The `/exchange-code` endpoint
 * should be implemented securely on the server side.
 */
const exchangeAuthorizationCode = async (code) => {
  try {
    const response = await fetch(
      `/exchange-code?code=${encodeURIComponent(code)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("Failed to exchange code for tokens");
      return;
    }

    const state = getQueryParam("state");
    const target = state ? decodeURIComponent(state) : "/home";
    window.location.href = target;
  } catch (error) {
    console.error("Error while exchanging code:", error);
  }
};

/**
 * Shows an error message when the session has expired.
 */
const handleSessionMessage = () => {
  const message = getQueryParam("message");
  if (message === "session_expired") {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Session expired. Please log in again.";
    errorMessage.style.display = "block";
  }
};

/**
 * Builds the authorization URL for the OAuth2 provider.
 *
 * NOTE: Replace AUTH_DOMAIN and CLIENT_ID with your real values
 * when integrating with a real identity provider (e.g. Cognito).
 */
const setLoginButtonUrl = (redirectUri) => {
  const loginButton = document.getElementById("login-button");
  const targetPage = getQueryParam("redirect") || "/home";

  const authUrl = new URL(
    "https://YOUR_AUTH_DOMAIN.auth.region.amazoncognito.com/oauth2/authorize"
  );

  authUrl.searchParams.set("client_id", "YOUR_CLIENT_ID");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", encodeURIComponent(targetPage));

  loginButton.href = authUrl.toString();
};

/**
 * Fetches the redirect URI from the backend.
 * This keeps environment-specific data on the server side.
 */
const fetchRedirectUri = async () => {
  const response = await fetch("/get-redirect-uri");
  if (!response.ok) {
    throw new Error("Failed to fetch redirect URI");
  }
  const data = await response.json();
  return data.redirectUri;
};

/**
 * Handles the full login initialization:
 * - gets redirect URI
 * - sets login button href
 * - shows session messages
 * - exchanges auth code if present
 */
const initializeLogin = async () => {
  try {
    const redirectUri = await fetchRedirectUri();
    setLoginButtonUrl(redirectUri);

    handleSessionMessage();

    const code = getQueryParam("code");
    if (code) {
      await exchangeAuthorizationCode(code);
    } else {
      const loginButton = document.getElementById("login-button");
      loginButton.style.visibility = "visible";
    }
  } catch (error) {
    console.error("Error during login initialization:", error);
  }
};

window.addEventListener("load", () => {
  initializeLogin();
});
