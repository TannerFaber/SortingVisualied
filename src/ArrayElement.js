import React from "react";

//=================================== Main Function ===================================
const ARRAYSIZE = 150;
const MAXVALUE = 100;

export class ArrayElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: this.props.arrayMain };
  }

  componentDidMount() {
    this.resetArray();
    console.log("Array Mounted");
    console.log("State is: " + this.state.array);
  }

  resetArray() {
    const array = generateArray(ARRAYSIZE, MAXVALUE);
    this.setState({ array });
  }

  render() {
    return <div className="array">{makeBars(this.state.array)}</div>;
  }
}

//=================================== Helper Functions ===================================

// return an array with length arraySize where elements are less than or equal to maxValue
// https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
function generateArray(arraySize, maxValue) {
  var array = Array.from({ length: arraySize }, () =>
    Math.floor(Math.random() * maxValue)
  );
  return array;
}

// makeBars will return an array of div objects that have
function makeBars(array) {
  var bars = [];
  for (var i in array) {
    bars.push(
      // maybe make this an object with a height and index property for easy sorting
      <div
        className="bar"
        key={i}
        style={{ height: `${array[i]}%`, width: `${100 / array.length}%` }}
      ></div>
    );
  }
  return bars;
}

export default ArrayElement;
