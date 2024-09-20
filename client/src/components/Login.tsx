/* eslint-disable @typescript-eslint/no-explicit-any */
import '../App.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
    username: z.string().min(1, { message: 'Expected a username.' }),
    password: z.string().min(1, { message: 'Exptected a password.' }).max(30, { message: 'Incorrect Password.' })
});

type credentials = z.infer<typeof schema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<credentials>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<credentials> = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                console.log(response.data.success);
                navigate('/dashboard');
            } else {
                console.log('Error submitting the user info.');
            }
        } catch (err: any) {
            if(err.response) {
                if(err.response.status === 401) {
                    console.error(err.response.data.error)
                }
            } else {
                console.error("Couldn't connect to the server: ", err.response.data.error);
            }
        }
    }
    return (
        <div className='h-screen flex justify-center items-center'>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Sign in to your account</p>
                <div className="input-container">
                    <input type="text" placeholder="Enter username" {...register('username')} />
                    {errors.username && (<p className='text-red-500'>{errors.username.message}</p>)}
                    <span>
                    </span>
                </div>
                <div className="input-container">
                    <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" {...register('password')} />
                    <span className='absolute inset-y-0 right-0 pr-7 flex items-center cursor-pointer' onClick={togglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
                    {errors.password && (<p className='text-red-500'>{errors.password.message}</p>)}
                <button type="submit" className="submit">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </button>
            </form>
        </div>
    )
}