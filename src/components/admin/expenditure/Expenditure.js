import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Expenditure.css'

const Expenditure = () => {
  const url_local = process.env.REACT_APP_ROOT_URL;

  // useNavigate to navigate url 
  const navigate = useNavigate();

  //define initial values of user meals
  let [expenditures, setExpenditures] = useState([]);

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

    } catch (error) {

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
              <h5 className="card-title">Card title</h5>
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
    </div>
  )
}

export default Expenditure