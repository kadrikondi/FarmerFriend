import React, { Component } from "react";
import Customerheader from './dashboard/customerheader';
import Sidebar from "./dashboard/transaction/sidebar";
import './admin/adminsAuth/Signin.css'
import {getAllBank} from '../apidata/api'

export class Addbank extends Component {
    constructor() {
        super()
        this.state = {
            bankname: '',
            account: '',
            fname:'',
            allbank:[]
            
        }
    }
    async componentDidMount() {
        const bank = await getAllBank()
        // console.log(bank.info)
        this.setState({ allbank: bank.info })
    }
    async componentDidUpdate() {
        const bank = await getAllBank()
        // console.log(bank.info)
        this.setState({ allbank: bank.info })
    }
    handleSubmit(e) {
        e.preventDefault()
        fetch('/createbank', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bankname: this.state.bankname,
                account: this.state.account,
                fname: this.state.fname
            })

        })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                alert(res.message)
            })
            .catch(err => console.log(err))
    }
    handleBankName(e) {
        this.setState({ bankname: e.target.value })
    }
   
    handleAcct(e) {
        this.setState({ account: e.target.value })
    }
    handleFName(e) {
        this.setState({ fname: e.target.value })
    }

    render() {
        return (
            <div>
                <Customerheader />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <Sidebar />
                        </div>

                        <div className="col-lg-8 col-md-8 col-md-8 col-sm-8">
                            <div className="card mt-5" id="signin" style={{ margin: "0 auto" }}>
                                <div className="card-header dark-text text-center py-4">
                                    <h4>Add Bank</h4>
                                    <div className="card-body text-center">
                                       
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                value={this.state.fname}
                                                id="acct"
                                                onChange={this.handleFName.bind(this)}
                                                placeholder="Account Name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                value={this.state.account}
                                                id="acct"
                                                onChange={this.handleAcct.bind(this)}
                                                placeholder="Account number"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                value={this.state.bankname}
                                                id="acct"
                                                onChange={this.handleBankName.bind(this)}
                                                placeholder="bank name"
                                            />
                                        </div>
                                       
                                        
                                        <button
                                            className="site-btn sb-gradients"
                                            onClick={this.handleSubmit.bind(this)}
                                        >
                                            Add{" "}
                                        </button>
                                    </div>
                                </div>

            <h4 className="text-center pt-5">All Bank</h4>
{ this.state.allbank.map((bank ,index)=>{
    return <div className='p-2' key={index}>
        <p>Acct Name: {bank.fname} </p>
        <p>Acct Num: {bank.account} </p>
        <p>Bank: {bank.bankname} </p>

    </div>
})}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Addbank;
