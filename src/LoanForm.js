import React, { useState } from "react";
import * as _ from 'lodash';

function LoanForm() {
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
    function handleChange(event) {
        debugger;
        const { name, value }=event.target;
        let errors=formData.errors;

        switch(name) {
            case 'purchasePrice': {
                let error=''
                if(_.isEmpty(value)) {
                    error='Provide purchase price';
                }
                errors[name]=error;
                break;
            }

            case 'make': {
                let error=''
                if(_.isEmpty(value)) {
                    error='Provide purchase make';
                }
                errors[name]=error;
                break;
            }
            case 'model': {
                let error=''
                if(_.isEmpty(value)) {
                    error='Provide purchase model';
                }
                errors[name]=error;
                break;
            }
            case 'yearlyIncome': {
                let error=''
                if(_.isEmpty(value)) {
                    error='Provide purchase income';
                }
                errors[name]=error;
                break;
            }

            case 'creditScore': {
                let error=''
                if(_.isEmpty(value)) {
                    error='Provide purchase credit score';
                }
                errors[name]=error;
                break;
            }
            default:
                break;
        }

        setFormData({ errors, [name]: value }, () => {
            console.log(errors)
        })

    }
    return (
        <form>
            <div className="container">
                <div className="form-group">
                    <label htmlFor="purchasePrice">Auto Purchase Price</label>
                    <div className="input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input type="number" className="form-control" name="purchasePrice"
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
                        <input type="number" className="form-control" name="yearlyIncome" placeholder="Yearly Income"
                            onChange={handleChange}
                            value={formData.yearlyIncome} />
                    </div>
                    {formData.errors.yearlyIncome.length>0&&
                        <div className='text-danger'>{formData.errors.yearlyIncome}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="creditScore">User Estimated Credit Score</label>
                    <input min="300" max="850" type="number" className="form-control" id="creditScore" name="creditScore" placeholder="Credit Score"
                        onChange={handleChange}
                        value={formData.creditScore} />
                    {formData.errors.creditScore.length>0&&
                        <div className='text-danger'>{formData.errors.creditScore}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}
export default LoanForm;