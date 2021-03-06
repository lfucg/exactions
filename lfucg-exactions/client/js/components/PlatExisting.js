import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map } from 'ramda';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import ExistingPageLinks from './ExistingPageLinks';
import LoadingScreen from './LoadingScreen';

import {
    formUpdate,
} from '../actions/formActions';

import {
    getPagination,
    getAccountsQuick,
    getSubdivisionsQuick,
    getLotsQuick,
} from '../actions/apiActions';

import { expansion_areas, plat_types } from '../constants/searchBarConstants';

class PlatExisting extends React.Component {
    componentDidMount() {
        this.props.onComponentDidMount();
    }

    render() {
        const {
            currentUser,
            plats,
            accounts,
            subdivisions,
            lots,
        } = this.props;

        const lotsList = lots && lots.length > 0 &&
            (map((single_lot) => {
                return {
                    id: single_lot.id,
                    name: single_lot.address_full,
                };
            })(lots));

        const accountsList = accounts && accounts.length > 0 &&
            (map((single_account) => {
                return {
                    id: single_account.id,
                    name: single_account.account_name,
                };
            })(accounts));

        const subdivisionsList = subdivisions && subdivisions.length > 0 &&
            (map((single_subdivision) => {
                return {
                    id: single_subdivision.id,
                    name: single_subdivision.name,
                };
            })(subdivisions));

        const plats_list = !!plats && !!plats.plats && plats.plats.length > 0 ? (
            map((plat) => {
                const cabinet = plat.cabinet ? `${plat.cabinet}-` : '';
                const slide = plat.slide ? plat.slide : plat.name;
                return (
                    <div key={plat.id} className="col-xs-12">
                        {(currentUser.id || plat.is_approved) && <div>
                            <ExistingPageLinks
                              linkStart="plat"
                              approval={plat.is_approved}
                              title={`${cabinet}${slide}`}
                              permissionModel="plat"
                              instanceID={plat.id}
                              uniqueReport
                            />
                            <div className="row">
                                <div className="col-sm-offset-1">
                                    <p className="col-xs-12 col-sm-6">Sewer Due: {plat.current_sewer_due}</p>
                                    <p className="col-xs-12 col-sm-6">Non-Sewer Due: {plat.current_non_sewer_due}</p>
                                    <p className="col-xs-6">Name: {plat.name}</p>
                                    <p className="col-xs-6">Section: {plat.section}</p>
                                    <p className="col-xs-6">Block: {plat.block}</p>
                                    <p className="col-xs-6">Expansion Area: {plat.expansion_area}</p>
                                </div>
                            </div>
                        </div>}
                    </div>
                );
            })(plats.plats)
        ) : null;

        return (
            <div className="plat-existing">
                <Navbar />

                <div className="form-header">
                    <div className="container">
                        <h1>PLATS - EXISTING</h1>
                    </div>
                </div>

                <Breadcrumbs route={this.props.route} route_permission="plat" />

                <SearchBar
                  apiCalls={[getAccountsQuick, getSubdivisionsQuick, getLotsQuick]}
                  advancedSearch={[
                    { filterField: 'filter_expansion_area', displayName: 'EA', list: expansion_areas },
                    { filterField: 'filter_account', displayName: 'Developer', list: accountsList },
                    { filterField: 'filter_subdivision', displayName: 'Subdivision', list: subdivisionsList },
                    { filterField: 'filter_plat_type', displayName: 'Type', list: plat_types },
                    { filterField: 'filter_lot__id', displayName: 'Lot', list: lotsList },
                    { filterField: 'filter_is_approved', displayName: 'Approval', list: [{ id: true, name: 'Approved' }, { id: false, name: 'Unapproved' }] },
                  ]}
                  currentPage="Plats"
                  csvEndpoint="../api/export_plat_csv/?"
                />

                <div className="inside-body">
                    <div className="container">
                        {plats.loadingPlat ? <LoadingScreen /> :
                        (
                            <div>
                                {plats_list}
                                {plats_list ?
                                    <Pagination 
                                        next={plats.next}
                                        prev={plats.prev}
                                        count={plats.count} 
                                    /> : 
                                    <h1>No Results Found</h1>
                                }
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

PlatExisting.propTypes = {
    currentUser: PropTypes.object,
    plats: PropTypes.object,
    accounts: PropTypes.array,
    subdivisions: PropTypes.array,
    lots: PropTypes.array,
    route: PropTypes.object,
    onComponentDidMount: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        plats: state.plats,
        accounts: state.accounts && state.accounts.accounts,
        subdivisions: state.subdivisions  && state.subdivisions.subdivisions,
        lots: state.lots && state.lots.lots,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onComponentDidMount() {
            dispatch(getPagination('/platQuick/'))
            .then(() => {
                dispatch(formUpdate({ loading: false }));
            });
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlatExisting);

