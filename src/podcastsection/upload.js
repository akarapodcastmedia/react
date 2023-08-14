import React, { useState ,useEffect } from 'react';
import { Select, Option } from "@material-tailwind/react";
import {Typography} from '@material-tailwind/react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@material-tailwind/react";
import ReactLoading from 'react-loading';
import Swal from "sweetalert2";

//======================= Define form validation ========================
const schema = yup
  .object({
    title: yup.string().max(30).required(),
    description: yup.string().max(50).required(),
    composer : yup.string().max(25).required()
  })
  .required();

  //=======================================================================
function Upload({refresh}) {
  
  // validation 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  //=======================================================================

  const [imageFile,setImageFile] = useState(null);
  const [audioFile,setAudioFile] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [title,setTitle] = useState("");
  const [des,setDes] = useState("");
  const [composer,setComposer] = useState("");
  const [categoryId,setCategoryId] = useState();
  const [uploaded,setUploaded] = useState(false);
  // state store the all category
  const [categories,setCategories] = useState([]);
  const [errorCategory,setErrorCategory] = useState(false);
  const [errorFile1,setErrorFile1] = useState(false);
  const [errorFile2,setErrorFile2] = useState(false);
  const [previewSource, setPreviewSource] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [isCompleted,setCompleted] = useState(false);
  
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  function previewAudio(file) {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const audioDataURL = e.target.result;
      setAudioSrc(audioDataURL);
    };

    reader.readAsDataURL(file);
  }
  function imageFilehandler(e){
    setImageFile(e.target.files[0]);
    previewFile(e.target.files[0]);
  }
  function audioFilehander(e){
      setAudioFile(e.target.files[0]);
      previewAudio(e.target.files[0]);
  }
  let accesstoken=null;
  let tracker=0;
  useEffect(async ()=>{
    if(refresh && tracker==0){
      async function togetrefresh(){
        axios.defaults.withCredentials = true;
        const {data} = await axios.post("https://dev.akarahub.tech/server4/akara/web/access/token",{},{
             headers : {
                 "Authorization" : `bearer ${refresh}`,
                 "content-type"  : "application/json",
             }
        });
        accesstoken = data.accessToken;
        console.log(accesstoken);
        tracker=1;
        // to get the data of cagtegory
        if(accesstoken != null){
          axios.defaults.withCredentials = true;
          const {data} = await axios.get("https://dev.akarahub.tech/server9/web/gateway/category/list/all",{
            headers : {
                "content-type": "application/json",
                "Authorization" : `bearer ${accesstoken}`
            }
          });
          // setting the category to the state
          console.log(data);
          if(data){
            setCategories(data.data);
          }else{
            console.log("No data of category");
        }
      }
      // calll the function
      togetrefresh();  
    }

  },[]);
 
 
  const handleAudioEnded = () => {
    setAudioSrc(null);
  };
  const handleOptionChange=(data)=>{
    setCategoryId(data);
  }
  const onSubmiter = (data) => {
    // check the category and file validation
    if(categoryId == null){
        // set the error checker state to be true
        setErrorCategory(true)
    }else{
      setErrorCategory(false)
    }
    if(imageFile == null){
        setErrorFile1(true);
    }else{
        setErrorFile1(false);
    }
    if(audioFile == null){
        setErrorFile2(true);
    }else{
        setErrorFile2(false);
    }
    if(title && composer && categoryId && des && imageFile && audioFile){
        setShowModal(true);
        // console.log(imageFile);
        // console.log(audioFile);
    }
    
    // const data = new FormData();
    // data.append("title",title);
    // data.append("composer",composer);
    // data.append("description",des);
    // data.append("category",categoryId);
    // data.append("image",state.file1);
    // data.append("audio",state.file2);
    console.log(categoryId);
  };

  return (
    <div className='p-2 max-w-full w-full'>
            {showModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-400 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h4 className="text-3xl font-semibold">
                          Confirm your upload assets
                        </h4>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex flex-row justify-evenly items-center">
                        <div className='flex flex-col justify-center items-start'>
                     
                            <p className='justify-self-start shadow-md p-2 bg-orange-400 rounded m-2'>thumbnail</p>
                            {previewSource && (<img src={previewSource} alt="Preview" width={300} height={150} className='shadow-lg object-cover  rounded m-2' />)}
                            <p className='shadow-md p-2 bg-blue-400 rounded m-2'>Audio sound</p>
                            {audioSrc && (
                              <audio controls onEnded={handleAudioEnded}>
                                <source src={audioSrc} type="audio/mp3" />
                                Your browser does not support the audio element.
                              </audio>
                            )}
                        </div>
                        <div className='flex flex-col shadow-lg rounded justify-start items-start m-1 p-2'>
                            <div className='flex flex-col justify-around items-start'>
                                <div className='m-2'>
                                  <span  className='shadow-md p-2 bg-green-200 rounded'>Title</span>
                                  <p className='m-2'>{title}</p>
                                </div>
                                <div className='m-2'>
                                  <span  className='shadow-md p-2 bg-green-200 rounded'>Description</span>
                                  <p className='m-2'>{des}</p>
                                </div>
                                <div className='m-2'>
                                  <span  className='shadow-md p-2 bg-green-200 rounded'>Composer</span>
                                  <p className='m-2'>{composer}</p>
                                </div>
                                <div className='m-2'>
                                  <span  className='shadow-md p-2 bg-green-200 rounded'>Category</span>
                                  <p className='m-2' >{categoryId}</p>
                                </div>  
                            </div>  
                        </div>
                        
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        
                        <button
                          className="bg-green-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={ async() => {
                            setShowModal(false);
                                
                            const dataServer = new FormData();
                            dataServer.append("title",title);
                            dataServer.append("composer",composer);
                            dataServer.append("description",des);
                            dataServer.append("category",categoryId);
                            dataServer.append("image",imageFile);
                            dataServer.append("audio",audioFile);
                            // prepare uploading the podcast to the server
                            if(!uploaded){
                              console.log("haha");
                              Swal.fire({
                                title: 'Podcast is being uploaded to server ....',
                                html: 'Please wait and be calm.🤗',
                                timer: 3*60000,
                                backdrop: 'static',
                                allowOutsideClick: false,
                                timerProgressBar: true,
                                didOpen: () => {
                                  Swal.showLoading();
            
                                },
                                willClose: () => {
                                }
                              }).then((result) => {
                                /* Read more about handling dismissals below */
                                if (result.dismiss === Swal.DismissReason.timer) {
                                  console.log('I was closed by the timer')
                                }
                              })
                            }
                           
                            axios.defaults.withCredentials = true;
                            const {data} = await axios.post("https://dev.akarahub.tech/server4/akara/web/access/token",{},{
                                headers : {
                                    "Authorization" : `bearer ${refresh}`,
                                    "content-type"  : "application/json",
                                }
                            });
                            if(data){
                                 axios.post("https://dev.akarahub.tech/server9/web/gateway/upload/podcast",dataServer,{
                               
                                      headers : {
                                          'Content-Type': 'multipart/form-data',
                                          "Authorization" : `bearer ${data.accessToken}`
                                        }
                                }).then((result)=>{
                                      console.log(result.data);
                                      if(result){
                                        setUploaded(true);
                                        setCompleted(true);
                                        Swal.fire({  
                                          title: 'Podcast is uploaded successfully',  
                                          type: 'success',  
                                          text: 'done task',  
                                          backdrop: 'static',
                                          allowOutsideClick: false
                                         });
                                      }
                                        
                                }).catch(e =>{
                                      
                                })
                                
                            }    
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}

    <div className='bg-gray-200 flex justify-start w-full p-4 mb-4 max-w-full mt-24 rounded-md shadow-sm text-zinc-600 '>
              <Typography variant="h4" >Upload to System</Typography>
    </div>
    <form onSubmit={handleSubmit(onSubmiter)} className="grid grid-rows-4 grid-cols-2 gap-4 max-w-full w-full mt-8">
      <div className="hover:scale-105 hover:ease-linear hover:duration-100 hover:delay-75  rounded shadow-md p-2 flex flex-col justify-center items-center  mb-4">
        <label htmlFor="file1" className="flex self-start mb-2 font-bold text-gray-700">
          Podcast Title
        </label>
        <p className='text-red-400'>{errors.title?.message}</p>
        <input
          {...register("title")}
          type="title"
          name="title"
          id="title"
          onChange={(e)=> setTitle(e.target.value)}
          className="focus:bg-gray-300 focus:text-green-800 w-80 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="hover:scale-105 hover:ease-linear hover:duration-100 hover:delay-75 rounded shadow-md p-2 flex flex-col justify-center items-center mb-4">
        <label htmlFor="file1" className="flex self-start mb-2 font-bold text-gray-700">
          Podcast Description
        </label>
        <p className='text-red-400'>{errors.description?.message}</p>
        <input
          {...register("description")}
          type="text"
          name="description"
          id="des"
          onChange={(e)=> setDes(e.target.value)}
          className="w-80 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="hover:scale-105 hover:ease-linear hover:duration-100 hover:delay-75 rounded shadow-md p-2 flex flex-col justify-center items-center mb-4">
        <label htmlFor="file1" className="flex self-start mb-2 font-bold text-gray-700">
          Composer
        </label>
        <p className='text-red-400'>{errors.composer?.message}</p>
        <input
          {...register("composer")}
          type="text"
          name="composer"
          id="composer"
          onChange={(e)=> setComposer(e.target.value)}
          className="w-80 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="hover:scale-105 hover:ease-linear hover:duration-100 hover:delay-75 rounded shadow-md p-2 flex justify-center items-center mb-4 ">
        <label htmlFor="file1" className="flex self-start mb-2 font-bold text-gray-700 mr-2">
          Category
        </label>
        <p className='text-red-400'>{ errorCategory? "categories is required" : ""}</p>
        <Select variant="standard" name='category'  onChange={handleOptionChange} >
            {
              categories.length> 0 ? categories.map((value)=> ( <Option value={value._id} >{value.categoryType}</Option>))
               : ""
            }
        </Select>
      </div>
     
      <div className="hover:scale-105 hover:ease-linear hover:duration-100 hover:delay-75 rounded shadow-md p-2 flex flex-col justify-center items-center mb-4">
      <label htmlFor="file1" className="flex self-start mb-2 font-bold text-gray-700">
          thumbnail
      </label>
      <p className='text-red-400'>{ errorFile1 ? "file is required" : "" }</p>
        <input
          type="file"
          name="file1"
          id="file1"
          onChange={imageFilehandler}
          className="w-80 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="hover:scale-105 hover:ease-linear hover:duration-100 hover:delay-75 rounded shadow-md p-2 flex flex-col justify-center items-center mb-4">
        <label htmlFor="file2" className="flex self-start mb-2 font-bold text-gray-700">
          sound
        </label>
        <p className='text-red-400'>{ errorFile2 ? " file is required" : "" }</p>
        <input
          type="file"
          name="file2"
          id="file2"
          onChange={audioFilehander}
          className="w-80 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className=" hover:scale-105 hover:ease-linear hover:duration-100 hover:delay-75 bg-gray-100 rounded flex justify-center items-center mb-4">

        <Button variant="gradient" type='submit' onClick={() =>{
              setUploaded(false);
              setCompleted(false);
              setShowModal(false);
        } } className="flex items-center gap-3 bg-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
                  >
                  <path
                     strokeLinecap="round"
                      strokeLinejoin="round"
                     d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                  </svg>
                    Upload Files
              </Button>
      </div>
      <div className="hover:scale-105 hover:ease-linear hover:duration-100 hover:delay-75 bg-gray-100 rounded flex justify-center items-center mb-4">
      <Button variant="gradient" className="flex items-center gap-3 bg-geen-300"
        onClick={()=>{
            setTitle("");
            setCategoryId("");
            setComposer("");
            setDes("");
            setAudioFile(null);
            setImageFile(null);
        }}
      >
         clearn up
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </Button>
      </div>
    </form>
    </div>
   
  );
}

export default Upload;
