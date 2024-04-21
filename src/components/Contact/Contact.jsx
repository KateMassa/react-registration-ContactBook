import css from "./Contact.module.css";
import { useState } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import EditContact from "../EditContact/EditContact";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Contact = ({ name, number, id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
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
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          className={css.editButton}
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Edit
        </Button>
      </div>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this contact?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={() => {
              dispatch(deleteContact(id));
              setIsDeleting(true);
              setOpenDeleteDialog(false);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="edit-contact-dialog-title"
      >
        <DialogTitle id="edit-contact-dialog-title">Edit contact</DialogTitle>
        <DialogContent>
          <EditContact
            contact={{ name, number, id }}
            onClose={() => {
              setIsEditing(false);
              handleCloseEditDialog();
            }}
          />
        </DialogContent>
      </Dialog>
    </li>
  );
};

export default Contact;
