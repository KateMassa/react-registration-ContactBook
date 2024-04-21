import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditContact = ({ contact, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(editContact(values));
    onClose();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
  });

  return (
    <div>
      <h2>Edit Contact</h2>
      <Formik
        initialValues={{ ...contact }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditContact;
