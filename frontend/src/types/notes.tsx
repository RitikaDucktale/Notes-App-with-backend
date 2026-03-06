
export interface Note{
    id:string;
    title:string;
    content:string;
    isFavs:Boolean;
}

export type ModalType = 'formPage' | 'delete' | null;

export interface Notes{
    notes:Note[];
    setNotes:React.Dispatch<React.SetStateAction<Note[]>>;
    modalType:ModalType;
    modalData:any;
    openFormPageModal:()=> void;
    openDeleteModal:(id:string)=>void;
    closeModal: ()=> void;
    isFavs:boolean;
    setIsFavs:React.Dispatch<React.SetStateAction<boolean>>;
    title:string;
    setTitle:React.Dispatch<React.SetStateAction<string>>;
    content:string;
    setContent:React.Dispatch<React.SetStateAction<string>>;
    id:string;
    setId:React.Dispatch<React.SetStateAction<string>>;
    buttonText:string;
    setButtonText:React.Dispatch<React.SetStateAction<string>>;


}