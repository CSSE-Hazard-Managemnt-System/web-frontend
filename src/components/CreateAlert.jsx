import { useState } from 'react';
import apiClient from '../api/axios';

const CreateAlert = () => {
    const [formData, setFormData] = useState({
        alertId: `ALT-${Math.floor(Math.random() * 10000)}`,
        severity: 'High',
        headline: '',
        instruction: '',
        languages: ['English', 'Sinhala']
    });

    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/alerts', formData);
            setStatus({ type: 'success', message: `Alert ${response.data.alertId} Created!` });
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Error creating alert' });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Issue Hazard Warning</h2>
            
            {status && (
                <div className={`p-3 mb-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Headline</label>
                    <input 
                        type="text" 
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setFormData({...formData, headline: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Severity</label>
                    <select 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setFormData({...formData, severity: e.target.value})}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High" selected>High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Instructions</label>
                    <textarea 
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        rows="3"
                        onChange={(e) => setFormData({...formData, instruction: e.target.value})}
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Dispatch Alert
                </button>
            </form>
        </div>
    );
};

export default CreateAlert;