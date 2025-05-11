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
        EcommerceUrl: ''
    });
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUploading(true);

        // Parse comma/newline separated fields into arrays
        const ingredients = formData.ingredients
            .split(/[\n,]+/)
            .map(i => i.trim())
            .filter(Boolean);
        const steps = formData.steps
            .split(/[\n,]+/)
            .map(s => s.trim())
            .filter(Boolean);
        const ailments = formData.ailments
            .split(/[\n,]+/)
            .map(a => a.trim())
            .filter(Boolean);

        // Parse effectiveness as number
        const effectiveness = Number(formData.effectiveness);

        const body = {
            title: formData.title,
            description: formData.description,
            ingredients,
            steps,
            ailments,
            effectiveness,
            EcommerceUrl: formData.EcommerceUrl
        };

        try {
            const response = await fetch(`${baseUrl}remedy`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
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
                    EcommerceUrl: ''
                });
            } else {
                toast.error('Error submitting remedy');
            }
        } catch (error) {
            toast.error('Error submitting remedy');
        }
        setUploading(false);
    };

    return (
        <div className='w-[90vw] max-w-[1200px] h-[90vh] bg-gray-200 text-black flex justify-center py-4 max-sm:mb-4  mx-auto'>
            <div className="w-full md:w-[70vw] lg:w-[50vw] h-[100%] overflow-y-scroll overflow-x-hidden mb-4 max-sm:pb-14 px-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Submit a Remedy</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700">Ingredients (comma or newline separated)</label>
                        <textarea
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Steps (comma or newline separated)</label>
                        <textarea
                            name="steps"
                            value={formData.steps}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ailments (comma or newline separated)</label>
                        <textarea
                            name="ailments"
                            value={formData.ailments}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            rows="2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Effectiveness (1-5)</label>
                        <input
                            type="number"
                            name="effectiveness"
                            value={formData.effectiveness}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            min={1}
                            max={5}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ecommerce URL (optional)</label>
                        <input
                            type="url"
                            name="EcommerceUrl"
                            value={formData.EcommerceUrl}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md"
                            disabled={uploading}
                        >
                            {uploading ? "Submitting..." : "Submit Remedy"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RemedyForm;
