import React, { Component } from 'react';
import loading from './img/loading.gif';
export default class Loading extends Component {
  render() {
    return (
      <div className='text-center' >
        <img src={loading} alt="Loading"/>
      </div>
    )
  }
}
