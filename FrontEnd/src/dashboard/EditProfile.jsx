

import React, { useState,useEffect } from 'react';
import { useUser } from '../Auth/useUser';
import { useToken } from '../Auth/useToken';
import axios from 'axios';

const EditProfile = () => {
    const user = useUser();
    const [token, setToken] = useToken();
    const[name,setName] =useState('');
    const [message, setMessage] = useState(''); // State for feedback message
    const [field, setField] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageName, setProfileImageName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [skills, setSkills] = useState('');
    const [bio, setBio] = useState('');

    console.log("this is token:::",token);
    if (!user) {
        return <div>Loading...</div>; // Show loading or error message
    }
     console.log("This is the user...",user);
    const { id, email,info = {} } = user;

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return; // Avoid running if user is not available
           
            
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/${user.id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                  
                });
                
            } catch (error) {
                console.error('Error fetching profile:', error.response ? error.response.data.message : error.message);
            } 
        };

        fetchProfile();
    }, [user,token]);

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
    
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('field', field);
            formData.append('profileImage', profileImage);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('skills', skills);
            formData.append('bio', bio);
    
            const response = await axios.put(
                `http://localhost:8080/api/users/${user.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log('Server response:', response.data);
    
            setName('');
            setField('');
            setProfileImage(null);
            setProfileImageName('');
            setPhone('');
            setAddress('');
            setSkills('');
            setBio('');
    
            setMessage(response.data.message || 'Profile updated successfully!');
            setToken(response.data.token);
        } catch (error) {
            console.error(error);
            setMessage(
                error.response?.data?.message || 'Error updating profile. Please try again.'
            );
        }
    };
    
    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Edit Profile</h3>
                                </div>
                                <form onSubmit={onSubmitHandle}>
                                    <div className="card-body">
                                        {message && <div className="alert alert-info">{message}</div>} {/* Message Display */}
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control" value={email} readOnly id="exampleInputEmail1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName">Name</label>
                                            <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} id="exampleInputName" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Field</label>
                                            <input type="text" className="form-control" value={field} onChange={e => setField(e.target.value)} id="exampleInputPassword1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">Profile Image</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        onChange={e => {
                                                            const file = e.target.files[0];
                                                            setProfileImage(file);
                                                            setProfileImageName(file.name);
                                                        }}
                                                        id="exampleInputFile" />
                                                    <label className="custom-file-label" htmlFor="exampleInputFile">{profileImageName || 'Choose file'}</label>
                                                </div>
                                                <div className="input-group-append">
                                                    <button className="input-group-text">Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPhone1">Phone</label>
                                            <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} id="exampleInputPhone1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputAddress1">Address</label>
                                            <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} id="exampleInputAddress1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputSkills1">Skills</label>
                                            <input type="text" className="form-control" value={skills} onChange={e => setSkills(e.target.value)} id="exampleInputSkills1" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputBio1">Bio</label>
                                            <input type="text" className="form-control" value={bio} onChange={e => setBio(e.target.value)} id="exampleInputBio1" />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditProfile;