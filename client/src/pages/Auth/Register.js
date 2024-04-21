import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
            });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // console.log(process.env.REACT_APP_API);

    return (
        <Layout title='Register - Ecommerce App'>
            <div className="form-container">
                <h1>Register Page</h1>

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            className='form-control'
                            placeholder='Enter your name'
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            className='form-control'
                            placeholder='Enter Email'
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            className='form-control'
                            placeholder='Enter Password'
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type='text'
                            className='form-control'
                            placeholder='Enter Phone Number'
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type='text'
                            className='form-control'
                            placeholder='Enter Your Address'
                            required
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
