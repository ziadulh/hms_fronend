import React, { useRef, useState } from 'react'

const ProcessBill = () => {
    const url_local = process.env.REACT_APP_ROOT_URL;
    const [users, setusers] = useState([])
    const [expenditures, setExpenditures] = useState([]);
    let [formData, setFormData] = useState({ total_cost: 0.00, meal_rate: 1.00, meal_rate: 1.00 });
    // let [totalMealCost, setTotalMealCost] = useState();

    let ref_open_meal_preview_modal = useRef(null);
    let ref_close_meal_preview_modal = useRef(null);

    let showUserState = async () => {

        // Retrive user with meal quantity
        let obj = {};
        obj['id'] = [];
        obj['total_cost'] = 0.00;
        obj['total_meal'] = 0.00;
        obj['meal_rate'] = 1.00;
        // let total_meal = 0;
        try {
            const response = await fetch(url_local + "api/show-user-state", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('auth-token')
                }
            });
            let json = await response.json();
            // console.log(json);

            let tem_users = [];
            json.users.map(u => {
                if (u.meals.length > 0) {
                    tem_users.push(u);
                }
            });
            setusers(tem_users)
            // eslint-disable-next-line
            json.users.map(u => {
                if (u.meals.length > 0) {
                    obj['total_meal_' + u.id] = 0;
                    u.meals.map(meal => {
                        obj['meal_' + u.id + '_' + meal.type] = meal.total;
                        obj['total_meal'] += meal.total;
                        obj['total_meal_' + u.id] += meal.total;
                    })
                    obj['id'].push(u.id);
                }
            })

        } catch (error) {

        } finally {

        }

        // Retrive Cost head 
        try {

            const response = await fetch(url_local + "api/show-user-state/get-expenditure-head", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('auth-token')
                }
            });
            let json = await response.json();
            // console.log(json);
            setExpenditures(json.expenditures)

            // eslint-disable-next-line
            users.map(u => {
                if (u.meals.length > 0) {
                    expenditures.map(exp => {
                        // console.log('expenditure_'+u.id+'_'+exp.id);
                        obj['expenditure_' + u.id + '_' + exp.id] = exp.cost;
                    })
                }
            })

            setFormData(obj);

            // console.log(obj);

        } catch (error) {

        }
    }

    let changeExpenditureValue = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // let temp_formData = formData;
        // temp_formData.meal_rate = temp_formData.total_cost / temp_formData.total_meal;
        // setFormData(temp_formData);
        // console.log(formData);
    }

    let submitMealPreviewData = async () => {
    }
    
    let submitFormData = async () => {
        ref_open_meal_preview_modal.current.click();
        // console.log(formData);
        try {
            const response = await fetch(url_local + "api/show-user-state/process-monthly-data", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(formData)
            });

            let json = await response.json();
            console.log(json);
        } catch (error) {

        }
    }

    return (
        <div>
            <div className="container">
                <div className='row'>
                    <div className="card">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='float-start'><h5>Process Bill</h5></div>
                                    <div className='float-end'><button className='btn btn-primary' onClick={showUserState}>Show State</button></div>
                                </div>
                            </div>
                            <form action="">
                                <div className='row pt-3'>
                                    <div className='col-md-6'>
                                        <p>Total Meal Cost</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <input className='float-end' type="text" name="total_cost" value={formData.total_cost} onChange={changeExpenditureValue} />
                                    </div>
                                </div>
                                {users.map(el => {
                                    // <input type="text" name='id' value={''} />
                                    return <div className='row pt-3 mt-3' style={{ borderTop: '1px solid' }} key={'user_' + el.id}>
                                        <div className='col-md-2'>
                                            <p>Name</p>
                                            {el.meals.map(child_el => {
                                                return <div key={'child_el_1_' + child_el.type}>
                                                    <p>{child_el.type}</p>
                                                </div>
                                            })}
                                        </div>
                                        <div className='col-md-1'>
                                            <p>:</p>
                                            {el.meals.map(child_el => {
                                                return <p key={'child_el_2_' + child_el.type}>:</p>
                                            })}
                                        </div>
                                        <div className='col-md-3'>
                                            <p>{el.name}</p>
                                            {el.meals.map(child_el => {
                                                return <div key={'child_el_3_' + child_el.type}>
                                                    <p>{child_el.total}</p>
                                                    <input type="text" hidden readOnly name={'meal_' + el.id + '_' + child_el.type} value={child_el.total} />
                                                </div>
                                            })}
                                        </div>

                                        <div className='col-md-3'>
                                            {expenditures.map(meal_el => {
                                                return <div className='row' key={'expenditure_' + el.id + '_' + meal_el.id}>
                                                    <div className='col-md-6'>
                                                        <p>{meal_el.name}</p>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <input type="text" name={'expenditure_' + el.id + '_' + meal_el.id} value={formData['expenditure_' + el.id + '_' + meal_el.id]} onChange={changeExpenditureValue} />
                                                    </div>
                                                </div>
                                            })}
                                        </div>

                                    </div>
                                })}
                                <button className='btn btn-primary' type='button' onClick={submitFormData}>submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal to update user info */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref_open_meal_preview_modal} hidden>Create</button>
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
                                    <input type="text" className="form-control" id="name" name="name"  />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref_close_meal_preview_modal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { submitMealPreviewData() }}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcessBill