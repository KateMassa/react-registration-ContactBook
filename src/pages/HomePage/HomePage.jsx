import DocumentTitle from "../../components/DocumentTitle";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div className={css.container}>
        <h1 className={css.title}>ContactsHub</h1>
        <span className={css.subtitle}>Your Ultimate Phonebook Solution</span>
      </div>
    </>
  );
}
