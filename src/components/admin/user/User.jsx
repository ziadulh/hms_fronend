import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../../../contexts/loadder/UserContext';
import './User.css'
import { BiEditAlt, BiTrashAlt, BiStreetView } from "react-icons/bi";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderContext from '../../../contexts/loadder/LoaderContext';
import Loader from '../../loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const url_local = process.env.REACT_APP_ROOT_URL;

  // useNavigate to navigate url 
  const navigate = useNavigate();

  const context = useContext(UserContext);   // using context
  const { users, getUsers, setUsers } = context;   // extracting value from context

  // context from LoaderContext
  const loaderContext = useContext(LoaderContext);
  const { isLoaderEnable, setIsLoaderEnable } = loaderContext;

  useEffect(() => {   // conmonentDidMount(work on document ready)
    getUsers(0, 20);   // getting all users (implemented on User Context API)
  }, []);

  let [resultState, setResultState] = useState({
    page: 20, limit: 5
  })

  let [totalResult, setTotalResult] = useState(0)
  let [hasReachedMax, setHasReachedMax] = useState(false)

  const ref_update_user_modal = useRef(null);
  const ref_close_update_user_modal = useRef(null);

  // fetching data on scroll
  let fetchMoreUsers = async () => {
    try {
      if (!hasReachedMax) {
        setIsLoaderEnable(true);
        setResultState({
          page: resultState.page + 5, limit: 5
        })
        setTotalResult(totalResult + 5);
        // setIsLoaderEnable(true);
        let page = resultState.page;
        let limit = resultState.limit;
        const response = await fetch(url_local + `api/users/?page=${page}&limit=${limit}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth_token': localStorage.getItem('auth-token')
          },
        });

        // converting response to json
        let json = await response.json();
        if (json.users.length <= 0) {
          setHasReachedMax(true);
        }
        else {
          setUsers(users.concat(json.users));
        }
      } else {

      }

    } catch (error) {
      // toast.error("Oops! Something went wrong.");
    } finally {
      setIsLoaderEnable(false);
    }
  }

  //edit users
  let [RUserData, setRUserData] = useState({
    eId: '',
    eName: '',
    eEmail: '',
    eRole: ''
  })

  const editUser = async (id) => {
    const response = await fetch(url_local + "api/users/" + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth-token')
      },
    });
    let res_data = await response.json();
    setRUserData({
      eId: res_data.user.id,
      eName: res_data.user.name,
      eEmail: res_data.user.email,
      eRole: res_data.user.role
    });
    ref_update_user_modal.current.click();
  }

  let changeResData = (e) => {
    setRUserData({ ...RUserData, [e.target.name]: e.target.value });
  }
  
  let submitEditedData = async (eData) => {
    setIsLoaderEnable(false);
    try {
      const response = await fetch(url_local + "api/users/" + eData.eId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({ name: RUserData.eName, email: RUserData.eEmail, role: RUserData.eRole })
      });

      if (response.status === 200) {
        let newUsers = users;
        for (let index = 0; index < users.length; index++) {
          const element = newUsers[index];
          if (eData.eId === element.id) {
            newUsers[index].name = eData.eName;
            newUsers[index].email = eData.eEmail;
            newUsers[index].role = eData.eRole;
            setUsers(newUsers);
            break;
          }
        }
        ref_close_update_user_modal.current.click();
      } else {
        let json = await response.json();
        (json.errors).forEach(el => {
          toast.error(el.msg);
        });
      }
      // setSpinnerVal(true);
    } catch (error) {
      toast.error("Oops! Something went wrong!");
    } finally{
      setIsLoaderEnable(true);
    }
  }

  let getMeals = async (id) => {
    navigate('/admin/meal/'+id)
  }

  return (
    <div>
      {/* {isLoaderEnable && <Loader />} */}
      <InfiniteScroll
        dataLength={totalResult}
        next={fetchMoreUsers}
        hasMore={!hasReachedMax}
      // hasMore={this.state.articles.length !== this.state.totalResults}
      // loader={<Loader />}
      >
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td className='btn-danger'>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {(users).map((element) => {
              return <tr className="col-md-4" key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.role}</td>
                <td>
                  <button style={{ background: 'blue' }} onClick={() => { editUser(element.id) }}> <BiEditAlt /> </button>
                  <button style={{ background: 'red' }}> <BiTrashAlt /> </button>
                  <button style={{ background: 'green' }} onClick={() => { getMeals(element.id) }}> <BiStreetView /> </button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </InfiniteScroll>


      {/* modal to update user info */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref_update_user_modal} hidden>Update</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="eName" className="form-label">Enter Name</label>
                  <input type="text" className="form-control" id="eName" name="eName" value={RUserData.eName} onChange={changeResData} />
                </div>
                <div className="mb-3">
                  <label htmlFor="eEmail" className="form-label">Enter Description</label>
                  <input type="text" className="form-control" id="eEmail" value={RUserData.eEmail} name="eEmail" onChange={changeResData} />
                </div>

                <div className="mb-3">
                  <label htmlFor="eRole" className="form-label">Select Tag</label>
                  <select className="form-select" id="eRole" value={RUserData.eRole} name="eRole" onChange={changeResData} aria-label="Default select example">
                    <option>Select</option>
                    <option value="super">Super</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref_close_update_user_modal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => { submitEditedData(RUserData) }} disabled={(RUserData.eName.length < 3 || RUserData.eName.length > 50)}>Update</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default User