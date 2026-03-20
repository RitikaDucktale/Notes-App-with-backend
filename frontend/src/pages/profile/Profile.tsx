import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { postUserProfileReq } from "../../apis/userApi";
import { useNotesContext } from "../../contexts/NotesContext";
import editIcon from "../../assets/pen.png";
import styles from "./Profile.module.css";
const Profile = () => {
  const { closeModal, isProfilePic, setIsProfilePic ,profile,setProfile} = useNotesContext(

  );
  const { loggedInUser } = useAuth();
  const [file,setFile] = useState<File|null>(null);
  const [preview,setPreview] = useState('');

  const firstLetter = loggedInUser?.firstName[0];

useEffect(()=>{
  setPreview(profile);
},[])

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0],e.target.files?.[1]);
    const file = e.target.files?.[0];
    if(file) setFile(file);
    const previewURL = file ? URL.createObjectURL(file) : null;
    if (previewURL) {
      setPreview(previewURL);
      setIsProfilePic(true);
    }
  };

  const postUserProfile = async (formData: FormData) => {
    try {
      const res = await postUserProfileReq(formData);
      console.log("post profil response==>", res);
      setProfile(preview);
      setIsProfilePic(false);
      closeModal();
    } catch (err) {
      console.log(err);
      setProfile("");
    }
  };

  const onSave = () => {
    const formData = new FormData();
    if(file){
        console.log(file)
        formData.append("userProfileImg", file);
        postUserProfile(formData);
    }
  
  };
  const onCancel = () => {
    if(!profile){
      setPreview("");
    }else{
      setPreview(profile);
    }
    setIsProfilePic(false);

  };
  const actionBtns = () => {
    return (
      <>
        <button onClick={onCancel}>Cancel</button>{" "}
        <button onClick={onSave}>Save</button>
      </>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.profileImg}>
        {preview ? (
          <img src={preview} alt="preview" style={{ height: "100%" }} />
        ) : (
          <h1>{firstLetter}</h1>
        )}
      </div>
      <div className={styles.imgInput}>
        <label htmlFor="imgIcon">
          {preview
            ? isProfilePic
              ? actionBtns()
              : "Edit profile"
            : "upload"}
        </label>
        <input type="file" id="imgIcon" onChange={(e) => onchangeHandler(e)} />
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</h1>
        <h2>{loggedInUser?.email}</h2>
      </div>
    </div>
  );
};

export default Profile;
