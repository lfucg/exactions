import React from 'react';
import { connect } from 'react-redux';
import {
    hashHistory,
} from 'react-router';
import { map } from 'ramda';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

import FormGroup from './FormGroup';

import {
    formInit,
    formUpdate,
} from '../actions/formActions';

import {
    getLots,
    getAccounts,
    getAgreements,
    getAccountLedgerID,
    postAccountLedger,
    putAccountLedger,
} from '../actions/apiActions';

class AccountLedgerForm extends React.Component {
    componentDidMount() {
        this.props.onComponentDidMount();
    }

    render() {
        const {
            activeForm,
            lots,
            accounts,
            agreements,
            accountLedgers,
            onSubmit,
            formChange,
        } = this.props;

        const lotsList = lots.length > 0 ? (map((lot) => {
            return (
                <option key={lot.id} value={[lot.id, lot.address_full]} >
                    {lot.address_full}
                </option>
            );
        })(lots)) : null;

        const accountsList = accounts.length > 0 ? (map((account) => {
            return (
                <option key={account.id} value={[account.id, account.account_name]} >
                    {account.account_name}
                </option>
            );
        })(accounts)) : null;

        const agreementsList = agreements.length > 0 ? (map((agreement) => {
            return (
                <option key={agreement.id} value={[agreement.id, agreement.resolution_number]} >
                    Resolution: {agreement.resolution_number}
                </option>
            );
        })(agreements)) : null;

        const submitEnabled =
            activeForm.account_from &&
            activeForm.account_to &&
            activeForm.lot &&
            activeForm.agreement &&
            activeForm.entry_type &&
            activeForm.non_sewer_credits &&
            activeForm.sewer_credits &&
            activeForm.entry_date;

        return (
            <div className="account-ledger-form">
                <Navbar />

                <div className="form-header">
                    <div className="container">
                        <h1>ACCOUNT LEDGERS - CREATE</h1>
                    </div>
                </div>

                <Breadcrumbs route={this.props.route} parent_link={'account-ledger'} parent_name={'Account Ledgers'} />

                <div className="inside-body">
                    <div className="container">
                        <div className="col-sm-offset-1 col-sm-10">
                            <form onSubmit={onSubmit} >

                                <fieldset>
                                    <div className="row">
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="lot" className="form-label" id="lot" aria-label="Lot" aria-required="true">* Lot</label>
                                            <select className="form-control" id="lot" onChange={formChange('lot')} value={activeForm.lot_show} >
                                                <option value="start_lot">Lot</option>
                                                {lotsList}
                                            </select>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="agreement" className="form-label" id="agreement" aria-label="Agreement" aria-required="true">* Agreement</label>
                                            <select className="form-control" id="agreement" onChange={formChange('agreement')} value={activeForm.agreement_show} >
                                                <option value="start_agreement">Agreement Resolution</option>
                                                {agreementsList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="account_from" className="form-label" id="account_from" aria-label="Account From" aria-required="true">* Account From</label>
                                            <select className="form-control" id="account_from" onChange={formChange('account_from')} value={activeForm.account_from_show} >
                                                <option value="start_account_from">Account From</option>
                                                {accountsList}
                                            </select>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="account_to" className="form-label" id="account_to" aria-label="Account To" aria-required="true">* Account To</label>
                                            <select className="form-control" id="account_to" onChange={formChange('account_to')} value={activeForm.account_to_show} >
                                                <option value="start_account_to">Account To</option>
                                                {accountsList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormGroup label="* Entry Date" id="entry_date" aria-required="true">
                                                <input type="date" className="form-control" placeholder="Entry Date" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="entry_type" className="form-label" id="entry_type" aria-label="Entry Type">Entry Type</label>
                                            <select className="form-control" id="entry_type" onChange={formChange('entry_type')} value={activeForm.entry_type_show} >
                                                <option value="start_entry">Entry Type</option>
                                                <option value={['NEW', 'New']}>New</option>
                                                <option value={['SELL', 'Sell']}>Sell</option>
                                                <option value={['TRANSFER', 'Transfer']}>Transfer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormGroup label="* Non-Sewer Credits" id="non_sewer_credits" aria-required="true">
                                                <input type="number" className="form-control" placeholder="Non-Sewer Credits" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-6">
                                            <FormGroup label="* Sewer Credits" id="sewer_credits" aria-required="true">
                                                <input type="number" className="form-control" placeholder="Sewer Credits" />
                                            </FormGroup>
                                        </div>
                                    </div>
                                </fieldset>
                                <button disabled={!submitEnabled} className="btn btn-lex">Submit</button>
                                {!submitEnabled ? (
                                    <div>
                                        <div className="clearfix" />
                                        <span> * All required fields must be filled.</span>
                                    </div>
                                ) : null
                                }
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

AccountLedgerForm.propTypes = {
    activeForm: PropTypes.object,
    lots: PropTypes.array,
    accounts: PropTypes.array,
    agreements: PropTypes.array,
    accountLedgers: PropTypes.array,
    route: PropTypes.object,
    onComponentDidMount: PropTypes.func,
    onSubmit: PropTypes.func,
    formChange: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        activeForm: state.activeForm,
        lots: state.lots,
        accounts: state.accounts,
        agreements: state.agreements,
        accountLedgers: state.accountLedgers,
    };
}

function mapDispatchToProps(dispatch, params) {
    const selectedAccountLedger = params.params.id;

    return {
        onComponentDidMount() {
            dispatch(formInit());
            dispatch(getLots());
            dispatch(getAccounts());
            dispatch(getAgreements());
            if (selectedAccountLedger) {
                dispatch(getAccountLedgerID(selectedAccountLedger))
                .then((data_account_ledger) => {
                    const update = {
                        lot: data_account_ledger.response.lot ? data_account_ledger.response.lot.id : null,
                        lot_show: data_account_ledger.response.lot ? `${data_account_ledger.response.lot.id},${data_account_ledger.response.lot.address_full}` : '',
                        account_from: data_account_ledger.response.account_from ? data_account_ledger.response.account_from.id : null,
                        account_from_show: data_account_ledger.response.account_from ? `${data_account_ledger.response.account_from.id},${data_account_ledger.response.account_from.account_name}` : '',
                        account_to: data_account_ledger.response.account_to ? data_account_ledger.response.account_to.id : null,
                        account_to_show: data_account_ledger.response.account_to ? `${data_account_ledger.response.account_to.id},${data_account_ledger.response.account_to.account_name}` : '',
                        agreement: data_account_ledger.response.agreement ? data_account_ledger.response.agreement.id : null,
                        agreement_show: data_account_ledger.response.agreement ? `${data_account_ledger.response.agreement.id},${data_account_ledger.response.agreement.resolution_number}` : '',
                        entry_date: data_account_ledger.response.entry_date,
                        entry_type: data_account_ledger.response.entry_type,
                        entry_type_show: `${data_account_ledger.response.entry_type},${data_account_ledger.response.entry_type_display}`,
                        non_sewer_credits: data_account_ledger.response.non_sewer_credits,
                        sewer_credits: data_account_ledger.response.sewer_credits,
                    };
                    dispatch(formUpdate(update));
                });
            } else {
                const initial_constants = {
                    lot_show: '',
                    account_from_show: '',
                    account_to_show: '',
                    agreement_show: '',
                    entry_type_show: '',
                };
                dispatch(formUpdate(initial_constants));
            }
        },
        formChange(field) {
            return (e, ...args) => {
                const value = typeof e.target.value !== 'undefined' ? e.target.value : args[1];

                const comma_index = value.indexOf(',');
                const value_id = value.substring(0, comma_index);
                const value_name = value.substring(comma_index + 1, value.length);
                const field_name = `${[field]}_name`;
                const field_show = `${[field]}_show`;

                const update = {
                    [field]: value_id,
                    [field_name]: value_name,
                    [field_show]: value,
                };
                dispatch(formUpdate(update));
            };
        },
        onSubmit(event) {
            event.preventDefault();
            if (selectedAccountLedger) {
                dispatch(putAccountLedger(selectedAccountLedger))
                .then(() => {
                    hashHistory.push(`account-ledger/summary/${selectedAccountLedger}`);
                });
            } else {
                dispatch(postAccountLedger())
                .then((data_post) => {
                    hashHistory.push(`account-ledger/summary/${data_post.response.id}`);
                });
            }
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountLedgerForm);
