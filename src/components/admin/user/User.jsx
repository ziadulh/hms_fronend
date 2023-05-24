import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../contexts/loadder/UserContext';
import './User.css'
import { BiEditAlt, BiTrashAlt, BiStreetView } from "react-icons/bi";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderContext from '../../../contexts/loadder/LoaderContext';
import Loader from '../../loader/Loader';

const User = () => {
  const url_local = process.env.REACT_APP_ROOT_URL;

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
  let editUser = async (userID) => {
    alert(userID);
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
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Description</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {(users).map((element) => {
              return <tr className="col-md-4" key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, natus nesciunt minus suscipit praesentium, dolore est, et aliquam quae iste harum nobis atque? At cum quos sequi illum quaerat itaque, odio ab non modi debitis labore dicta deleniti sapiente ducimus!</td>
                <td>{element.role}</td>
                <td>
                  <button style={{ background: 'blue' }} onClick={ () => {editUser(element.id)}}> <BiEditAlt /> </button>
                  <button style={{ background: 'red' }}> <BiTrashAlt /> </button>
                  <button style={{ background: 'green' }}> <BiStreetView /> </button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </InfiniteScroll>

    </div>
  )
}

export default User