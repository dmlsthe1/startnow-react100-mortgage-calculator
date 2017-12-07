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
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  
  componentDidMount(){
    this.refs.balance.focus();
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
  handleKeyPress(e) {
    if (e.key == "Enter") {
      if (e.target.name == "balance") {
        this.refs.rate.focus();
      }
      else if (e.target.name == "rate") {
        this.refs.term.focus();
      }
      else if (e.target.name == "term") {
        this.calculate();
      }
    }
  }
  
  calculate() {
    let principalTotal = this.state.balance;
    let rate = this.state.rate / 1200;
    let numberMonths = this.state.term * 12;
    let monthlyPayments = (principalTotal * ((rate * Math.pow((1 + rate), numberMonths)) / (Math.pow((1 + rate), numberMonths) - 1)));
    let obj = {
      Amount: parseFloat(monthlyPayments),
      Interest: parseFloat((rate * principalTotal)),
      Principal: parseFloat(((monthlyPayments - (rate* principalTotal)))),
      Balance: parseFloat(principalTotal - (monthlyPayments - (rate * principalTotal)))
    };
    let tableContents = [];
    for (let i = 0; i < numberMonths ; i++){
      obj.Payment = (i + 1);
      
      (i + 1) == numberMonths ? (obj.Payment = "Final Payment", obj.Amount = ( obj.nextInterest + obj.nextBalance)) : "";
      //obj.Amount = (obj.Balance <= obj.Amount) ? (obj.Balance + (rate * obj.Balance)) : obj.Amount;
      
      tableContents.push(<tr key={i}>
        <td className="text-center">{obj.Payment}</td>
        <td className="text-center">{obj.Amount.toFixed(2)}</td>
        <td className="text-center">{obj.Interest.toFixed(2)}</td>
        <td className="text-center">{obj.Principal.toFixed(2)}</td>
        <td className="text-center">{obj.Balance.toFixed(2)}</td>
      </tr>);
      
      obj.Interest =       (rate * obj.Balance);
      obj.Principal =      (obj.Amount - obj.Interest);
      obj.Balance =        (obj.Balance - obj.Principal);
      obj.nextInterest =   (rate * obj.Balance);
      obj.nextPrincipal =  (obj.Amount - obj.nextInterest);
      obj.nextBalance =    (obj.Balance + obj.nextPrincipal);
    }
    this.setState({
      clicked: true,
      output: monthlyPayments.toFixed(2),
      amortization: tableContents,
    });
    this.refs.balance.focus();
  }
  render() {
    return (
        
        <div className='container pt-5'>
          
            <form>
              <div className="shadow row mb-3">
                <div className="col-3"></div>
                <h1 className="title col-9">Mortgage Calculator</h1>
              </div>
              <div className="shadow form-group row">
                <label htmlFor="idBalance" className="col-md-3 text-center text-md-right my-2"><b>Loan Balance</b></label>
                <div className="col-md-9">
                  <input id="idBalance" type="number" onChange={this.handleChange} onFocus={this.handleFocus} onKeyPress={this.handleKeyPress} ref="balance" placeholder="Principal" name="balance" className="form-control"></input>
                </div>
              </div>
              <div className="shadow form-group row">
                <label htmlFor="idInterest" className="col-md-3 text-center text-md-right my-2"><b>Interest Rate (%)</b></label>
                <div className="col-md-9">
                  <input id="idInterest" type="number" onChange={this.handleChange} onFocus={this.handleFocus} onKeyPress={this.handleKeyPress} ref="rate" placeholder="APR%" name="rate" step="0.01" className="form-control"></input>
                </div>
              </div>
              <div className="shadow row">
                <label htmlFor="idTerm" className="col-md-3 text-center text-md-right my-2"><b>Loan Term (years)</b></label>
                <div className="col-md-9">
                  <select id="idTerm" name="term" defaultValue={this.state.term} onChange={this.handleChange} onKeyPress={this.handleKeyPress} ref="term" className="form-control">
                    <option value="5">5</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-3"></div>
                <div className="col">
                  <button className="btn btn-primary form-control" onClick={this.calculate} name="submit" type="button">{this.state.clicked ? "Calculate Again" : "Calculate"}</button>
                </div>
              </div>
              <div id="output" className="mt-5">
                {
                this.state.output ?
                <center>
                  <strong>${this.state.output} is your payment.</strong>
                  <table  className="table table-striped table-dark table-sm table-bordered table-hover mb-0">
                    <thead>
                      <tr>
                        <th id="idPayment" className="text-center">Payment #</th>
                        <th id="idAmount" className="text-center">Amount</th>
                        <th id="idInterest" className="text-center">Interest</th>
                        <th id="idPrincipal" className="text-center">Principal</th>
                        <th id="idBalance" className="text-center">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.amortization}
                    </tbody>
                  </table>
                </center> :
                ""
                }
              </div>
            </form>
          
        </div>
    );
  }
}