export async function fetchWithAuth(path: string, opts?: RequestInit) {
  // all calls go to our own server, which will attach the auth token to backend
  const r = await fetch(path, {
    ...opts,
    credentials: "include", // ensures cookies are sent to BFF
    headers: {
      ...(opts?.headers || {}),
      "Content-Type": "application/json",
    },
  });
  return r;
}
