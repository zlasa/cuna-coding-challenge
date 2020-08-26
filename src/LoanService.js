import { LoremIpsumMsg } from "./LoremIpsum";
import * as _ from 'lodash';

const LoanService={
    process: function (loanForm) {
        let mockResponseObject={
            isQualified: true,
            reason: ''
        }
        const purchasePrice=_.toNumber(loanForm.purchasePrice);
        const yearlyIncome=_.toNumber(loanForm.yearlyIncome);
        const creditScore = _.toNumber(loanForm.creditScore);

        if (purchasePrice > 1000000){
            return Promise.reject();
        }
        if(purchasePrice > (yearlyIncome/5) || creditScore < 600) {
            mockResponseObject.isQualified=false;
            mockResponseObject.reason=LoremIpsumMsg;
        }
        return Promise.resolve(mockResponseObject);
    },

};
export default LoanService;