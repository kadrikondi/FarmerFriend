import React, { Component } from "react";
import Customerheader from "../dashboard/customerheader";

import '../admin/adminsAuth/Signin.css'

export class GenerateOtp extends Component {
    constructor() {
        super()
        this.state = {
           
            phone:'',
            fname:'',
            email: '',
            id: ''
            
            
        }
    }
    async componentDidMount() {
        const phone = await JSON.parse(localStorage.getItem('phone'))
        const email = localStorage.getItem('email')
        console.log(email)
        this.setState({email: email, phone: phone})
    }
    
    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.email)
        console.log(this.state.phone)
        fetch('/generate', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email
            })

        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.message === 'A message has been sent to your phone number'){
                alert(res.message)
                this.props.history.push("/confirmotp");
                }else{
                    alert(res.message)
                }

            })
            .catch(err => console.log(err))
    }
   
    handlePhone(e) {
        this.setState({ phone: e.target.value })
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

                        <div className="col-lg-8 col-md-8 col-md-8 col-sm-8"><h3 className="text-center ">Welcome to unify banking</h3>
                            <div className="card mt-5" id="signin" style={{ margin: "0 auto" }}>
                                 
                                <div className="card-header dark-text text-center py-4">
                                    <h4>User Confirmation</h4>
                                    <div className="card-body text-center">
                                       
                                        
                                        <div className="form-group">
                                            <p>kindly Provide a phone number to verify you</p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                disabled
                                                hidden
                                                name=""
                                                value=
                                                {this.state.phone}
                                                id="acct"
                                                onChange={this.handlePhone.bind(this)}
                                                placeholder="phone number"
                                            />
                                        </div>
                                        <div className="form-group">
                                        
                                            <input
                                                className="form-control"
                                                type="email"
                                                disabled
                                                hidden
                                                name=""
                                                value=
                                                {this.state.email}
                                            
                                                onChange={this.handleEmail.bind(this)}
                                                placeholder="email"
                                            />
                                        </div>

                                        
                                        <button
                                            className="site-btn sb-gradients"
                                            onClick={this.handleSubmit.bind(this)}
                                        >
                                            Send me otp{" "}
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

export default GenerateOtp;
