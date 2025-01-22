import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/SwitchLanguage";
import { toggleLanguage } from "../store/slices/languageSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state: any) => state.language.language);

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
    i18n.changeLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <Container className="mt-5">
      <LanguageSwitcher toggleLanguage={handleToggleLanguage} />

      <h1>{t("login.title")}</h1>
      <Link to="/register">{t("login.noAccount")}</Link>
    </Container>
  );
};

export default LoginPage;
