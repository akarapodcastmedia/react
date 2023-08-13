import { useState } from 'react';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Verify() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    const {data} = await axios.post("https://dev.akarahub.tech/server4/opt/verify",{
        code : password
    });
    try{
        if(data.error == false){   
            navigate("/");
        }else{
            toast.info(`${data.message}`, {
                position: "top-center",
                autoClose: 20000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }catch(e){
        toast.info(`${e.message}`, {
            position: "top-center",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
   
    console.log(password); // Replace with your own logic for handling form submission
  }

  return (
    <div className=''>
        <div className='mb-10 mt-10'>
            <ToastContainer/>
        </div>
         <form onSubmit={handleSubmit} className="  max-w-md mt-40 mx-auto  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Verify sent code</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="**********"
                className="w-full border border-gray-400 p-2 rounded-lg"
                required
                />
            </div>
            <div className="flex  justify-evenly ">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Verify</button>
                <button type="button" onClick={() => {
                    toast.info('🦄 New code is being sent!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Resend</button>
            </div>
            </form>
    </div>
   

     );
}