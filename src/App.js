import React, { Component } from 'react';
import './App.css';
import { TwitterShareButton, TwitterIcon } from "react-share";
export default class App extends Component {

  state = {
    wit: {
      sayings:'',
      film:''
    },
    loading: false
  }

  componentDidMount() {
    this.fetchSaying();
  }
  fetchNewSayings = () => {
    this.setState({ loading: true })
    this.fetchSaying();
  }
  fetchSaying = () => {
    fetch('https://randomriffs.herokuapp.com/api/random', { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((wit) => {
        this.setState({ wit, loading: false })
      })
      .catch(function (error) {
        console.log('Request failed', error)
      });
  }
  render() {
    return (
      <div className='container'>
        <div className={this.state.loading ? '' : 'activeFadeIn'}>
          <h3>{this.state.wit.sayings.charAt(0).toUpperCase() + this.state.wit.sayings.slice(1)}</h3>
          <p>{this.state.wit.film.replace(/-/g, ' ')} </p>
        </div>
        <div className="fixed-bottom">
          <div className='share'>
            <TwitterShareButton
              url={'.'}
              title={this.state.wit.sayings}
              className="twitter-share-btn"
            >
              <TwitterIcon size={32} round className='twt-icon' />
            </TwitterShareButton>
            <button className='fetch-button' onClick={this.fetchNewSayings}>
              {this.state.loading ?
                '.....' :
                'Fetch'}
            </button>
          </div>

        </div>
      </div>
    )
  }
}
