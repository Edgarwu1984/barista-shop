import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes, FiEdit, RiAdminLine } from 'lib/icons';
import {
  deleteUser,
  getUserDetails,
  updateUser,
} from 'redux/actions/userActions';
import { USER_UPDATE_RESET } from 'redux/constants/userConstants';
import { toast } from 'react-toastify';
import Modal from './Modal';
import Loader from './Loader';

function UserList({ users }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: updateLoading, error: updateError, success } = userUpdate;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      setShowModal(false);
      toast.success('User has been updated.');
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, success, user]);

  if (updateError || error) {
    toast.error(updateError);
    toast.error(error);
  }

  const deleteUserHandler = (id, name) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
      toast.success(`User ${name} has been removed.`);
    }
  };

  const showModalHandler = id => {
    dispatch(getUserDetails(id));
    setShowModal(true);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: user._id,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <div className='table__wrapper'>
      {loading ? (
        <Loader />
      ) : (
        <Modal
          show={showModal}
          title={`User ID: ${user && user._id}`}
          onClose={() => setShowModal(false)}
        >
          {updateLoading && <Loader />}
          <form className='form' onSubmit={submitHandler}>
            <div className='form__group'>
              <label className='form__group-label'>Username</label>
              <input
                className='form__group-control'
                type='text'
                id='name'
                value={name}
                required
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='form__group'>
              <label className='form__group-label'>Email</label>
              <input
                className='form__group-control'
                type='email'
                id='email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='form__group'>
              <label className='form__group-label mr-1'>Admin</label>
              <input
                type='checkbox'
                id='isAdmin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </div>
            <div className='form__group'>
              <input
                className='form__group-control btn mb-2'
                type='submit'
                value='Update'
              />
            </div>
          </form>
        </Modal>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? <RiAdminLine /> : ' '}</td>
                <td>
                  <button
                    className='table__btn'
                    onClick={() => showModalHandler(user._id)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className='table__btn table__btn-danger'
                    onClick={() => deleteUserHandler(user._id, user.name)}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
