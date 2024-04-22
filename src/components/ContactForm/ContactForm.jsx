import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = { name: "", number: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    number: Yup.string()
      .required("Number is required")
      .min(3, "Number must be at least 3 characters")
      .max(50, "Number must be at most 50 characters"),
  });
  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className={css.formContainer}>
          <div className={css.addContactContainer}>
            <label htmlFor="name">Name</label>
            <Field
              className={css.addContactInput}
              variant="outlined"
              name="name"
              as={TextField}
            />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className={css.addContactContainer}>
            <label htmlFor="number">Number</label>
            <Field
              className={css.addContactInput}
              variant="outlined"
              type="text"
              name="number"
              as={TextField}
            />
            <ErrorMessage name="number" component="div" />
          </div>
          <Button
            className={css.formButton}
            variant="outlined"
            type="submit"
            startIcon={<AddIcon />}
          >
            Add Contact
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default ContactForm;
