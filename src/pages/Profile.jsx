import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase";
import {updateUserStart, updateUserSuccess, updateUserFalure, deleteUserFalure, deleteUserStart, deleteUserSuccess} from "../redux/user/userSlice.js"
import { useDispatch } from "react-redux";

export default function Profile() {
  const {currentUser, loading, error} = useSelector(state => state.user)
  const fileRef = useRef(null);   // toupload new user image, when click on image allow you to upload
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] =useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch =useDispatch();
  

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file); //show upload precentage
      

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
          console.log('Upload is '+ progress+ '% done');
        },

        (error) => {
          setFileUploadError(true);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => 
              setFormData({...formData, avatar: downloadURL})
          );
        }
      );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault(); //prevent refreshing the page
    try{
      dispatch(updateUserStart());
      const res = await fetch(`backend/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success == false) {
        dispatch(updateUserFalure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUserFalure(error.message));
    }
  };

  const handleDeleteUser = async(e) => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`backend/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success == false) {
        dispatch(deleteUserFalure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    }catch(error){
      dispatch(deleteUserFalure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" /> 
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='Profile' className="rounded-full h-24 w-24 
        object-cover cursor-pointer self-center mt-2"/>   
        <p className="text-sm self-center">
          {fileUploadError ? 
          (<span className="text-red-700">Error Image upload</span> ):
          filePerc > 0 && filePerc < 100 ? (
            <span>{'Uploading{filePerc}% '}</span>)
            :
            filePerc === 100 ?(
            <span className="text-green-600">Upload complete</span>
          ):(
            ''
          )
        }
        </p>
        <input type="text" placeholder="Username" defaultValue={currentUser.username} 
          id="username" className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="email" defaultValue={currentUser.email} 
         id="email" className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="password" 
          id="password" className="border p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-600 text-white rounded-lg uppercase p-3
        hover:opacity-95 disabled:opacity-85">{loading ?  'Loading...' :'Update'} </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-500 mt-4">{error ? error :''}</p>
      <p className="text-green-700 mt-4">{updateSuccess ? 'User is updated Successfully!' :''}</p>
    </div>
  )
}
