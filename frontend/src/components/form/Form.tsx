import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import styles from "./form.module.css";
import { useNotesContext } from "../../contexts/NotesContext";

const Form = () => {
  const {
    setNotes,
    closeModal,
    title,
    setTitle,
    content,
    setContent,
    id,
    setId,
    isFavs,
    buttonText,
  } = useNotesContext();

  const [note, setNote] = useState({
    id: "",
    title: "",
    content: "",
    isFavs: false
  });
  const [isvalidate,setIsValidate] = useState(false);

  const validateFields = ()=>{
  if(title==="" || content===""){

        setIsValidate(true);
        return false;
    }
    return true;
  }
  const onsubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateFields()) return;
    if (id == "" && title!=="" && content!=="") {
      //new note creation
      console.log("id not exists..");
      setNote((prev) => {
        return {
          ...prev,
          id: uuidv4(),
          title: title,
          content: content,
          isFavs: isFavs,
          isReadMore:false,
        };
      });
   if (note.id) { //note.id != ""
         setNotes((prev) => [...prev, note]);
        closeModal();
        setTitle("");
        setContent("");
      }
    } else {
      //edit exiting note
      console.log("id exits");
      setNotes((prev) => {
        return prev.map((note) => {
          if (note.id === id) {
            return { ...note, title: title, content: content };
          }
          return note;
        });
      });
      closeModal();
      setId("");
      setTitle("");
      setContent("");
    }
  };


  return (
    <form onSubmit={onsubmitHandler}>
      <div className={styles.form}>
        <input type="hidden" id="editId" value={id} />
        <input
          type="text"
          placeholder="Enter Title for your new note..."
          id="title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          maxLength={50}

        />
        <textarea
          name=""
          id="content"
          placeholder="Enter description for your new note..."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        ></textarea>
        {isvalidate ?  <span>*Missing required fields. Please check above</span>:"" } 
      </div>

      <div className={styles.btnContainer}>
        <button type="submit" className={styles.btn}>
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default Form;
