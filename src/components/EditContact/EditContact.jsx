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

  const handleSubmit = ({ name, number }) => {
    dispatch(editContact({ ...{ name, number }, id: contact.id }));
    onClose();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    number: Yup.string().required("Phone is required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          name: contact.name,
          number: contact.number,
        }}
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
              <label htmlFor="number">Phone:</label>
              <Field
                id="number"
                name="number"
                as={TextField}
                variant="outlined"
              />
              <ErrorMessage name="number" component="div" />
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
