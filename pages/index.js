import React, { Component } from "react";
import Page from "../components/page";
import Link from 'next/link';

import { bindActionCreators } from "redux"
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux/store";


import { ReposLoad } from "../redux/modules/highlights";

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query : "javascript"
    }
  }

  componentWillMount() {
    const { ReposLoad } = this.props;

    ReposLoad(this.state.query);
  }

  handleQueryChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  handleOnClick() {
    const { ReposLoad } = this.props;

    ReposLoad(this.state.query);
  }

  render() {

  const { repos_loaded, repos_loading, repos } = this.props;
  const { query } = this.state;

    return (
      <Page>
        <div className="row">
          <div className="twelve columns">
            {
              repos_loading ?
                <p>Fetching data from Github...</p>
                :
                null
            }
            {
              repos_loaded ?
                <p>Data fetched from Github!</p>
                :
                null
            }
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <div>
              <span>I want to look for </span>

              <input style={{
                height: '38px',
                padding: '6px 10px',
                backgroundColor: '#fff',
                border: '1px solid #D1D1D1',
                borderRadius: '4px',
                boxShadow: 'none',
                boxSizing: 'border-box',
                marginRight: '5px'}} 
                value={query} 
                onChange={this.handleQueryChange.bind(this)}/>

              <button className="button" onClick={this.handleOnClick.bind(this)}>Search!</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>Repository Name</th>
                  <th>Description</th>
                  <th>Owner</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {
                  repos_loaded && repos.items.length > 0 ?
                    repos.items.map(item => {
                      return (
                        <tr key={item.id}>
                          <td><a href={item.homepage}>{item.name}</a></td>
                          <td>{item.description}</td>
                          <td>
                            <img  style={{verticalAlign: 'middle', marginRight: '5px'}} width="32px" src={item.owner.avatar_url}/>
                            <span>{item.owner.login}</span>
                          </td>
                          <td><a href={item.html_url}>Click here!</a></td>
                        </tr>
                      )
                    }) : null
                }
              </tbody>
            </table>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repos: state.highlights.repos,
    repos_loading: state.highlights.repos_loading,
    repos_loaded: state.highlights.repos_loaded,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ReposLoad: bindActionCreators(ReposLoad, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index);