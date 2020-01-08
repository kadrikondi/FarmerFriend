import React, { Component } from "react";
import Customerheader from "../dashboard/customerheader";

import '../admin/adminsAuth/Signin.css'

export class ConfirmOtp extends Component {
    constructor() {
        super()
        this.state = {

            phone: '',
            

        }
    }
    async componentDidMount() {
        const token = await JSON.parse(localStorage.getItem('token'));
        fetch('/userdetails', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
            .then(res => res.json())
            .then(result => {
                //console.log(result)
                var fname = result.fname
                var lname = result.lname
                var name = fname + ' ' + lname
                this.setState({
                    from: name,
                    phone: result.phone,
                    acct: result.acct,
                    photo: result.photo
                })
            })
            .catch(err => console.log(err))
    }
    handleSubmit(e) {
        e.preventDefault()
        fetch('/check', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                phone: this.state.phone,


            })

        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                this.props.history.push("/cdash");
            })
            .catch(err => console.log(err))
    }

    handlePhone(e) {
        this.setState({ phone: e.target.value })
    }


    render() {
        return (
            <div>
                <Customerheader />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2">

                        </div>

                        <div className="col-lg-8 col-md-8 col-md-8 col-sm-8">
                            <div className="card mt-5" id="signin" style={{ margin: "0 auto" }}>
                                <div className="card-header dark-text text-center py-4">
                                    <h4>User Confirmation</h4>
                                    <div className="card-body text-center">


                                        <div className="form-group">
                                            <p>Enter the code we sent to provided number</p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                value={this.state.phone}
                                                id="acct"
                                                onChange={this.handlePhone.bind(this)}
                                                placeholder="confirm code"
                                            />
                                        </div>


                                        <button
                                            className="site-btn sb-gradients"
                                            onClick={this.handleSubmit.bind(this)}
                                        >
                                            Confirm{" "}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmOtp;
