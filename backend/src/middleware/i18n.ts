import i18n from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";

i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "pt"],
    detection: {
      order: ["body", "querystring", "header"],
      lookupBody: "lng",  // A chave esperada do payload
      lookupQuerystring: "lng",
      lookupHeader: "accept-language",
      caches: false,
    },
  });

// Exporta o middleware para ser usado no Express
export default middleware.handle(i18n);
