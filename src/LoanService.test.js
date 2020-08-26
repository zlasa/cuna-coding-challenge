import LoanService from './LoanService';
import { LoremIpsumMsg } from './LoremIpsum';

test('should not approve the loan', async () => {
    let res=await LoanService.process({ purchasePrice: '', yearlyIncome: '', creditScore: '' });
    expect(res.isQualified).toEqual(false);
    expect(res.reason).toEqual(LoremIpsumMsg)

});

test('should approve the loan', async () => {
    let res=await LoanService.process({ purchasePrice: '10000', yearlyIncome: '100000', creditScore: '800' });
    expect(res.isQualified).toEqual(true);
    expect(res.reason).toEqual('')
});

test('should return bad request', async () => {
    try {
        await LoanService.process({ purchasePrice: '100000000', yearlyIncome: '100000', creditScore: '800' });
    }
    catch(err) {
        expect(err).toEqual(LoremIpsumMsg);
    };

});
