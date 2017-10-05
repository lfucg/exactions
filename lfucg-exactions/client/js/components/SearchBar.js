import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import {
    searchQuery,
    getPagination,
} from '../actions/apiActions';

import {
    formUpdate,
    formReset,
} from '../actions/formActions';

class SearchBar extends React.Component {
    componentDidMount() {
        this.props.onComponentDidMount({
            apiCalls: this.props.apiCalls,
            advancedSearch: this.props.advancedSearch,
        });
    }

    render() {
        const {
            onQuery,
            activeForm,
            onFilter,
            advancedSearchPopulation,
            clearFilters,
        } = this.props;

        const advancedSearchDropdowns = this.props && this.props.advancedSearch &&
            (map((field) => {
                return (
                    <div className="col-sm-6 form-group" key={field.filterField}>
                        <div className="col-sm-4 col-xs-12">
                            <label htmlFor={field.filterField} className="form-label">{field.displayName}</label>
                        </div>
                        <div className="col-sm-8 col-xs-12">
                            <select
                              className="form-control dropdownFilters"
                              onChange={() => onFilter(this[field.displayName])}
                              ref={(input) => { this[field.displayName] = input; }}
                              name={field.filterField}
                            >
                                <option value="">
                                    Select {field.displayName}
                                </option>
                                {map((option_item) => {
                                    return (
                                        <option key={`${option_item.id}_${option_item.name}`} value={option_item.id} >
                                            {option_item.name}
                                        </option>
                                    );
                                })(field.list)}
                            </select>
                        </div>
                    </div>
                );
            })(this.props.advancedSearch));

        return (
            <div>
                <div className="row search-box">
                    <form onChange={onQuery('filter_search')} className="col-sm-10 col-sm-offset-1" >
                        <fieldset>
                            <div className="col-sm-2 col-xs-12">
                                <label htmlFor="query" className="form-label">Search</label>
                            </div>
                            <div className="col-sm-10 col-xs-12">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter search..."
                                  id="query"
                                />
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div>
                    <a
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#AdvancedSearch"
                      aria-expanded="false"
                      aria-controls="AdvancedSearch"
                      id="searchAccordionControl"
                    >
                        {activeForm.filterToggle ? (
                            <div className="row" role="tab" id="headingAdvancedSearch" >
                                <div className="col-xs-10 col-xs-offset-1 text-center">
                                    <button className="btn btn-link" onClick={clearFilters}>Clear All Search Filters</button>
                                </div>
                            </div>
                            ) : (
                                <div className="row" role="tab" id="headingAdvancedSearch" >
                                    <div className="col-xs-10 col-xs-offset-1 text-center">
                                        <button className="btn btn-link" onClick={advancedSearchPopulation}>Advanced Search</button>
                                    </div>
                                </div>
                            )
                        }
                    </a>
                    <div
                      id="AdvancedSearch"
                      className="collapse row"
                      aria-labelledby="#headingAdvancedSearch"
                    >
                        <div className="col-xs-12 text-center">
                            <div className="row">
                                {advancedSearchDropdowns}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onComponentDidMount: PropTypes.func,
    onQuery: PropTypes.func,
    activeForm: PropTypes.object,
    onFilter: PropTypes.func,
    clearFilters: PropTypes.func,
    advancedSearchPopulation: PropTypes.func,
    apiCalls: PropTypes.array,
    advancedSearch: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        activeForm: state.activeForm,
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        onComponentDidMount() {
            dispatch(formUpdate({ filterToggle: false }));
        },
        onQuery(field) {
            return (e, ...args) => {
                const value = typeof e.target.value !== 'undefined' ? e.target.value : args[1];
                const update = {
                    [field]: value,
                };
                dispatch(formUpdate(update));
                dispatch(searchQuery());
            };
        },
        onFilter(field) {
            const update = {
                [field.name]: field.value,
            };
            dispatch(formUpdate(update));
            dispatch(searchQuery());
        },
        advancedSearchPopulation() {
            dispatch(formUpdate({ filterToggle: true }));
            (map((apiFunction) => {
                dispatch(apiFunction());
            })(props.apiCalls));
        },
        clearFilters() {
            dispatch(formReset());
            dispatch(formUpdate({ filterToggle: false }));
            dispatch(getPagination());
            document.getElementById('query').value = '';
            const dropdowns = document.getElementsByClassName('dropdownFilters');
            (map((dropdown) => {
                dropdown.selectedIndex = 0;
            })(dropdowns));
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);