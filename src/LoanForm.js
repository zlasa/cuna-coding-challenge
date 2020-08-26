import React, { useState } from "react";
import * as _ from 'lodash';
import LoanService from "./LoanService";
import { useHistory } from "react-router-dom";
import LoremIpsum from "./LoremIpsum";

function LoanForm(props) {
    const requiredField='This field is required';
    const history=useHistory();
    const [formData, setFormData]=useState({
        purchasePrice: '',
        make: '',
        model: '',
        yearlyIncome: '',
        creditScore: '',
        errors: {
            purchasePrice: '',
            make: '',
            model: '',
            yearlyIncome: '',
            creditScore: '',
        }
    });
    function validateAllForm() {
        let isValid=validateFormData('purchasePrice', formData.purchasePrice);
        isValid=validateFormData('make', formData.make)&&isValid;
        isValid=validateFormData('model', formData.model)&&isValid;
        isValid=validateFormData('yearlyIncome', formData.yearlyIncome)&&isValid;
        isValid=validateFormData('creditScore', formData.creditScore)&&isValid;
        return isValid
    }
    function validateFormData(name, value) {
        const currencyRegex=/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/gm;
        let error='';
        let updatedFormData={ ...formData };
        updatedFormData[name]=value
        switch(name) {
            case 'purchasePrice': {
                if(currencyRegex.exec(_.toNumber(value))==null) {
                    error="Invalid purchase price"
                }
                else if(_.isEmpty(value)) {
                    error=requiredField;
                }

                break;
            }

            case 'make': {
                if(_.isEmpty(value)) {
                    error=requiredField;
                }
                break;
            }
            case 'model': {
                if(_.isEmpty(value)) {
                    error=requiredField;
                }
                break;
            }
            case 'yearlyIncome': {
                if(currencyRegex.exec(_.toNumber(value))==null) {
                    error="Invalid yearly income"
                }
                if(_.isEmpty(value)) {
                    error=requiredField;
                }

                break;
            }

            case 'creditScore': {
                let cScore=_.toInteger(value);
                if(_.isEmpty(value)) {
                    error=requiredField;
                }
                else if(cScore>850||cScore<300) {
                    error='Credit score needs to be between 300-850'
                }
                break;
            }
            default:
                break;
        }
        updatedFormData.errors[name]=error;
        setFormData(updatedFormData);
        return error.length===0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const isValid=validateAllForm();
        if(isValid) {
            LoanService.process(_.omit(formData, 'errors'))
                .then((resp) => {
                    props.setLoanResponse(resp);
                    if(resp.isQualified) {
                        history.push('/create-account')
                    }
                    else {
                        history.push('/disqualification')
                    }
                })
                .catch(() => {
                    // usually we try to avoid using alerts and resort to using modal, popup, slideout
                    // to denote 4xx,5xx type of errors.
                    alert('An error has occurred. Please contact us at 800-888-8888.');
                });
        }
        else {

            console.log('has errors')
        }
    }
    function handleChange(event) {
        const { name, value }=event.target;
        validateFormData(name, value);

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="container-fluid mt-5">
                <h1 className="text-center">Loan Application</h1>
                <div className="row m-5">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="purchasePrice">Auto Purchase Price</label>
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input type="text" className="form-control" name="purchasePrice"
                                    placeholder="Purchase Price"
                                    onChange={handleChange}
                                    value={formData.purchasePrice}
                                />
                            </div>
                            {formData.errors.purchasePrice.length>0&&
                                <div className='text-danger'>{formData.errors.purchasePrice}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="make">Auto Make</label>
                            <input type="text" className="form-control" id="make" name="make" placeholder="Make"
                                onChange={handleChange}
                                value={formData.make} />
                            {formData.errors.make.length>0&&
                                <div className='text-danger'>{formData.errors.make}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="model">Auto Model</label>
                            <input type="text" className="form-control" id="model" name="model" placeholder="Model"
                                onChange={handleChange}
                                value={formData.model} />
                            {formData.errors.model.length>0&&
                                <div className='text-danger'>{formData.errors.model}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="yearlyIncome">User Estimated Yearly Income</label>
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input type="text" className="form-control" name="yearlyIncome" placeholder="Yearly Income"
                                    onChange={handleChange}
                                    value={formData.yearlyIncome} />
                            </div>
                            {formData.errors.yearlyIncome.length>0&&
                                <div className='text-danger'>{formData.errors.yearlyIncome}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="creditScore">User Estimated Credit Score</label>
                            <input type="text" className="form-control" id="creditScore" name="creditScore" placeholder="Credit Score"
                                onChange={handleChange}
                                value={formData.creditScore} />
                            {formData.errors.creditScore.length>0&&
                                <div className='text-danger'>{formData.errors.creditScore}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Next</button>
                    </div>
                    <div className="col-md-4">
                        <LoremIpsum />
                    </div>

                </div>

            </div>
        </form>
    )
}
export default LoanForm;