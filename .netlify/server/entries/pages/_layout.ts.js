import { b as loadTranslations } from "../../chunks/translations.js";
const load = async ({ url, data }) => {
  const { pathname } = url;
  const initLocale = data.locale || "de";
  await loadTranslations(initLocale, pathname);
  return {
    ...data
  };
};
export {
  load
};
