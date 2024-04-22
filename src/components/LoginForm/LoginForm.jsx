import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch(() => {
        console.log("login error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <div className={css.label}>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              autoComplete="email"
              as={TextField}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>
          <div className={css.label}>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              autoComplete="current-password"
              as={TextField}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </div>
          <Button type="submit" variant="outlined" disabled={isSubmitting}>
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
