import React, { Component } from "react";
import Customerheader from "../dashboard/customerheader";
import {Link} from "react-router-dom"
import '../admin/adminsAuth/Signin.css'

export class ConfirmOtp extends Component {
    constructor() {
        super()
        this.state = {

            phone: '',
            email:'',
            otp: ''
            

        }
    }
    async componentDidMount() {
        const email = localStorage.getItem('email')
        console.log(email)
        this.setState({email: email})
    }
    handleSubmit(e) {
        e.preventDefault()
        fetch('/confirmotp', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                otp: this.state.otp,
                email: this.state.email

            })

        })
            .then(res => res.json())
            .then(res => {
                if (res.message === 'success'){
                    alert("Account confirmed")
                    this.props.history.push("/cdash");
                }else{
                alert(res.message)
                }
            })
            .catch(err => console.log(err))
    }

    handlePhone(e) {
        this.setState({ otp: e.target.value })
    }
    handleEmail(e) {
        this.setState({ email: e.target.value })
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
                                    <h4>User Confirm OTP</h4>
                                    <div className="card-body text-center">


                                        <div className="form-group">
                                            <p>Enter the code we sent to provided number</p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                value={this.state.otp}
                                                id="acct"
                                                onChange={this.handlePhone.bind(this)}
                                                placeholder="confirm OTP"
                                            />
                                        </div>

                                        <button
                                            className="site-btn sb-gradients"
                                            onClick={this.handleSubmit.bind(this)}
                                        >
                                            Confirm{" "}
                                        </button>
                                    </div>
                                    <p>if you dont see Pin after 5mins  <Link to="/userconfirm" className="btn  btn-sm btn-primary">Resend Pin</Link></p>
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
