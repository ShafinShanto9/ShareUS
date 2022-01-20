import React from 'react'
import { GoogleLogin } from "react-google-login"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import logo from "../assests/logowhite.png"
import shareVedio from "../assests/share.mp4"
import { client } from "../client"

const Login = () => {
    const navigate = useNavigate()
   const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };
    return (
        <div className='flex justify-start items-center flex-col h-screen '>
            <div className='relative w-full h-full'>
                <video
                    src={shareVedio}
                    type="vedio/mp4"
                    loop
                    muted
                    controls={false}
                    autoPlay
                    className='w-full h-full object-cover'
                />
                 <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width="130px" alt="logo" />
                    </div>
                    <div className='shadow-2xl'>
                        <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                        render = {(renderProps)=>(
                            <button
                            type='button'
                            className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            >
                            <FcGoogle className='mr-4'/>
                            Sign In With Google
                            </button>
                        )}

                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy='single_host_origin'


                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
