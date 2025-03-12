
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../Auth/useUser';

const ViewProfile = () => {
    const user = useUser();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return; // Avoid running if user is not available
            console.log(user);
            
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/${user.id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setProfile(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>User not found</div>;
    }
console.log("Here is the profile image",profile.profileImage)
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card card-primary card-outline">
                        <div className="card-body box-profile">
                            <div className="text-center">
                                <img
                                    className="profile-user-img img-fluid img-circle"
                                    src={
                                        profile.profileImage
                                            ? `http://localhost:8080/${profile.profileImage}`
                                            : 'path-to-default-placeholder-image.jpg'
                                    }
                                />

                            </div>
                            <h3 className="profile-username text-center">{profile.name}</h3>
                            <p className="text-muted text-center">{profile.field}</p>
                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    <b>Email</b> <a className="float-right">{profile.email}</a>
                                </li>
                                <li className="list-group-item">
                                    <b>Phone</b> <a className="float-right">{profile.phone}</a>
                                </li>
                                <li className="list-group-item">
                                    <b>Address</b> <a className="float-right">{profile.address}</a>
                                </li>
                                <li className="list-group-item">
                                    <b>Skills</b> <a className="float-right">{profile.skills}</a>
                                </li>
                                <li className="list-group-item">
                                    <b>Bio</b> <a className="float-right">{profile.bio}</a>
                                </li>
                            </ul>
                            <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;



