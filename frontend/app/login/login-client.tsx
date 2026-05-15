"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeAuthorizationCode, getRedirectUri } from "../../lib/api";

const AUTH_BASE_URL =
  "https://YOUR_AUTH_DOMAIN.auth.region.amazoncognito.com/oauth2/authorize";

export function LoginClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [redirectUri, setRedirectUri] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      try {
        const fetchedRedirectUri = await getRedirectUri();
        if (!isMounted) {
          return;
        }

        setRedirectUri(fetchedRedirectUri);

        if (searchParams.get("message") === "session_expired") {
          setErrorMessage("Session expired. Please log in again.");
        }

        const code = searchParams.get("code");
        const state = searchParams.get("state") ?? undefined;

        if (!code) {
          setIsBusy(false);
          return;
        }

        const result = await exchangeAuthorizationCode(code, state);
        if (!isMounted) {
          return;
        }

        window.location.assign(result.target);
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error ? error.message : "Login initialization failed.",
          );
          setIsBusy(false);
        }
      }
    }

    void initialize();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  const targetPage = searchParams.get("redirect") ?? "/dashboard";
  const authUrl = new URL(AUTH_BASE_URL);
  authUrl.searchParams.set("client_id", "YOUR_CLIENT_ID");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", encodeURIComponent(targetPage));

  return (
    <div className="stack">
      {errorMessage ? <div className="alert">{errorMessage}</div> : null}
      <a
        href={authUrl.toString()}
        className="pill pill-primary"
        aria-disabled={isBusy || !redirectUri}
      >
        {isBusy ? "Preparing login..." : "Continue with provider"}
      </a>
      <p className="muted">
        Replace the placeholder auth domain and client id when you connect a
        real provider such as Cognito.
      </p>
    </div>
  );
}
