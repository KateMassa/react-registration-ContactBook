import css from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={css.contactListItem}>
      <div className={css.infoContainer}>
        <div className={css.contactInfo}>
          <FaUser className={css.icon} /> {name}
        </div>
        <div className={css.contactInfo}>
          <FaPhone className={css.icon} />
          {number}
        </div>
      </div>
      <button className={css.deleteButton} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
