import React from 'react'

const ProcessBill = () => {
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
        } catch (error) {

        } finally{

        }

    }
    return (
        <div>
            <div className="container">
                <div className='row'>
                    <div className="card">
                        <div className="card-body">
                            <div className='float-start'><h5>Process Bill</h5></div>
                            <div className='float-end'><button className='btn btn-primary' onClick={showUserState}>Show State</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcessBill