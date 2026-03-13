import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import {toast} from "react-toastify";

import styles from "./form.module.css";
import { useNotesContext } from "../../contexts/NotesContext";
import { createNotesReq, editNotesReq } from "../../apis/notesApi";
import type { Note } from "../../types/notes";

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
  console.log("iddd...",id)
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
  
  async function createNotes(note:Note) {
        try{
          const res = await createNotesReq(note);
          console.log("resposne==>",res);
          if(res.status===200){
            toast.success("New note created successfully!")
            setNotes(prev=> [...prev,res?.data]);
          }
        }catch(err:any){
          console.log("Error creating notes..",err)
          toast.error(err.response.data.message)
        }
  }
  async function editNotes(formData:Note){
        try{
          const res = await editNotesReq(id,formData);
          console.log('req sent..')
          console.log(res);
          if(res.status===200){
            toast.success("Note Updated successfully")
            setNotes(prev=>{
              return prev.map(note=>{
                if(note._id=== res.data._id){
                  return {...res.data}
                }
                return note;
              })
            })
          }
        }catch(err:any){
          console.log(err);
          toast.error(err.res.data.message)
        }

      }


  const onsubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateFields()) return;
    if (id==='' && title && content) {
      //new note creation
      console.log("id not exists..");
      const newNote = {
          id: uuidv4(),
          title: title,
          content: content,
          isFavs: isFavs
        };

       setNote(newNote);

        createNotes(newNote); //api function call
  
        closeModal();
        setTitle("");
        setContent("");
  
    } else {
      //edit exiting note
      console.log("idddd..",id)
          const formData = {
          id: id,
          title: title,
          content: content,
          isFavs: isFavs
        };

      console.log("id exits");
      editNotes(formData);
  
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
