'use strict';

import React from 'react';

export default class Privacy extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<h1>Privacy Policy</h1>
						<p>This privacy policy outlines how information collected through our site is both used and protected. Information which we request from users, or information that is made available to us will be used with accordance to this policy.</p>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-10 col-sm-offset-1">
						<div className="row">
							<div className="col-xs-12 col-md-6">
								<h3>Information Collected</h3>
								<p>You will never be asked to provide any of your personal information to access our services.</p>
								<p>We only collect your steam profile ID and the name of your account to enhance data shown on the website.</p>
							</div>
							<div className="col-xs-12 col-md-6">
								<h3>Use of Non-Personal Information</h3>
								<p>We also collect non-personal information whenever you interact with our service. Non-personal identification information may include another profile of a user you maybe searching. This information is to enhance the service and cannot ber linked directly back to you.</p>
							</div>
							<div className="clearfix" />
							<div className="col-xs-12 col-md-6">
								<h3>Cookies</h3>
								<p>Our website may use "cookies" to enhance your experience. Your web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the website may not function properly.</p>
							</div>
							<div className="col-xs-12 col-md-6">
								<h3>Data Protection</h3>
								<p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal account on the website.</p>
							</div>
							<div className="clearfix" />
							<div className="col-xs-12 col-md-6">
								<h3>Sharing Information</h3>
								<p>We do not sell, trade, or rent any personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers.</p>
							</div>
							<div className="col-xs-12 col-md-6">
								<h3>Changes to Our Privacy Policy</h3>
								<p>We may update our Privacy Policy from time to time. We will revise the updated date at the bottom of this page.</p>
							</div>
							<div className="clearfix" />
							<div className="col-xs-12 col-md-6">
								<h3>Your Consent</h3>
								<p>By using our site, you consent to our privacy policy.</p>
							</div>
						</div>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-xs-12">
						<p className="text-muted text-right"><i>This policy was last modified on March 20, 2014.</i></p>
					</div>
				</div>
			</div>
		);
	}
}
