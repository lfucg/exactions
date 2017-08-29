import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

import {
    getProjectCostID,
} from '../actions/apiActions';

class ProjectCostSummary extends React.Component {
    static propTypes = {
        currentUser: React.PropTypes.object,
        projectCosts: React.PropTypes.object,
        route: React.PropTypes.object,
        onComponentDidMount: React.PropTypes.func,
    };

    componentDidMount() {
        this.props.onComponentDidMount();
    }

    render() {
        const {
            currentUser,
            projectCosts,
        } = this.props;

        return (
            <div className="project-cost-summary">
                <Navbar />

                <div className="form-header">
                    <div className="container">
                        <h1>PROJECT COST - SUMMARY</h1>
                    </div>
                </div>

                <Breadcrumbs route={this.props.route} parent_link={'project-cost'} parent_name={'Project Costs'} />

                <div className="inside-body">
                    <div className="container">
                        <div className="col-md-offset-1 col-md-10 panel-group" id="accordion" role="tablist" aria-multiselectable="false">
                            <a
                              role="button"
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseProjectCostInfo"
                              aria-expanded="false"
                              aria-controls="collapseProjectCostInfo"
                            >
                                <div className="row section-heading" role="tab" id="headingProjectCostInfo">
                                    <div className="col-xs-1 caret-indicator" />
                                    <div className="col-xs-10">
                                        <h2>Project Cost Information</h2>
                                    </div>
                                </div>
                            </a>
                            <div
                              id="collapseProjectCostInfo"
                              className="panel-collapse collapse row"
                              role="tabpanel"
                              aria-labelledby="#headingProjectCostInfo"
                            >
                                <div className="panel-body">
                                    <div className="col-xs-12">
                                        <p className="col-md-3 col-sm-4 col-xs-6">Estimate Type: {projectCosts.estimate_type}</p>
                                        <p className="col-md-3 col-sm-4 col-xs-6">Total Costs: ${projectCosts.total_costs}</p>
                                        <p className="col-md-3 col-sm-4 col-xs-6 ">Credits Available: ${projectCosts.credits_available}</p>
                                        <p className="col-md-3 col-sm-4 col-xs-6">Land Cost: ${projectCosts.land_cost}</p>
                                        <p className="col-md-3 col-sm-4 col-xs-6">Design Cost: ${projectCosts.design_cost}</p>
                                        <p className="col-md-3 col-sm-4 col-xs-6">Construction Cost: ${projectCosts.construction_cost}</p>
                                        <p className="col-md-3 col-sm-4 col-xs-6">Administrative Cost: ${projectCosts.admin_cost}</p>
                                        <p className="col-md-3 col-sm-4 col-xs-6">Management Cost: ${projectCosts.management_cost}</p>
                                    </div>
                                    {currentUser && currentUser.permissions && currentUser.permissions.projectcost &&
                                        <div className="col-md-offset-11 col-sm-offset-10 col-xs-offset-8">
                                            <Link to={`project-cost/form/${projectCosts.id}`} role="link" >
                                                <h4>Edit</h4>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>

                            {projectCosts.project_id ? <div>
                                <a
                                  role="button"
                                  data-toggle="collapse"
                                  data-parent="#accordion"
                                  href="#collapseProjectInfo"
                                  aria-expanded="false"
                                  aria-controls="collapseProjectInfo"
                                >
                                    <div className="row section-heading" role="tab" id="headingProjectInfo">
                                        <div className="col-xs-1 caret-indicator" />
                                        <div className="col-xs-10">
                                            <h2>Project</h2>
                                        </div>
                                    </div>
                                </a>
                                <div
                                  id="collapseProjectInfo"
                                  className="panel-collapse collapse row"
                                  role="tabpanel"
                                  aria-labelledby="#headingProjectInfo"
                                >
                                    <div className="panel-body">
                                        <div className="col-xs-12">
                                            <p className="col-sm-4 col-xs-6">Project Category: {projectCosts.project_id.project_category_display}</p>
                                            <p className="col-sm-4 col-xs-6">Project Type: {projectCosts.project_id.project_type_display}</p>
                                            <p className="col-sm-4 col-xs-6">Expansion Area: {projectCosts.project_id.expansion_area}</p>
                                            <p className="col-sm-4 col-xs-6 ">Project Status: {projectCosts.project_id.project_status_display}</p>
                                            <p className="col-sm-4 col-xs-6 ">Status Date: {projectCosts.project_id.status_date}</p>
                                            <p className="col-xs-12">Project Description: {projectCosts.project_id.project_description}</p>
                                        </div>
                                        <div className="col-md-offset-8 col-sm-offset-6">
                                            <div className="col-xs-6">
                                                {currentUser && currentUser.permissions && currentUser.permissions.project &&
                                                    <Link to={`project/form/${projectCosts.project_id.id}`} role="link" >
                                                        <h4>Edit</h4>
                                                    </Link>
                                                }
                                            </div>
                                            <div className="col-xs-6">
                                                <Link to={`project/summary/${projectCosts.project_id.id}`} role="link" >
                                                    <h4>Summary</h4>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <div className="row section-heading" role="tab" id="headingProjectInfo">
                                <h2>Project - None</h2>
                            </div>}
                        </div>
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
        projectCosts: state.projectCosts,
    };
}

function mapDispatchToProps(dispatch, params) {
    const selectedProjectCost = params.params.id;

    return {
        onComponentDidMount() {
            dispatch(getProjectCostID(selectedProjectCost));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCostSummary);

