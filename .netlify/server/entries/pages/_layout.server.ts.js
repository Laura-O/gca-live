import { T as THEME_CONFIG, L as LOCALE_CONFIG } from "../../chunks/config.js";
const load = async ({ cookies }) => {
  const theme = cookies.get("theme") || THEME_CONFIG.defaultTheme;
  const locale = cookies.get("locale") || LOCALE_CONFIG.defaultLocale;
  return {
    theme,
    locale
  };
};
export {
  load
};
