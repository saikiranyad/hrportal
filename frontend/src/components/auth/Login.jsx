// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { RadioGroup } from '../ui/radio-group'
// import { Button } from '../ui/button'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading, setUser } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'

// const Login = () => {
//     const [input, setInput] = useState({
//         email: "",
//         password: "",
//         role: "",
//     });
//     const { loading,user } = useSelector(store => store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         console.log(input)
//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 dispatch(setUser(res.data.user));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
//             dispatch(setLoading(false));
//         }
//     }
//     useEffect(()=>{
//         if(user){
//             navigate("/");
//         }
//     },[])
//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center max-w-7xl mx-auto'>
//                 <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
//                     <h1 className='font-bold text-xl mb-5'>Login</h1>
//                     <div className='my-2'>
//                         <Label>Email</Label>
//                         <Input
//                             type="email"
//                             value={input.email}
//                             name="email"
//                             onChange={changeEventHandler}
//                             placeholder="patel@gmail.com"
//                         />
//                     </div>

//                     <div className='my-2'>
//                         <Label>Password</Label>
//                         <Input
//                             type="password"
//                             value={input.password}
//                             name="password"
//                             onChange={changeEventHandler}
//                             placeholder="********"
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <RadioGroup className="flex items-center gap-4 my-5">
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="jobseeker"
//                                     checked={input.role === 'jobseeker'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r1">Jobseeker</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="Employeer"
//                                     checked={input.role === 'Employeer'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r2">Employeer</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="Hr"
//                                     checked={input.role === 'Hr'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r2">Hr</Label>
//                             </div>
//                         </RadioGroup>
//                     </div>
//                     {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
//                     }
//                     <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login







import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const generateCaptcha = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const Login = () => {
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [input, setInput] = useState({ email: '', password: '', role: '', verificationCode: '' });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const verifyCaptcha = () => {
        if (captchaInput === captcha) {
            setIsCaptchaVerified(true);
            toast.success('Captcha verified successfully!');
        } else {
            setIsCaptchaVerified(false);
            // alert("enter the capcha")
            toast.error('Incorrect CAPTCHA, please try again.');
            setCaptcha(generateCaptcha());
            setCaptchaInput('');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!isCaptchaVerified) {
            toast.error('Please verify CAPTCHA before logging in.');
            return;
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder='patel@gmail.com' />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder='********' />
                    </div>
                    {/* <div className='my-2'>
                        {/* <Label>Verification Code</Label> */}
                        {/* <Input type='text' value={input.verificationCode} name='verificationCode' onChange={changeEventHandler} placeholder='Enter verification code' /> */}
                    {/* </div>  */}
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className='flex items-center space-x-2'>
                                <Input type='radio' name='role' value='jobseeker' checked={input.role === 'jobseeker'} onChange={changeEventHandler} />
                                <Label>Jobseeker</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input type='radio' name='role' value='Employeer' checked={input.role === 'Employeer'} onChange={changeEventHandler} />
                                <Label>Employeer</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input type='radio' name='role' value='Hr' checked={input.role === 'Hr'} onChange={changeEventHandler} />
                                <Label>Hr</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {/* CAPTCHA Section */}
                    <div className='my-2'>
                        <Label>Captcha</Label>
                 
                        <Input type='text' value={captchaInput} 
                        onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())} placeholder='Enter CAPTCHA' requried />
                        <Button type='button' className='mt-2' onClick={verifyCaptcha}>Verify Captcha</Button>
                    </div>
                    <div className='flex items-center gap-3'>
                            <span className='font-bold text-lg bg-gray-200 p-2 rounded'>{captcha}</span>
                            <Button type='button' onClick={() => setCaptcha(generateCaptcha())}>Refresh</Button>
                        </div>
                    {loading ? (
                        <Button className='w-full my-4'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type='submit' className='w-full my-4' disabled={!isCaptchaVerified}>Login</Button>
                    )}
                    <span className='text-sm'>Don't have an account? <Link to='/signup' className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Login;
