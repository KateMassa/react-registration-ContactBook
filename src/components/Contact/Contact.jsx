import css from "./Contact.module.css";
import { useState } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const Contact = ({ name, number, id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <li className={`${css.contactListItem} ${isDeleting ? css.slideOut : ""}`}>
      <div className={css.infoContainer}>
        <div className={css.nameText}>
          <FaUser color="#4d5ae5" /> {name}
        </div>
        <a href={`tel:+${number}`}>
          <FaPhone color="#4d5ae5" /> {number}
        </a>
      </div>
      <div className={css.buttonContainer}>
        <Button
          className={css.deleteButton}
          variant="outlined"
          startIcon={<DeleteIcon />}
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          You really want to delete contact?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              dispatch(deleteContact(id));
              setIsDeleting(true);
              setOpen(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </li>
  );
};

export default Contact;
