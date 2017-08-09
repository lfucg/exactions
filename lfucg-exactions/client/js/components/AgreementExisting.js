import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map } from 'ramda';

import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

import {
    getAgreements,
    getAgreementQuery,
} from '../actions/apiActions';

import {
    formUpdate,
} from '../actions/formActions';

class AgreementExisting extends React.Component {
    static propTypes = {
        agreements: React.PropTypes.object,
        route: React.PropTypes.object,
        onComponentDidMount: React.PropTypes.func,
        onAgreementQuery: React.PropTypes.func,
    };

    componentDidMount() {
        this.props.onComponentDidMount();
    }

    render() {
        const {
            agreements,
            onAgreementQuery,
        } = this.props;

        const agreements_list = agreements.length > 0 ? (
            map((agreement) => {
                return (
                    <div key={agreement.id} className="col-xs-12">
                        <div className="row form-subheading">
                            <div className="col-sm-7 col-md-9">
                                <h3>Resolution Number: {agreement.resolution_number}</h3>
                            </div>
                            <div className="col-sm-5 col-md-3">
                                <div className="col-xs-5">
                                    <Link to={`agreement/summary/${agreement.id}`} className="btn btn-mid-level">
                                        Summary
                                    </Link>
                                </div>
                                <div className="col-xs-5 col-xs-offset-1">
                                    <Link to={`agreement/form/${agreement.id}`} className="btn btn-mid-level">
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-offset-1">
                                <p className="col-md-4 col-xs-6">Account: {agreement.account_id}</p>
                                <p className="col-md-4 col-xs-6">Expansion Area: {agreement.expansion_area}</p>
                                <p className="col-xs-12">Agreement Type: {agreement.agreement_type}</p>
                                <p className="col-md-4 col-xs-6 ">Date Executed: {agreement.date_executed}</p>
                            </div>
                        </div>
                    </div>
                );
            })(agreements)
        ) : null;

        return (
            <div className="agreement-existing">
                <Navbar />

                <div className="form-header">
                    <div className="container">
                        <div className="col-sm-8">
                            <h1>AGREEMENTS - EXISTING</h1>
                        </div>
                        <div className="col-sm-2 col-sm-offset-1">
                            <Link to={'agreement/form/'} className="btn btn-top-level" >
                                Create
                            </Link>
                        </div>
                    </div>
                </div>

                <Breadcrumbs route={this.props.route} />

                <div className="row search-box">
                    <form onChange={onAgreementQuery('query')} className="col-sm-10 col-sm-offset-1" >
                        <fieldset>
                            <div className="col-sm-2 col-xs-12">
                                <label htmlFor="query" className="form-label">Search</label>
                            </div>
                            <div className="col-sm-10 col-xs-12">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search Agreements"
                                />
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="inside-body">
                    <div className="container">
                        {agreements_list}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        agreements: state.agreements,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onComponentDidMount() {
            dispatch(getAgreements());
        },
        onAgreementQuery(field) {
            return (e, ...args) => {
                const value = typeof e.target.value !== 'undefined' ? e.target.value : args[1];
                const update = {
                    [field]: value,
                };
                dispatch(formUpdate(update));
                dispatch(getAgreementQuery());
            };
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementExisting);
