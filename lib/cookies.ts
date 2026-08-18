export const setAuthCookie = (token: string) => {
  document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
};

export const removeAuthCookie = () => {
  document.cookie = "accessToken=; path=/; expires=Fri, 16 Aug 2026 12:30:00 UTC;";
};