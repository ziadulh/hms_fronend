import React, { useState } from 'react'

const ProcessBill = () => {
    const [users, setusers] = useState([])
    let showUserState = async () => {
        const url_local = process.env.REACT_APP_ROOT_URL;
        try {
            const response = await fetch(url_local + "api/show-user-state", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('auth-token')
                }
            });
            let json = await response.json();
            console.log(json);
            setusers(json.users)
        } catch (error) {

        } finally {

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
                            {users.map(el => {
                                return <div className='row pt-3 mt-3' style={{ borderTop: '1px solid' }} key={el.id}>
                                    <div className='col-md-2'>
                                        <p>Name</p>
                                        {el.meals.map(child_el => {
                                            return <p>{child_el.type}</p>
                                        })}
                                    </div>
                                    <div className='col-md-1'>
                                        <p>:</p>
                                        {el.meals.map(child_el => {
                                            return <p>:</p>
                                        })}
                                    </div>
                                    <div className='col-md-3'>
                                        <p>{el.name}</p>
                                        {el.meals.map(child_el => {
                                            return <p>{child_el.total}</p>
                                        })}
                                    </div>
                                </div>
                            })}
                            <div className='row'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcessBill