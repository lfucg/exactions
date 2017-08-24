import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map } from 'ramda';

import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

import {
    getPlats,
    getPlatQuery,
} from '../actions/apiActions';

import {
    formUpdate,
} from '../actions/formActions';

class PlatExisting extends React.Component {
    static propTypes = {
        currentUser: React.PropTypes.object,
        plats: React.PropTypes.object,
        route: React.PropTypes.object,
        onComponentDidMount: React.PropTypes.func,
        onPlatQuery: React.PropTypes.func,
    };

    componentDidMount() {
        this.props.onComponentDidMount();
    }


    render() {
        const {
            currentUser,
            plats,
            onPlatQuery,
        } = this.props;

        const plats_list = plats.length > 0 ? (
            map((plat) => {
                return (
                    <div key={plat.id} className="col-xs-12">
                        <div className="row form-subheading">
                            <div className="col-sm-7 col-md-9">
                                <h3>{plat.name}</h3>
                            </div>
                            <div className="col-sm-5 col-md-3">
                                <div className="col-xs-5">
                                    {currentUser && currentUser.permissions && currentUser.permissions.plat &&
                                        <Link to={`plat/form/${plat.id}`} className="btn btn-mid-level">
                                            Edit
                                        </Link>
                                    }
                                </div>
                                <div className="col-xs-5 col-xs-offset-1">
                                    <Link to={`plat/summary/${plat.id}`} className="btn btn-mid-level">
                                        Summary
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-offset-1">
                                <p className="col-sm-4 col-xs-6">Expansion Area: {plat.expansion_area}</p>
                                <p className="col-sm-4 col-xs-6">Plat Type: {plat.plat_type_display}</p>
                                <p className="col-sm-4 col-xs-6">Unit: {plat.unit}</p>
                                <p className="col-sm-4 col-xs-6">Section: {plat.section}</p>
                                <p className="col-sm-4 col-xs-6">Block: {plat.block}</p>
                                <p className="col-sm-4 col-xs-6">Slide: {plat.slide}</p>
                            </div>
                        </div>
                    </div>
                );
            })(plats)
        ) : null;

        return (
            <div className="plat-existing">
                <Navbar />

                <div className="form-header">
                    <div className="container">
                        <div className="col-sm-8">
                            <h1>PLATS - EXISTING</h1>
                        </div>
                        {currentUser && currentUser.permissions && currentUser.permissions.plat &&
                            <div className="col-sm-2 col-sm-offset-1">
                                <Link to={'plat/form/'} className="btn btn-top-level" >
                                    Create
                                </Link>
                            </div>
                        }
                    </div>
                </div>

                <Breadcrumbs route={this.props.route} />

                <div className="row search-box">
                    <form onChange={onPlatQuery('query')} className="col-sm-10 col-sm-offset-1" >
                        <fieldset>
                            <div className="col-sm-2 col-xs-12">
                                <label htmlFor="query" className="form-label">Search</label>
                            </div>
                            <div className="col-sm-10 col-xs-12">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search Plats"
                                />
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="inside-body">
                    <div className="container">
                        {plats_list}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        plats: state.plats,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onComponentDidMount() {
            dispatch(getPlats());
        },
        onPlatQuery(field) {
            return (e, ...args) => {
                const value = typeof e.target.value !== 'undefined' ? e.target.value : args[1];
                const update = {
                    [field]: value,
                };
                dispatch(formUpdate(update));
                dispatch(getPlatQuery());
            };
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlatExisting);

