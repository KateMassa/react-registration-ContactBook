import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import css from "./EditContact.module.css";

const EditContact = ({ contact, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(editContact({ ...values, id: contact.id }));
    onClose();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
  });

  return (
    <div>
      <Formik
        initialValues={{ ...contact }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className={css.editContactContainer}>
            <div className={css.editContactInput}>
              <label htmlFor="name">Name:</label>
              <Field
                className={css.nameInput}
                id="name"
                name="name"
                as={TextField}
                variant="outlined"
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className={css.editContactInput}>
              <label htmlFor="phone">Phone:</label>
              <Field
                id="phone"
                name="phone"
                as={TextField}
                variant="outlined"
              />
              <ErrorMessage name="phone" component="div" />
            </div>
            <div className={css.buttonContainer}>
              <Button
                className={css.saveButton}
                type="submit"
                variant="outlined"
                startIcon={<SaveIcon />}
                disabled={isSubmitting}
              >
                Save
              </Button>
              <Button
                className={css.closeButton}
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditContact;
