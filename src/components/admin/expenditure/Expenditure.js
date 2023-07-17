import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Expenditure.css'
import { toast } from 'react-toastify';

const Expenditure = () => {
  const url_local = process.env.REACT_APP_ROOT_URL;

  // useNavigate to navigate url 
  const navigate = useNavigate();

  //define initial values of user meals
  let [expenditures, setExpenditures] = useState([]);

  //define initial values of user meals
  let [users, setUsers] = useState([]);

  //define initial values of user meals
  let [expenditure, setExpenditure] = useState({ name: '', cost: '', status: 'active' });

  let ref_close_expenditure_modal = useRef(null);
  let ref_open_expenditure_modal = useRef(null);

  const getExpenditures = async () => {
    try {
      const response = await fetch(url_local + "api/expenditure", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth-token')
        }
      });

      let json = await response.json();
      setExpenditures(json.expenditures);
      setUsers(json.users);
      console.log(json.users);

    } catch (error) {

    }
  }

  let addNewExpenditure = () => {
    ref_open_expenditure_modal.current.click();
  }

  const changeCreateData = (event) => {
    setExpenditure({ ...expenditure, [event.target.name]: event.target.value });
  }

  let submitCreateData = async () => {
    try {
      const response = await fetch(url_local + 'api/expenditure/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({ name: expenditure.name, cost: expenditure.cost, status: expenditure.status })
      });

      let json = await response.json();
      if (response.status) {
        // converting response to json
        setExpenditures(expenditures.concat(json.expenditure));
        setExpenditure({ name: '', cost: '', status: 'active' });
        ref_close_expenditure_modal.current.click();
        toast.success("Expenditure Saved", "Success")
      } else {
        (json.errors).forEach(el => {
          toast.error(el.msg);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {   // conmonentDidMount(work on document ready)
    getExpenditures();
  }, []);
  return (
    <div>
      <div className="container">
        <div className='row'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Expenditure</h5>
              <button className='float-end' onClick={() => {
                addNewExpenditure();
              }}>Add new</button>
              <table>
                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    expenditures.map((el) => {
                      return <tr key={el.id}>
                        <td>{el.name}</td>
                        <td>{el.name}</td>
                        <td>{el.cost}</td>
                        <td>edit</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* modal to update user info */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref_open_expenditure_modal} hidden>Create</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Enter Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={expenditure.name} onChange={changeCreateData} />
                </div>
                <div className="mb-3">
                  <label htmlFor="cost" className="form-label">Enter Cost</label>
                  <input type="text" className="form-control" id="cost" value={expenditure.cost} name="cost" onChange={changeCreateData} />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="user_id" className="form-label">User</label>
                  <select className="form-select" id="user_id" value={expenditure.user_id} name="user_id" onChange={changeCreateData} aria-label="Default select example">
                    {users.map(el => {
                      return <option>{el.name}</option>
                    })}
                  </select>
                </div> */}
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Select Tag</label>
                  <select className="form-select" id="status" value={expenditure.status} name="status" onChange={changeCreateData} aria-label="Default select example">
                    <option>Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref_close_expenditure_modal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => { submitCreateData(expenditure) }}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expenditure