import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/SwitchLanguage";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../hooks";
import { toggleLanguage } from "../store/slices/languageSlice";
import "react-toastify/dist/ReactToastify.css";
import { withAuthVoting } from "../hoc/withAuthVoting";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/user";

interface LoginFormValues {
  email: string;
  password: string;
  lng: string
}

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = useAppSelector((state: any) => state.language.language);
  const dispatch = useAppDispatch();
  const { login } = useAuth();

  const initialValues: LoginFormValues = { email: "", password: "", lng: i18n.language };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("login.invalid_email"))
      .required(t("login.email_required")),
    password: Yup.string()
      .min(6, t("login.password_min"))
      .required(t("login.password_required")),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, resetForm }: FormikHelpers<LoginFormValues>
  ) => {
    setSubmitting(true);
    try {
      const { token } = await loginUser(values);

      login(token);
      toast.success(t("login.success_message"), { autoClose: 3000 });

      navigate("/");

      resetForm();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || "login.unknown_error";
      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
    i18n.changeLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <LanguageSwitcher toggleLanguage={handleToggleLanguage} />
      <h2>{t("login.title")}</h2>
      <h2>Mudança para testar CI</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>{t("login.email")}</Form.Label>
              <Field
                name="email"
                type="email"
                as={Form.Control}
                placeholder={t("login.email_placeholder")}
              />
              <ErrorMessage
                name="email"
                component={Form.Text}
                className="text-danger"
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>{t("login.password")}</Form.Label>
              <Field
                name="password"
                type="password"
                as={Form.Control}
                placeholder={t("login.password_placeholder")}
              />
              <ErrorMessage
                name="password"
                component={Form.Text}
                className="text-danger"
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? t("login.submitting_button") : t("login.submit_button")}
            </Button>
            <br />
            <Link to="/register">{t("login.no_account")}</Link>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default withAuthVoting(LoginPage);
