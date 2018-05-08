import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";

class Page extends Component {
	render() {
		return (
			<div className="container">
				<Head>
					<meta charSet='utf-8'/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
					<title>Our awesome next app</title>
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"/>
				</Head>
				
                <div className="row">
                    <div className="twelve columns">
                        <h1>Our awesome next.js app</h1>
                        <h3>With redux!</h3>
                    </div>
                </div>

                { this.props.children }
			</div>
		);
	}
}

export default Page;