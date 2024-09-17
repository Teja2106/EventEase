import '../App.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const schema = z.object({
    email: z.string().min(1, { message: 'Expected a email.' }).email({ message: 'Invalid email format.' }),
    password: z.string().min(1, { message: 'Exptected a password.' }).max(15, { message: 'Incorrect Password.' })
});

type credentials = z.infer<typeof schema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<credentials>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<credentials> = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', { data }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                console.log(response.data);
            } else {
                console.log('Error submitting the user info.');
            }
        } catch (err) {
            console.error("Couldn't connect to the server: ", err);
        }
    }
    return (
        <div className='max-w-screen-sm max-h-screen inset-0 fixed m-auto w-[25rem] h-[15rem]'>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Sign in to your account</p>
                <div className="input-container">
                    <input type="text" placeholder="Enter email" {...register('email')} />
                    {errors.email && (<p className='text-red-500'>{errors.email.message}</p>)}
                    <span>
                    </span>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Enter password" {...register('password')} />
                    <span className='absolute inset-y-0 right-0 pr-7 flex items-center cursor-pointer' onClick={togglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                    {errors.password && (<p className='text-red-500'>{errors.password.message}</p>)}
                </div>
                <button type="submit" className="submit">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </button>
            </form>
        </div>
    )
}