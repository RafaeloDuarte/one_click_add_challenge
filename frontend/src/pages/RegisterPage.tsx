import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/SwitchLanguage";
import { toggleLanguage } from "../store/slices/languageSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useAuth } from "../context/AuthProvider";
import { registerUser } from "../services/user";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const language = useAppSelector((state: any) => state.language.language);
  const dispatch = useAppDispatch();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t("register.username_required")),
      email: Yup.string().email(t("register.invalid_email")).required(t("register.email_required")),
      password: Yup.string().min(6, t("register.password_min")).required(t("register.password_required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], t("register.passwords_must_match"))
        .required(t("register.confirm_password_required")),
    }),
    onSubmit: async (values) => {
      try {
        const data = await registerUser({
          username: values.username,
          email: values.email,
          password: values.password
        });
        const { token } = data;

        login(token);

        toast.success(t("register.success_message"), {
          position: "top-right",
          autoClose: 3000,
        });

        navigate("/voting");
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "login.unknown_error";
        toast.error(errorMessage, { autoClose: 3000 });
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
          <h2>{t("register.title")}</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>{t("register.username")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("register.username_placeholder")}
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <Alert variant="danger">{formik.errors.username}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>{t("register.email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("register.email_placeholder")}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <Alert variant="danger">{formik.errors.email}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>{t("register.password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("register.password_placeholder")}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <Alert variant="danger">{formik.errors.password}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>{t("register.confirm_password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("register.confirm_password_placeholder")}
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <Alert variant="danger">{formik.errors.confirmPassword}</Alert>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              {t("register.submit")}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
