import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import type { Note, Notes, ModalType } from "../types/notes";

const NotesContext = createContext<Notes | null>(null);
export const NotesProvider = ({ children }: PropsWithChildren) => {
  const [notes, setNotes] = useState<Note[]>([]);
  console.log(notes);

  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const [isFavs, setIsFavs] = useState(false);
  const [buttonText, setButtonText] = useState("Create");
  
  const openFormPageModal = () => {
    setModalType("formPage");
    setModalData(null);
  };
  const openDeleteModal = (id:string) => {
    setModalType("delete");
    setModalData(id);
  };
  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        title,
        setTitle,
        content,
        setContent,
        id,
        setId,
        isFavs,
        setIsFavs,
        buttonText,
        setButtonText,
        modalType,
        modalData,
        openFormPageModal,
        openDeleteModal,
        closeModal
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used inside NotesProvider");
  }
  return context;
};
