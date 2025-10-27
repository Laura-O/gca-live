const load = async ({ cookies }) => {
  const theme = cookies.get("theme") || "emerald";
  const locale = cookies.get("locale") || "de";
  return {
    theme,
    locale
  };
};
export {
  load
};
