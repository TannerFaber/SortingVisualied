import React from "react";
import ReactDOM from "react-dom";
import "./ArrayElement.js";
import ArrayElement from "./ArrayElement.js";
import "./style.css";

class App extends React.Component {
  state = { arrayMain: [] };

  handleReset = () => {
    console.log(this.state);
    this.setState({ arrayMain: [] });
  };

  render() {
    return (
      <div className="container segment">
        <div className="ui menu">
          <div className="item">
            <div className="ui primary button">Run</div>
          </div>
          <div className="item">
            <button onClick={this.handleReset} className="ui button">
              Reset
            </button>
          </div>
        </div>
        <ArrayElement array={this.state.arrayMain} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
