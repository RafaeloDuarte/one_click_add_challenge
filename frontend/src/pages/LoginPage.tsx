import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/SwitchLanguage";
import { toggleLanguage } from "../store/slices/languageSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/user";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const language = useAppSelector((state: any) => state.language.language);
  const dispatch = useAppDispatch();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t("login.username_required")),
      email: Yup.string().email(t("login.invalid_email")).required(t("login.email_required")),
      password: Yup.string().min(6, t("login.password_min")).required(t("login.password_required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], t("login.passwords_must_match"))
        .required(t("login.confirm_password_required")),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginUser({
          email: values.email,
          password: values.password,
          lng: i18n.language
        });
        const { token } = data;

        login(token);

        toast.success(t("login.success_message"), {
          position: "top-right",
          autoClose: 3000,
        });

        navigate("/");
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || t("login.unknown_error");
        alert(t("login.error_message", { errorMessage }));
      }
    }
  });

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
    i18n.changeLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <LanguageSwitcher toggleLanguage={handleToggleLanguage} />
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>{t("login.title")}</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>{t("login.email_label")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("login.email_placeholder")}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <Alert variant="danger">{formik.errors.email}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>{t("login.password_label")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("login.password_placeholder")}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <Alert variant="danger">{formik.errors.password}</Alert>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              {t("login.submit_button")}
            </Button>
            <br />
            <Link to="/register">{t("login.no_account")}</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
