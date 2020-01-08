import React, { Component } from "react";
import Customerheader from "../dashboard/customerheader";

import '../admin/adminsAuth/Signin.css'

export class GenerateOtp extends Component {
    constructor() {
        super()
        this.state = {
           
            number:'',
            fname:''
            
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
                // console.log(result)
                var fname = result.fname
                var lname = result.lname
                var name = fname + ' ' + lname
                this.setState({
                   fname:fname
                })
            })
            .catch(err => console.log(err))
    }
    handleSubmit(e) {
        e.preventDefault()
        fetch('/generate', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               
                number: this.state.number,
                fname:this.state.fname
                
            })

        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                alert(res.message)
            })
            .catch(err => console.log(err))
    }
   
    handlePhone(e) {
        this.setState({ number: e.target.value })
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
                                                name=""
                                                value=
                                                {this.state.number}
                                                id="acct"
                                                onChange={this.handlePhone.bind(this)}
                                                placeholder="phone number"
                                            />
                                        </div>

                                        
                                        <button
                                            className="site-btn sb-gradients"
                                            onClick={this.handleSubmit.bind(this)}
                                        >
                                            Send{" "}
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
