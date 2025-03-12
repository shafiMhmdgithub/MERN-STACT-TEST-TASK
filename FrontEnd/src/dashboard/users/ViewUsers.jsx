import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ViewUsers = () => {
    const {user}=useSelector((store)=>store.users)||[];
    console.log("users from the store..",user)
  return (
     <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users</h3>
              <button className='btn btn-primary' style={{ marginLeft:'920px' }}> Add Users</button>
            </div>
            <div className="card-body p-0">
              {user.length === 0 ? (
                <div className="no-data-message">
                  <p>No user found.</p>
                </div>
              ) : (
                <table className="table table-striped projects">
                  <thead>
                    <tr>
                      <th style={{ width: '1%' }}>Sr.No</th>
                      <th style={{ width: '15%' }}>User Name</th>
                      <th style={{ width: '10%' }}>Email</th>
                      <th style={{ width: '15%' }}>Phone</th>
                      <th style={{ width: '10%' }}>Image</th>
                      <th style={{ width: '8%' }} className="text-center">Status</th>
                      <th style={{ width: '20%', paddingLeft: '150px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <img
                            alt="user"
                            className="table-avatar"
                            src={
                              user.profileImage
                                ? `http://localhost:8080/${user.profileImage}`
                                : 'path-to-default-placeholder-image.jpg'
                            }
                          />
                        </td>
                        <td>
                          <span className={`badge badge-${user.isVerified === true ? "success" : "danger"}`}>
                            {user.isVerified === true ? <h5>Verified</h5> : <h5>Not Verified</h5>}
                          </span>
    
                        </td>
                        <td className="project-actions  text-right">
                          <Link
                            className="btn btn-info mr-2 btn-sm"
                            to={`/add-edit-user/${user._id}`}
                            onClick={() => dispatch(setAddEdituser(true))}
                          >
                            <i className="fas fa-pencil-alt" /> Edit
                          </Link>
                          <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(user._id)}>
                            <i className="fas fa-trash" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
  )
}

export default ViewUsers;