import { useEffect, useState } from 'react';
import API from '../api/axios';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', email: '', picture: '' });
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', picture: '' });
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get(`/auth/profile/${userId}`);
                setProfile(res.data);
                setForm({ name: res.data.name, email: res.data.email, picture: res.data.picture || '' });
            } catch (err) {
                // handle error
            }
        };
        if (userId) fetchProfile();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture' && files && files[0]) {
            setForm((prev) => ({ ...prev, picture: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        // Name cannot be only numbers
        if (/^\d+$/.test(form.name)) {
            alert('Name cannot be only numbers.');
            return;
        }
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        if (form.picture && form.picture instanceof File) {
            formData.append('picture', form.picture);
        }
        try {
            const res = await API.put(`/auth/profile/${userId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setProfile(res.data);
            setEditMode(false);
        } catch (err) {
            // handle error
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            {editMode ? (
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input name="email" value={form.email} onChange={handleChange} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label className="block mb-1">Profile Picture</label>
                        <input type="file" name="picture" accept="image/*" onChange={handleChange} className="border p-2 w-full" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    <button type="button" onClick={() => setEditMode(false)} className="ml-2 px-4 py-2 rounded border">Cancel</button>
                </form>
            ) : (
                <div className="space-y-4">
                    <div className="flex flex-col items-center">
                        <img src={profile.picture || 'https://ui-avatars.com/api/?name=' + profile.name} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
                        <button onClick={() => setEditMode(true)} className="text-blue-600 hover:underline">Edit Profile</button>
                    </div>
                    <div>
                        <strong>Name:</strong> {profile.name}
                    </div>
                    <div>
                        <strong>Email:</strong> {profile.email}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
