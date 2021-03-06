import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { map } from 'ramda';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import Notes from './Notes';
import Uploads from './Uploads';

import FormGroup from './FormGroup';
import DeclineDelete from './DeclineDelete';
import PlatZoneForm from './PlatZoneForm';
import PlatZoneDuesForm from './PlatZoneDuesForm';
import LoadingScreen from './LoadingScreen';

import { setLoadingFalse } from '../actions/stateActions';
import {
    formInit,
    formUpdate,
} from '../actions/formActions';

import {
    getSubdivisionsQuick,
    getSubdivisionID,
    getPlatID,
    postPlat,
    putPlat,
    getAccountsQuick,
    getAccountID,
} from '../actions/apiActions';

class PlatForm extends React.Component {
    componentDidMount() {
        this.props.onComponentDidMount();
    }

    render() {
        const {
            activeForm,
            subdivisions,
            plats,
            accounts,
            formChange,
            onPlatSubmit,
            onPlatAndCreateLot,
            addAnotherPlatZone,
            onPlatDues,
            selectedPlat,
            currentUser,
        } = this.props;

        const currentParam = this.props.params.id;

        const subdivisionsList = !!subdivisions && subdivisions.length > 0 &&
            (map((single_subdivision) => {
                return (
                    <option key={single_subdivision.id} value={[single_subdivision.id, single_subdivision.name]} >
                        {single_subdivision.name}
                    </option>
                );
            })(subdivisions));

        const accountsList = !!accounts && accounts.length > 0 &&
            (map((single_account) => {
                return (
                    <option key={single_account.id} value={[single_account.id, single_account.account_name]} >
                        {single_account.account_name}
                    </option>
                );
            })(accounts));

        const platZonesList = !!plats && plats.currentPlat && plats.currentPlat.plat_zone &&
            (map((single_plat_zone) => {
                return (
                    <div key={single_plat_zone.id} >
                        <PlatZoneForm
                          props={this.props}
                          acre_id={`${single_plat_zone.id}_acres`}
                          acre_value={single_plat_zone.cleaned_acres}
                          zone_id={`${single_plat_zone.id}_zone`}
                          zone_value={single_plat_zone.zone}
                          plat_zone_id={`${single_plat_zone.id}_plat_zone`}
                          plat_zone_value={single_plat_zone.id}
                        />
                    </div>
                );
            })(plats.currentPlat.plat_zone));

        const sortedPlatZones = !!plats && plats.currentPlat && plats.currentPlat.plat_zone && plats.currentPlat.plat_zone.sort((a, b) => {
            if (a.zone < b.zone) {
                return -1;
            } else if (a.zone > b.zone) {
                return 1;
            }
            return 0;
        });

        const platZoneDuesList = !!plats && !!plats.currentPlat && !!plats.currentPlat.plat_zone &&
            (map((single_plat_zone) => {
                return (
                    <div key={single_plat_zone.id} >
                        <div className={plats.currentPlat.plat_zone.length < 1 ? 'col-xs-6' : 'col-xs-4'}>
                            <PlatZoneDuesForm
                              props={this.props}
                              plat_zone_id={`${single_plat_zone.id}_plat_zone`}
                              plat_zone_value={single_plat_zone.id}
                              zone_id={`${single_plat_zone.id}_zone`}
                              zone_value={single_plat_zone.zone}
                              acre_id={`${single_plat_zone.id}_acres`}
                              acre_value={single_plat_zone.cleaned_acres}
                              dues_roads_id={`${single_plat_zone.id}_dues_roads`}
                              dues_roads_value={single_plat_zone.dues_roads}
                              dues_open_spaces_id={`${single_plat_zone.id}_dues_open_spaces`}
                              dues_open_spaces_value={single_plat_zone.dues_open_spaces}
                              dues_sewer_cap_id={`${single_plat_zone.id}_dues_sewer_cap`}
                              dues_sewer_cap_value={single_plat_zone.dues_sewer_cap}
                              dues_sewer_trans_id={`${single_plat_zone.id}_dues_sewer_trans`}
                              dues_sewer_trans_value={single_plat_zone.dues_sewer_trans}
                              dues_parks_id={`${single_plat_zone.id}_dues_parks`}
                              dues_parks_value={single_plat_zone.dues_parks}
                              dues_storm_water_id={`${single_plat_zone.id}_dues_storm_water`}
                              dues_storm_water_value={single_plat_zone.dues_storm_water}
                            />
                        </div>
                    </div>
                );
            })(sortedPlatZones));

        const submitEnabled =
            activeForm.total_acreage &&
            activeForm.plat_type &&
            activeForm.expansion_area &&
            activeForm.buildable_lots &&
            activeForm.non_buildable_lots &&
            activeForm.date_recorded &&
            activeForm.cabinet &&
            activeForm.slide;

        return (
            <div className="plat-form">
                <Navbar />

                <div className="form-header">
                    <div className="container">
                        <h1>PLATS - CREATE / APPLY</h1>
                    </div>
                </div>

                <Breadcrumbs route={this.props.route} parent_link={'plat'} parent_name={'Plats'} />

                <div className="inside-body">
                    <div className="container">
                        {plats.loadingPlat  ? <LoadingScreen /> :
                        (
                            <div className="col-md-offset-1 col-md-10 panel-group" id="accordion" role="tablist" aria-multiselectable="false">
                                {currentParam && plats.currentPlat && plats.currentPlat.is_approved === false && <div className="row"><h1 className="approval-pending">Approval Pending</h1></div>}
                                <a
                                  role="button"
                                  data-toggle="collapse"
                                  data-parent="#accordion"
                                  href="#collapseGeneralPlat"
                                  aria-expanded="false"
                                  aria-controls="collapseGeneralPlat"
                                >
                                    <div className="row section-heading" role="tab" id="headingPlat">
                                        <div className="col-xs-1 caret-indicator" />
                                        <div className="col-xs-10">
                                            <h3>General Plat Information</h3>
                                        </div>
                                    </div>
                                </a>
                                <div
                                  id="collapseGeneralPlat"
                                  className={activeForm.first_section ? 'panel-collapse collapse row' : 'panel-collapse row'}
                                  role="tabpanel"
                                  aria-labelledby="#headingPlat"
                                >
                                    <div className="panel-body">
                                        <form className="col-xs-12">

                                            <fieldset>
                                                <div className="row form-subheading">
                                                    <h3>Developer Account</h3>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6 form-group">
                                                        <label htmlFor="account" className="form-label" id="account" aria-label="Developer Account">Developer Account</label>
                                                        <select
                                                            className="form-control"
                                                            id="account"
                                                            onChange={formChange('account')}
                                                            value={activeForm.account_show || 'start_account'}
                                                        >
                                                            <option value="start_account">Developer Account</option>
                                                            {accountsList}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row form-subheading">
                                                    <h3>Location</h3>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6 form-group">
                                                        <label htmlFor="subdivision" className="form-label" id="subdivision" aria-label="Subdivision" >Subdivision</label>
                                                        <select
                                                            className="form-control"
                                                            id="subdivision"
                                                            onChange={formChange('subdivision')}
                                                            value={activeForm.subdivision_show || 'start_subdivision'}
                                                        >
                                                            <option value="start_subdivision">Subdivision</option>
                                                            {subdivisionsList}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <FormGroup label="Latitude" id="latitude">
                                                            <input type="text" className="form-control" placeholder="Latitude" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <FormGroup label="Longitude" id="longitude">
                                                            <input type="text" className="form-control" placeholder="Longitude" />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="row form-subheading">
                                                    <h3>Land Attributes</h3>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6 form-group">
                                                        <label htmlFor="expansion_area" className="form-label" id="expansion_area" >
                                                            * Expansion Area
                                                        </label>
                                                        <select
                                                          className="form-control"
                                                          id="expansion_area"
                                                          onChange={formChange('expansion_area')}
                                                          value={activeForm.expansion_area_show || ''}
                                                          aria-required="true"
                                                          aria-label="* Expansion Area"
                                                          required
                                                        >
                                                            <option value="">* Expansion Area</option>
                                                            <option value={['EA-1', 'EA-1']}>EA-1</option>
                                                            <option value={['EA-2A', 'EA-2A']}>EA-2A</option>
                                                            <option value={['EA-2B', 'EA-2B']}>EA-2B</option>
                                                            <option value={['EA-2C', 'EA-2C']}>EA-2C</option>
                                                            <option value={['EA-3', 'EA-3']}>EA-3</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <FormGroup label="* Gross Acreage" id="total_acreage" ariaRequired="true">
                                                            <input
                                                              type="number"
                                                              step="0.01"
                                                              className="form-control"
                                                              placeholder="* Gross Acreage"
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <FormGroup label="* Buildable Lots" id="buildable_lots" ariaRequired="true">
                                                            <input type="number" className="form-control" placeholder="Buildable Lots" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <FormGroup label="* Non-Buildable Lots" id="non_buildable_lots" ariaRequired="true">
                                                            <input type="number" className="form-control" placeholder="Non-Buildable Lots" />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="row form-subheading">
                                                    <h3>Additional Plat Details</h3>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <FormGroup label="* Name" id="name" ariaRequired="true">
                                                            <input type="text" className="form-control" placeholder="Name" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <FormGroup label="* Date Recorded" id="date_recorded">
                                                            <input type="date" className="form-control" placeholder="Use YYYY-MM-DD Format for Date" />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <FormGroup label="* Cabinet" id="cabinet">
                                                            <input type="text" className="form-control" placeholder="Cabinet" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <FormGroup label="* Slide" id="slide">
                                                            <input type="text" className="form-control" placeholder="Slide" />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6 form-group">
                                                        <label htmlFor="plat_type" className="form-label" id="plat_type" aria-label="Plat Type" aria-required="true">* Plat Type</label>
                                                        <select
                                                            className="form-control"
                                                            id="plat_type"
                                                            onChange={formChange('plat_type')}
                                                            value={activeForm.plat_type_show || 'start_plat_type'}
                                                        >
                                                            <option value="start_plat_type">Plat Type</option>
                                                            <option value={['PLAT', 'Final Record Plat']}>Final Record Plat</option>
                                                            <option value={['DEVELOPMENT_PLAN', 'Final Development Plan']}>Final Development Plan</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <FormGroup label="Section" id="section">
                                                            <input type="text" className="form-control" placeholder="Section" />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <FormGroup label="Unit" id="unit">
                                                            <input type="text" className="form-control" placeholder="Unit" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <FormGroup label="Block" id="block">
                                                            <input type="text" className="form-control" placeholder="Block" />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <div className="col-xs-8">
                                                <button disabled={!submitEnabled} className="btn btn-lex" onClick={onPlatSubmit} >
                                                    {currentUser.is_superuser || (currentUser.profile && currentUser.profile.is_supervisor) ? <div>Submit / Approve</div> : <div>Submit</div>}
                                                </button>
                                                {!submitEnabled ? (
                                                    <div>
                                                        <div className="clearfix" />
                                                        <span> * All required fields must be filled.</span>
                                                    </div>
                                                ) : null
                                                }
                                            </div>
                                            <div className="col-xs-4">
                                                <DeclineDelete currentForm="/plat/" selectedEntry={selectedPlat} parentRoute="plat" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                { activeForm.first_section ? (
                                    <div>
                                        { activeForm.zone_section ? (
                                            <div>
                                                <a
                                                  role="button"
                                                  data-toggle="collapse"
                                                  data-parent="#accordion"
                                                  href="#collapsePlatZones"
                                                  aria-expanded="false"
                                                  aria-controls="collapsePlatZones"
                                                >
                                                    <div className="row section-heading" role="tab" id="headingPlatZone">
                                                        <div className="col-xs-1 caret-indicator" />
                                                        <div className="col-sm-10">
                                                            <h3>Plat Zones</h3>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div
                                                  id="collapsePlatZones"
                                                  className="panel-collapse collapse row"
                                                  role="tabpanel"
                                                  aria-labelledby="#headingPlatZone"
                                                >
                                                    <div className="panel-body">
                                                        <div className="col-xs-12">
                                                            { platZonesList }
                                                        </div>
                                                        { plats && plats.currentPlat && plats.currentPlat.plat_zone && plats.currentPlat.plat_zone.length > 0 ?
                                                            <div className="col-xs-12">
                                                                <button className="btn btn-lex" onClick={addAnotherPlatZone} >Add Another Plat Zone</button>
                                                            </div>
                                                        : null}
                                                        { activeForm.add_another_plat_zone &&
                                                            <div className="col-xs-12">
                                                                <PlatZoneForm
                                                                  props={this.props}
                                                                  acre_id="acres"
                                                                  zone_id="zone"
                                                                />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <a
                                                  role="button"
                                                  data-toggle="collapse"
                                                  data-parent="#accordion"
                                                  href="#collapsePlatExactions"
                                                  aria-expanded="true"
                                                  aria-controls="collapsePlatExactions"
                                                >
                                                    <div className="row section-heading" role="tab" id="headingPlatExactions">
                                                        <div className="col-xs-1 caret-indicator" />
                                                        <div className="col-xs-10">
                                                            <h3>Plat Exactions</h3>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div
                                                  id="collapsePlatExactions"
                                                  className="panel-collapse collapse in row"
                                                  role="tabpanel"
                                                  aria-labelledby="#headingPlatExactions"
                                                >
                                                    <div className="panel-body">
                                                        <div className="col-xs-12">
                                                            <form >
                                                                <fieldset>
                                                                    <div className="row form-subheading">
                                                                        <h3>Exactions and Calculations</h3>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-xs-3">
                                                                            <div className="col-xs-12 dues-table-heading">
                                                                                <h3>Zone</h3>
                                                                            </div>
                                                                            <div className="col-xs-12 dues-label">
                                                                                <h4>Gross Acreage</h4>
                                                                            </div>
                                                                            <div className="col-xs-12 dues-label">
                                                                                <h4>Roads</h4>
                                                                            </div>
                                                                            <div className="col-xs-12 dues-label">
                                                                                <h4>Open Space</h4>
                                                                            </div>
                                                                            <div className="col-xs-12 dues-label">
                                                                                <h4>Sewer Capacity</h4>
                                                                            </div>
                                                                            <div className="col-xs-12 dues-label">
                                                                                <h4>Sewer Transmmission</h4>
                                                                            </div>
                                                                            <div className="col-xs-12 dues-label">
                                                                                <h4>Parks</h4>
                                                                            </div>
                                                                            <div className="col-xs-12 dues-label">
                                                                                <h4>Storm Water</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xs-9">
                                                                            {platZoneDuesList}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xs-12 dues-table-heading"><h3>Plat Exactions</h3></div>
                                                                    <div className="row">
                                                                        <div className="col-xs-12">
                                                                            <div className="col-sm-6">
                                                                                <div className="form-group">
                                                                                    <div className="row">
                                                                                        <label className="form-label">Sewer Exactions</label>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <label className="form-label col-sm-4 col-sm-offset-1">{plats.currentPlat && plats.currentPlat.sewer_due}</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-6">
                                                                                <div className="form-group">
                                                                                    <div className="row">
                                                                                        <label className="form-label">Non-Sewer Exactions</label>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <label className="form-label col-sm-4 col-sm-offset-1">{plats.currentPlat && plats.currentPlat.non_sewer_due}</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="row">
                                                                        <div className="col-xs-12">
                                                                            <FormGroup label="Calculation Notes" id="calculation_note">
                                                                                <textarea type="text" className="form-control" placeholder="Calculation Notes" rows="4" />
                                                                            </FormGroup>
                                                                        </div>
                                                                    </div> */}
                                                                </fieldset>
                                                                <div className="col-xs-offset-2 col-xs-4">
                                                                    <button className="btn btn-lex" onClick={onPlatSubmit}>Submit Exactions</button>
                                                                </div>
                                                                <div className="col-xs-offset-1 col-xs-4">
                                                                    <button className="btn btn-lex" onClick={onPlatAndCreateLot} >Submit and Create Lot</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="row section-heading">
                                                    <h3>Plat Zone</h3>
                                                </div>
                                                <PlatZoneForm
                                                  props={this.props}
                                                  acre_id="acres"
                                                  zone_id="zone"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : null }
                                {plats && plats.currentPlat && plats.currentPlat.id &&
                                    <Notes
                                      content_type="plats_plat"
                                      object_id={plats.currentPlat.id}
                                      ariaExpanded="true"
                                      panelClass="panel-collapse collapse row in"
                                      permission="plat"
                                    />
                                }
                                {plats && plats.currentPlat && plats.currentPlat.id &&
                                    <Uploads
                                      file_content_type="plats_plat"
                                      file_object_id={plats.currentPlat.id}
                                      ariaExpanded="true"
                                      panelClass="panel-collapse collapse row in"
                                      permission="plat"
                                    />
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

PlatForm.propTypes = {
    activeForm: PropTypes.object,
    subdivisions: PropTypes.array,
    plats: PropTypes.object,
    accounts: PropTypes.array,
    route: PropTypes.object,
    params: PropTypes.object,
    onComponentDidMount: PropTypes.func,
    formChange: PropTypes.func,
    onPlatSubmit: PropTypes.func,
    onPlatAndCreateLot: PropTypes.func,
    addAnotherPlatZone: PropTypes.func,
    onPlatDues: PropTypes.func,
    selectedPlat: PropTypes.string,
    currentUser: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        activeForm: state.activeForm,
        subdivisions: state.subdivisions && state.subdivisions.subdivisions,
        plats: state.plats,
        accounts: state.accounts && state.accounts.accounts,
        currentUser: state.currentUser,
    };
}

function mapDispatchToProps(dispatch, params) {
    const selectedPlat = params.params.id;

    return {
        onComponentDidMount() {
            dispatch(formInit());
            const else_update = {
                first_section: false,
                add_another_plat_zone: false,
                loading: true,
            };
            dispatch(formUpdate(else_update));
            dispatch(getSubdivisionsQuick());
            dispatch(getAccountsQuick());
            if (selectedPlat) {
                dispatch(getPlatID(selectedPlat))
                .then((data_plat) => {
                    if (data_plat.response.subdivision) {
                        dispatch(getSubdivisionID(data_plat.response.subdivision.id))
                        .then((data_sub_id) => {
                            const sub_update = {
                                subdivision: data_sub_id.response.id,
                                subdivision_show: `${data_sub_id.response.id},${data_sub_id.response.name}`,
                            };
                            dispatch(formUpdate(sub_update));
                            dispatch(getSubdivisionsQuick())
                            ;
                        });
                    }
                    if (data_plat.response.account) {
                        dispatch(getAccountID(data_plat.response.account))
                        .then((data_account) => {
                            const update_account = {
                                account: data_account.response.id,
                                account_show: `${data_account.response.id},${data_account.response.account_name}`,
                            };
                            dispatch(formUpdate(update_account));
                            dispatch(getAccountsQuick());
                        });
                    }
                    if (data_plat.response.plat_zone && data_plat.response.plat_zone.length === 0) {
                        const zone_update = {
                            acres: data_plat.response.cleaned_total_acreage,
                        };
                        dispatch(formUpdate(zone_update));
                    }
                    if (data_plat.response.plat_zone && data_plat.response.plat_zone.length > 0) {
                        const zones_exist_update = {
                            zone_section: true,
                        };
                        dispatch(formUpdate(zones_exist_update));
                    }
                    const update = {
                        add_another_plat_zone: false,
                        block: data_plat.response.block,
                        buildable_lots: data_plat.response.buildable_lots,
                        cabinet: data_plat.response.cabinet,
                        // calculation_note: data_plat.response.calculation_note,
                        date_recorded: data_plat.response.date_recorded,
                        expansion_area: data_plat.response.expansion_area,
                        expansion_area_show: `${data_plat.response.expansion_area},${data_plat.response.expansion_area}`,
                        first_section: true,
                        latitude: data_plat.response.latitude,
                        longitude: data_plat.response.longitude,
                        name: data_plat.response.name,
                        non_buildable_lots: data_plat.response.non_buildable_lots,
                        non_sewer_due: data_plat.response.non_sewer_due_float,
                        plat: data_plat.response.id,
                        plat_show: `${data_plat.response.id},${data_plat.response.name}`,
                        plat_name: data_plat.response.name,
                        plat_type: data_plat.response.plat_type,
                        plat_type_show: `${data_plat.response.plat_type},${data_plat.response.plat_type_display}`,
                        section: data_plat.response.section,
                        sewer_due: data_plat.response.sewer_due_float,
                        slide: data_plat.response.slide,
                        subdivision: data_plat.response.subdivision,
                        total_acreage: data_plat.response.cleaned_total_acreage,
                        unit: data_plat.response.unit,
                        loading: false,
                    };
                    dispatch(formUpdate(update));
                });
            } else {
                dispatch(setLoadingFalse('plat'));
                const initial_constants = {
                    subdivision_show: '',
                    account_show: '',
                    expansion_area_show: '',
                    plat_type_show: '',
                    loading: false,
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
        onPlatSubmit(event) {
            event.preventDefault();
            if (selectedPlat) {
                dispatch(putPlat(selectedPlat))
                .then((data) => {
                    if (data.response) {
                        hashHistory.push(`plat/summary/${selectedPlat}`);
                    }
                });
            } else {
                dispatch(postPlat())
                .then((data_post) => {
                    if (data_post.response) {
                        const zone_update = {
                            plat: data_post.response.id,
                            plat_name: data_post.response.name,
                            acres: data_post.response.total_acreage,
                            first_section: true,
                            plat_show: `${data_post.response.id},${data_post.response.name}`,
                        };
                        dispatch(formUpdate(zone_update));
                        hashHistory.push(`plat/form/${data_post.response.id}`);
                    }
                });
            }
        },
        addAnotherPlatZone(event) {
            event.preventDefault();
            const update = {
                add_another_plat_zone: true,
            };
            dispatch(formUpdate(update));
        },
        onPlatDues() {
            if (selectedPlat) {
                dispatch(putPlat(selectedPlat));
            }
        },
        onPlatAndCreateLot() {
            if (selectedPlat) {
                dispatch(putPlat(selectedPlat))
                .then((data) => {
                    if (data.response) {
                        hashHistory.push(`plat/${selectedPlat}/lot/form`);
                    }
                });
            }
        },
        selectedPlat,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatForm);

