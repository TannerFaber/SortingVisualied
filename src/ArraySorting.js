import React from "react";
import { getBubbleSortAnimations } from "./animations";
import { getMergeSortAnimations } from "./animations";

//=================================== Main Function ===================================
const ARRAYSIZE = 100;
const MAXVALUE = 100;
const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = "aqua";
const SECONDARY_COLOR = "red";
// const FINISH_COLOR = "lightgreen";

export class ArraySorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const array = generateArray(ARRAYSIZE, MAXVALUE);
    this.setState({ array });
  };

  // makeBars will return an array of div objects that have
  makeBars = array => {
    var bars = [];
    for (
      var i = 0;
      i < array.length;
      i++ // for (var i in array)
    ) {
      bars.push(
        // maybe make this an object with a height and index property for easy sorting
        <div
          className="array-bar"
          key={i}
          style={{
            height: `${array[i]}%`,
            width: `${100 / array.length}%`,
            backgroundColor: `${PRIMARY_COLOR}`
          }}
        ></div>
      );
    }
    return bars;
  };

  bubbleSort = () => {
    disableBtn();
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      // This object that is returned from the animation function is weird
      // its form is [num,num,bool,bool]
      // the first bool is if this is a comparision step
      // the second bool is to control the coloring of the bars
      const [barOneIdx, barTwoIdx, compare, primary] = animations[i];

      if (compare) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = primary ? PRIMARY_COLOR : SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}%`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      enableBtn();
    }, animations.length * ANIMATION_SPEED_MS);
  };

  //https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/SortingVisualizer/SortingVisualizer.jsx
  mergeSort = () => {
    disableBtn();
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}%`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      enableBtn();
    }, animations.length * ANIMATION_SPEED_MS);
  };

  render() {
    return (
      <div className="container segment">
        <div className="ui menu">
          <div className="item">
            <button onClick={this.mergeSort} className="ui primary button">
              Run
            </button>
          </div>
          <div className="item">
            <button onClick={this.resetArray} className="ui button">
              Reset
            </button>
          </div>
        </div>
        <div className="array">{this.makeBars(this.state.array)}</div>
      </div>
    );
  }
}

// ================================== Helper Functions ===================================

// return an array with length arraySize where elements are less than or equal to maxValue
// https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
function generateArray(arraySize, maxValue) {
  var array = Array.from({ length: arraySize }, () =>
    Math.floor(Math.random() * maxValue)
  );
  return array;
}

function disableBtn() {
  let buttons = document.getElementsByClassName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function enableBtn() {
  let buttons = document.getElementsByClassName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

export default ArraySorting;

// =========================================================================================
// footnotes:
// =========================================================================================
