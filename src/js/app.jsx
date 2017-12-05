import React from 'react';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      term: "15",
      output: "",
      clicked: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name] : value
    })
  }

  handleFocus(e) {
    e.target.select();
  }

  calculate() {
    let P = this.state.balance;
    let r = this.state.rate / 1200;
    let n = this.state.term * 12;
    let M = (P * ((r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1))).toFixed(2);
    this.setState({
      clicked: true,
      output: M,
    });
  }

  render() {
    return (
      <div className='container'>
        
          <form>

            <div className="shadow row my-3">
              <div className="col-3"></div>
              <h1 className="title col-9">Mortgage Calculator</h1>
            </div>

            <div className="shadow form-group row">
              <label htmlFor="idBalance" className="col-md-3 text-center text-md-right my-2"><b>Loan Balance</b></label>
              <div className="col-md-9">
                <input id="idBalance" type="number" onChange={this.handleChange} onFocus={this.handleFocus} placeholder="Principal" name="balance" className="form-control"></input>
              </div>
            </div>

            <div className="shadow form-group row">
              <label htmlFor="idInterest" className="col-md-3 text-center text-md-right my-2"><b>Interest Rate (%)</b></label>
              <div className="col-md-9">
                <input id="idInterest" type="number" onChange={this.handleChange} onFocus={this.handleFocus} placeholder="APR%" name="rate" step="0.01" className="form-control"></input>
              </div>
            </div>

            <div className="shadow row">
              <label htmlFor="idTerm" className="col-md-3 text-center text-md-right my-2"><b>Loan Term (years)</b></label>
              <div className="col-md-9">
                <select id="idTerm" name="term" defaultValue={this.state.term} onChange={this.handleChange} className="form-control">
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-3"></div>
              <div className="col-md-2">
                <button className="btn btn-primary form-control" onClick={this.calculate} name="submit" type="button">{this.state.clicked ? "Calculate Again" : "Calculate"}</button>
              </div>
              <div className="col-7"></div>
            </div>

            <div id="output" className="mt-5">
              {
              this.state.output ?
              <center><strong>${this.state.output} is your payment.</strong></center> :
              ""
              }
            </div>

          </form>
        
      </div>
    );
  }
}
