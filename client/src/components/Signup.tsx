/* eslint-disable @typescript-eslint/no-explicit-any */
import '../App.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const schema = z.object({
    full_name: z.string().min(1, { message: 'Enter your full name.' }).max(20, { message: 'Exceeded the word limit.' }),
    username: z.string().min(1, { message: 'Expected a username.' }).max(15, { message: 'Exceeded the word limit.' })
        .refine(async (username) => {
            try {
                const response = await axios.get(`http://localhost:3000/check/${username}`);
                return !response.data.exists;
            } catch (err) {
                console.error('Error checking username: ', err);
                return false;
            }
        }, { message: 'Username already exists.' }),
    college_name: z.string().min(1, { message: "Enter your college's name." }).max(15, { message: 'Exceeded the word limit.' }),
    email: z.string().min(1, { message: 'Expected an email.' }).email({ message: 'Invalid email format.' }),
    password: z.string().min(8, { message: 'Password should be at least of 8 characters' }).max(50, { message: 'Incorrect Password.' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%^*,_])[A-Za-z\d!@%^*,_]*$/, { message: 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character (!@%^*,_).' })
});

type credentials = z.infer<typeof schema>;

export default function Login() {
    const [showPassword, setshowPassword] = useState(false);

    const togglePassword = () => {
        setshowPassword(!showPassword);
    }
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<credentials>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<credentials> = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                console.log(response.data.message);
            }
        } catch (err: any) {
            if(err.response) {
                if(err.response.status === 409) {
                    console.error('Error: ', err.response.data.error);
                }
            }
        }
    }
    return (
        <div className='h-screen flex justify-center items-center'>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Sign up.</p>
                <div className="input-container">
                    <input type="text" placeholder="Full name" {...register('full_name')} />
                    {errors.full_name && (<p className='text-red-500'>{errors.full_name.message}</p>)}
                    <span>
                    </span>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="Username" {...register('username')} />
                    {errors.username && (<p className='text-red-500'>{errors.username.message}</p>)}
                    <span>
                    </span>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="College Name" {...register('college_name')} />
                    {errors.college_name && (<p className='text-red-500'>{errors.college_name.message}</p>)}
                    <span>
                    </span>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="Email" {...register('email')} />
                    {errors.email && (<p className='text-red-500'>{errors.email.message}</p>)}
                    <span>
                    </span>
                </div>
                <div className="input-container">
                    <input type={showPassword ? 'text' : 'password'} placeholder="Password" {...register('password')} />
                    <span className='absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer' onClick={togglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
                    {errors.password && (<p className='text-red-500'>{errors.password.message}</p>)}
                <button type="submit" className="submit">
                    {isSubmitting ? 'Signing Up' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}