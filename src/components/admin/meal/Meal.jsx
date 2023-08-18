import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom';

const Meal = () => {
  const url_local = process.env.REACT_APP_ROOT_URL;

  const params = useParams();

  let [meals, setMeals] = useState({});

  // to get all the dates of current month
  const getAllDatesOfCurrentMonth = () => {
    let date = new Date();
    let month = date.getMonth();
    date.setDate(1);
    let all_days = [];
    while (date.getMonth() === month) {
      let d = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
      all_days.push(d);
      date.setDate(date.getDate() + 1);
    }
    return all_days;
  }

  //Retrive meals
  let getMeals = async () => {
    try {
      let date = new Date();
      // let consumer = null;
      // let month = null;
      // let year = null;
      let consumer = params.consumer || 1;
      let month = params.month || date.getMonth() + 1;
      let year = params.year || date.getFullYear();
      const response = await fetch(url_local + `api/meals/?consumer=${consumer}&month=${month}&year=${year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth-token')
        },
      });

      // converting response to json
      let json = await response.json();
      setMeals(json.meals);

      //setting user meal value if data is exist on database
      let tmp_retrive_meals = json.meals;
      let tmp_created_meals = userMeals;
      let days = getAllDatesOfCurrentMonth();
      days.forEach(dt => {
        if (dt + "_B" in tmp_retrive_meals) {
          tmp_created_meals[dt + "_B"] = tmp_retrive_meals[dt + "_B"].count
        }
        if (dt + "_L" in tmp_retrive_meals) {
          tmp_created_meals[dt + "_L"] = tmp_retrive_meals[dt + "_L"].count
        }
        if (dt + "_D" in tmp_retrive_meals) {
          tmp_created_meals[dt + "_D"] = tmp_retrive_meals[dt + "_D"].count
        }
      });
      setUserMeals(tmp_created_meals);
    } catch (error) {

    }
  }

  // create init data for user meals (initially all values are null)
  let initUserMeals = () => {
    let obj = {};
    getAllDatesOfCurrentMonth().forEach(el => {
      obj[el + "_B"] = '';
      obj[el + "_L"] = '';
      obj[el + "_D"] = '';
    });
    return obj;
  }

  //define initial values of user meals
  let [userMeals, setUserMeals] = useState(initUserMeals);

  let changeMealNumber = async (e) => {
    setUserMeals({ ...userMeals, [e.target.name]: e.target.value });
    console.log(userMeals);
  }

  let submitMealData = async (consumer) => {
    // alert(consumer)
    try {
      const response = await fetch(url_local + "api/meals/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({userMeals, consumer})
      });

      console.log(response);
    } catch (error) {

    }
  }

  useEffect(() => {
    getMeals();
  }, [])

  return (
    <div>
      {/* <form action="">

      </form> */}
      <table >
        <thead>
          <tr>
            <td>Date</td>
            <td>Breakfast</td>
            <td>Lunch</td>
            <td>Dinner</td>
          </tr>
        </thead>
        <tbody>
          {getAllDatesOfCurrentMonth().map((dt) => {
            return <tr key={dt.split("-")[2]}>
              <td>{dt.split("-")[2]}</td>
              {/* <td>{meals.hasOwnProperty('2023-05-01_B') ? meals[dt].id : 'B'}</td> */}
              <td><input type="text" name={dt + "_B"} placeholder='B' value={dt + "_B" in userMeals ? userMeals[dt + "_B"] : ""} onChange={changeMealNumber} /></td>
              <td><input type="text" name={dt + "_L"} placeholder='L' value={dt + "_L" in userMeals ? userMeals[dt + "_L"] : ""} onChange={changeMealNumber} /></td>
              <td><input type="text" name={dt + "_D"} placeholder='D' value={dt + "_D" in userMeals ? userMeals[dt + "_D"] : ""} onChange={changeMealNumber} /></td>
            </tr>
          })}
        </tbody>
      </table>
      <div style={{ marginLeft: '807px', marginTop: '10px', marginBottom: '20px' }}>
        <button style={{ background: 'green' }} onClick={() => { submitMealData(params.consumer) }}>Submit</button>
      </div>
    </div>
  )
}

export default Meal