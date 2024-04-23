import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import Button from "@mui/material/Button";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);

  return (
    <div className={css.userMenu}>
      Welcome, {name}
      <Button
        className={css.logoutButton}
        variant="outlined"
        type="button"
        onClick={() => {
          dispatch(logOut());
        }}
      >
        Logout
      </Button>
    </div>
  );
};
