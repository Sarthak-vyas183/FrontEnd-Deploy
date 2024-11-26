/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from "../Store/useAuth";
import { toast } from 'react-toastify';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const RemedyForm = () => {
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: '',
        steps: '',
        ailments: '',
        effectiveness: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await fetch(`${baseUrl}/user/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });
            if (response.ok) {
                toast.success('Remedy submitted successfully');
                setFormData({
                    title: '',
                    description: '',
                    ingredients: '',
                    steps: '',
                    ailments: '',
                    effectiveness: '',
                    image: null
                });
            } else {
                toast.error('Error submitting remedy');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return ( 
        <div className='w-[90vw] max-w-[1200px] h-[90vh] bg-gray-200 text-black flex justify-center py-4 max-sm:mb-4  mx-auto'>
            <div className="w-full md:w-[70vw] lg:w-[50vw] h-[100%] overflow-y-scroll overflow-x-hidden mb-4 max-sm:pb-14 px-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Submit a Remedy</h2>
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            className="mt-1 p-2 w-full border rounded-md"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            className="mt-1 p-2 w-full border rounded-md" 
                            rows="4"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
                        <input 
                            type="text" 
                            name="ingredients" 
                            value={formData.ingredients} 
                            onChange={handleChange} 
                            className="mt-1 p-2 w-full border rounded-md"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Steps (comma separated)</label>
                        <input 
                            type="text" 
                            name="steps" 
                            value={formData.steps} 
                            onChange={handleChange} 
                            className="mt-1 p-2 w-full border rounded-md"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ailments (comma separated)</label>
                        <input 
                            type="text" 
                            name="ailments" 
                            value={formData.ailments} 
                            onChange={handleChange} 
                            className="mt-1 p-2 w-full border rounded-md"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Effectiveness</label>
                        <input 
                            type="text" 
                            name="effectiveness" 
                            value={formData.effectiveness} 
                            onChange={handleChange} 
                            className="mt-1 p-2 w-full border rounded-md"
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input 
                            type="file" 
                            name="image" 
                            onChange={handleImageChange} 
                            className="mt-1 p-2 w-full border rounded-md"
                            required 
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Submit Remedy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RemedyForm;
