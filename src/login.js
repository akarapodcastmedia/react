import { useState } from "react";
import SpinnerColors from "./spinner"
import ProfileMenu from "./navbar"
import SimpleFooter from "./footer"
import { Radio, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import './app.css';
import axios from "axios";
function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-full w-full scale-105"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  // login and signUp component
  export default function SignInSignUp(){

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [username, setUsername] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [selectedOption, setSelectedOption] = useState("podcaster");
    const [signUpclicked,setSignUpclicked] = useState(false);
    const [secret,setSecretChange] = useState(false);
    const [isError,setError] = useState(false);
    const [data,setData] = useState();
    const handleSecretChange = (event) =>{
      setSecretChange(event.target.value);
    }
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    const handleUsernameChange = (event) =>{
      setUsername(event.target.value);
    }
    const handleConfirmChange = (event) => {
      setConfirm(event.target.value);
    }
    const handleFormSubmit = async (event) => {
      event.preventDefault();
     
      // Handle form submission here
      // console.log("Email:", email);
      // console.log("Password:", password);
      // console.log("Is Signup:", isSignup);
      // console.log("username:",username);
      // console.log("role : ",selectedOption);
      // console.log("confirm pass : ",confirm);
      //check if the button is being clicked is not a signUp 
     /// if(!isSignup){
        //request the data to the back 
       // https://dev.akarahub.tech/server4/web/signIn
        //axios.defaults.withCredentials = true
      //  try{
      //     axios.defaults.withCredentials=true;
      //     const {data}= await axios.post("http://localhost:2000/login",{
      //     email: email,
      //     password: password,
      //     },{headers: {'Content-Type': 'application/json'}});
         
      //     console.log(data);
        // if(data.error == false){
        //     setSignUpclicked(false);
        //     setData(data);
        //     navigate("/board");
        //   }else{
        //     setData(data);
        //     setError(true);
        //     setSignUpclicked(false);
        //   }
        // }catch(e){
        //   alert(e.message);
        //   setSignUpclicked(false);
        // }
        
        // console.log(data);
      //}else{
        //https://dev.akarahub.tech/server4/web/signUp
        // const {data}= await axios.post("http://127.0.0.1:2000/web/signUp",{
        //   username:username,
        //   email: email,
        //   password: password,
        //   confirm: confirm,
        //   role:"podcaster"
        // });
        // setData(data);
        // if the message 
    //     try{
    //       if(data.error == false){
    //         navigate("/verify");
    //         setSignUpclicked(false);
    //       }else{
    //         setError(true);
    //         setSignUpclicked(false);
    //       }
    //     }catch(e){
    //         alert(e.message)
    //         setSignUpclicked(false);
    //     }
        
    //  }
         if(!isSignup){
          console.log("logger");
        //request the data to the back 
       //  || http://localhost:5000/web/signIn
          axios.defaults.withCredentials=true;
          const {data}= await axios.post("https://dev.akarahub.tech/server4/web/signIn",{
              email: email,
              password: password,
              role : "podcaster"
          },{headers: {'Content-Type': 'application/json'}});
          console.log(data);
          if(data.error == false){
                setSignUpclicked(false);
                setData(data);
                navigate("/board");
              }else{
                setData(data);
                setError(true);
                setSignUpclicked(false);
              }
        }else{
            axios.defaults.withCredentials=true;
            const {data}= await axios.post("https://dev.akarahub.tech/server4/web/signUp",{
                username:username,
                email: email,
                password: password,
                confirm: confirm,
                role:"podcaster"
            },{headers: {'Content-Type': 'application/json'}});
        }
     };
    
    const toggleIsSignup = () => {
      setIsSignup(!isSignup);
    };
    return (
      <div className='hover:brightness-90 drop-shadow-xl grayscale scroll scroll-smooth'>
        <ProfileMenu ></ProfileMenu>
        <div className="container-fluid min-h-screen bg-white-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8 max-w-screen scroll scroll-smooth"> 
        <div className="sm:mx-auto sm:w-full sm:max-w-md scroll scroll-smooth">
       
          <h2 className="animate-bounce mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignup ? "Akara Sign up" : "Akara Sign in"}
          </h2>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white-800 py-8 px-4 shadow-lg shadow-black sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
            {isError ? (
                <div class="rounded-sm flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                  <p>{data ? `${data.message}`:""}</p>
                </div>
            ): ""}
            
              {isSignup ?(<div>
                <label
                  htmlFor="Username"
                  placeholder="input your username"
                  className="hover:-translate-y-5 duration-300 ease-linear transition-all delay-300 block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                    className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              
              </div>): ""}
  
  
              <div>
                <label
                  htmlFor="email"
                  placeholder="input your email address here"
                  className="hover:-translate-y-5 duration-300 ease-linear transition-all delay-300 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
  
              <div>
                <label
                  htmlFor="password"
                  className="hover:-translate-y-5 duration-300 ease-linear transition-all delay-300 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              
              {isSignup ? 
              (
                <div>
                <label
                  htmlFor="confirm"
                  className="hover:-translate-y-5 duration-300 ease-linear transition-all delay-300 block text-sm font-medium text-gray-700"
                >
                  confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    autoComplete="confirm password"
                    required
                    value={confirm}
                    onChange={handleConfirmChange}
                    className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              ):""}
              {
                !isSignup ? (
                  <div className="mb-4 flex justify-evenly">
                  <Radio
                    name="type"
                    ripple={false}
                    icon={<Icon />}
                    defaultChecked
                    onChange={()=> {
                      setSelectedOption("podcaster");
                    } }
                    className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 border-blue-500/50 bg-blue-500/25 p-0 transition-all hover:before:opacity-0"
                    label={
                      <Typography color="blue-gray" className="hover:-translate-y-5 duration-300 ease-linear transition-all delay-300 font-normal">
                        pocaster
                      </Typography>
                    }
                  />
                  <Radio
                    name="type"
                    onChange={()=> {setSelectedOption("admin");}}
                    ripple={false}
                    icon={<Icon />}
                    className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 border-blue-500/50 bg-blue-500/25 p-0 transition-all hover:before:opacity-0"
                    label={
                      <Typography color="blue-gray" className="hover:-translate-y-5 duration-300 ease-linear transition-all delay-300 font-normal">
                        admin
                      </Typography>
                    }
                  />
                </div>
  
                ):
                ""
              }
             
              <div>
                {
                  selectedOption === "admin" && !isSignup ?
                  (  <div className="mb-2">
                    <label
                      htmlFor="secret"
                      className="hover:-translate-y-5 duration-300 ease-linear transition-all delay-300 block text-sm font-medium text-gray-700"
                    >
                       admin secret
                    </label>
                    <div className="mt-1">
                      <input
                        id="secret"
                        name="secret"
                        type="password"
                        autoComplete="confirm password"
                        required
                        value={secret}
                        onChange={handleSecretChange}
                        className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>):
                  ""
                }
                <button
                  type="submit"
                  onClick={()=> setSignUpclicked(true)}
                  className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {signUpclicked ? isSignup? (<SpinnerColors content="It might be taken a second to proceed"></SpinnerColors>): (<SpinnerColors content="Syncronizing please wait a moment"></SpinnerColors>): isSignup ? "Sign up" : "Sign in"}
                  
                </button>
              </div>
            </form>
  
            <div className="mt-6">
              <button
                type="button"
                onClick={toggleIsSignup}
                className="hover:scale-105 transition-transform duration-200 ease-in-out deplay-150 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <SimpleFooter />
    </div>
        );
  
  }