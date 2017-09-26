import React from 'react';
import {
    Link,
} from 'react-router';

import Navbar from './Navbar';
import Footer from './Footer';

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <Navbar />

                <img src={`${global.BASE_STATIC_URL}/lexington-hero-interior.jpg`} role="presentation" className="lex-banner" />
                <div className="inside-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <Link to="subdivision" role="link"><h2 className="in-page-link">Subdivisions</h2></Link>
                                <p>Lexington subdivisions.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <Link to="plat" role="link"><h2 className="in-page-link">Plats</h2></Link>
                                <p>Lexington plats.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <Link to="lot" role="link"><h2 className="in-page-link">Lots</h2></Link>
                                <p>Lexington lots.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <Link to="account" role="link"><h2 className="in-page-link">Developers / Accounts</h2></Link>
                                <p>Developers and associated accounts.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <Link to="agreement" role="link"><h2 className="in-page-link">Agreements</h2></Link>
                                <p>Lexington agreements with based on resolution number or memos.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <Link to="account-ledger" role="link"><h2 className="in-page-link">Credit Transfers</h2></Link>
                                <p>Lexington account ledgers.  Credit transfers, new credit awards, and credit payments.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <Link to="payment" role="link"><h2 className="in-page-link">Payments</h2></Link>
                                <p>Payments by Cash, Check, or Credit Card.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <Link to="project" role="link"><h2 className="in-page-link">Projects</h2></Link>
                                <p>Lexington projects.</p>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <Link to="project-cost" role="link"><h2 className="in-page-link">Project Costs</h2></Link>
                                <p>Lexington project costs.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default (DashboardPage);

