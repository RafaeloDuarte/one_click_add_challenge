import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleLanguage } from "../store/slices/languageSlice";
import LanguageSwitcher from "../components/SwitchLanguage";

const VotingPage: React.FC = () => {
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

      <h1>{t("register.title")}</h1>
      <Link to="/login">{t("register.alreadyHaveAccount")}</Link>
    </Container>
  );
};

export default VotingPage;
