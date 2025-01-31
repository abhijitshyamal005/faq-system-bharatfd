import { useState } from 'react';
import AdminForm from '../../components/AdminForm';

export default function AdminPage() {
    const [successMessage, setSuccessMessage] = useState('');

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {successMessage && (
                <div className="bg-green-100 p-4 mb-4 rounded">
                    {successMessage}
                </div>
            )}

            <AdminForm onSuccess={(message) => setSuccessMessage(message)} />
        </div>
    );
}