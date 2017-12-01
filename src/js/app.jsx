import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  render() {
    return (
      <div className='container'>
        {
          <div className="top">

            <div className="row my-3">
              <div className="col-3"></div>
              <h1 className="title col-9">Mortgage Calculator</h1>
            </div>

            <div className="row my-3">
              <p className="col-md-3 text-center text-md-right my-2"><b>Loan Balance</b></p>
              <input type="number" className="col-md-8"></input>
            </div>

            <div className="row my-3">
              <p className="col-md-3 text-center text-md-right my-2"><b>Interest Rate (%)</b></p>
              <input type="number" className="col-md-8"></input>
            </div>

            <div className="row my-3">
              <p className="col-md-3 text-center text-md-right my-2"><b>Loan Term (years)</b></p>
              <select className="col-md-8">
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
            </div>

            <div className="row my-3">
              <div className="col-3"></div>
              <button className="btn btn-primary col-2" type="button">Calculate</button>
              <div className="col-7"></div>
            </div>

          </div>
        }
      </div>
    );
  }
}
