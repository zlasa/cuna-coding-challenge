import React, { useState } from "react";
import * as _ from 'lodash';
import LoanService from "./LoanService";
import { useHistory } from "react-router-dom";

function LoanForm() {
    const requiredField='This field is required';
    const history = useHistory();
    const [formData, setFormData]=useState({
        purchasePrice: null,
        make: null,
        model: null,
        yearlyIncome: null,
        creditScore: null,
        errors: {
            purchasePrice: '',
            make: '',
            model: '',
            yearlyIncome: '',
            creditScore: '',
        }
    });
    function validateFormData() {
        let hasErrors=false;
        let updatedFormData={ ...formData };
        if(_.isEmpty(updatedFormData.purchasePrice)) {
            updatedFormData.errors.purchasePrice=requiredField;
        }
        else {
            updatedFormData.errors.purchasePrice='';
        }

        if(_.isEmpty(updatedFormData.make)) {
            updatedFormData.errors.make=requiredField;
        }
        else {
            updatedFormData.errors.make='';
        }

        if(_.isEmpty(updatedFormData.model)) {
            updatedFormData.errors.model=requiredField;
        }
        else {
            updatedFormData.errors.model='';
        }
        if(_.isEmpty(updatedFormData.yearlyIncome)) {
            updatedFormData.errors.yearlyIncome=requiredField;
        }
        else {
            updatedFormData.errors.yearlyIncome='';
        }

        if(_.isEmpty(updatedFormData.creditScore)) {
            updatedFormData.errors.creditScore=requiredField;
        }
        else {
            updatedFormData.errors.creditScore='';

        }
        if(!_.isEmpty(updatedFormData.errors.purchasePrice)||
            !_.isEmpty(updatedFormData.errors.make)||
            !_.isEmpty(updatedFormData.errors.model)||
            !_.isEmpty(updatedFormData.errors.yearlyIncome)||
            !_.isEmpty(updatedFormData.errors.creditScore)) {
            hasErrors=true
        }
        setFormData(updatedFormData);
        return hasErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const hasErrors=validateFormData();
        if(!hasErrors) {
            LoanService.process(_.omit(formData, 'errors'))
            .then(() => {
                history.push('/login')
            })
            .catch(err => {
                alert(err)
            })
        }
        else {

            console.log('has errors')
        }
    }
    function handleChange(event) {
        const currencyRegex=/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/gm;
        const { name, value }=event.target;
        let updatedFormData={ ...formData };
        updatedFormData[name]=value
        switch(name) {
            case 'purchasePrice': {
                let error='';
                ;
                if(currencyRegex.exec(_.toNumber(value))==null) {
                    error="Invalid purchase price"
                }
                else if(_.isEmpty(value)) {
                    error=requiredField;
                }

                updatedFormData.errors[name]=error;
                break;
            }

            case 'make': {
                let error=''
                if(_.isEmpty(value)) {
                    error=requiredField;
                }
                updatedFormData.errors[name]=error;
                break;
            }
            case 'model': {
                let error=''
                if(_.isEmpty(value)) {
                    error=requiredField;
                }
                updatedFormData.errors[name]=error;
                break;
            }
            case 'yearlyIncome': {
                let error='';
                if(currencyRegex.exec(_.toNumber(value))==null) {
                    error="Invalid yearly income"
                }
                if(_.isEmpty(value)) {
                    error=requiredField;
                }

                updatedFormData.errors[name]=error;
                break;
            }

            case 'creditScore': {
                let error=''
                let cScore=_.toInteger(value);
                if(_.isEmpty(value)) {
                    error=requiredField;
                }
                else if(cScore>850||cScore<300) {
                    error='Credit score needs to be between 300-850'
                }
                updatedFormData.errors[name]=error;
                break;
            }
            default:
                break;
        }

        setFormData(updatedFormData);

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
                        What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                        software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>

                </div>

            </div>
        </form>
    )
}
export default LoanForm;