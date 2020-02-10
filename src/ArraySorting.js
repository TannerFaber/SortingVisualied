import React from "react";
import { getBubbleSortAnimations } from "./animations";
import { getMergeSortAnimations } from "./animations";
import { getQuickSortAnimations } from "./animations";

//=================================== Main Function ===================================
const MAXVALUE = 100;
const PRIMARY_COLOR = "aqua";
const SECONDARY_COLOR = "red";
const PIVOT_COLOR = "orange";

export class ArraySorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [], arraySize: 50, speed: 30 };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const array = generateArray(this.state.arraySize, MAXVALUE);
    this.setState({ array });
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
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}%`;
        }, i * this.state.speed);
      }
    }
    setTimeout(() => {
      enableBtn();
    }, animations.length * this.state.speed);
  };

  quickSort = () => {
    disableBtn();
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i].length === 3) {
        const index = animations[i][2];
        const colorString = animations[i][1];
        let color;
        if (colorString === "PRIMARY_COLOR") {
          color = PRIMARY_COLOR;
        } else if (colorString === "SECONDARY_COLOR") {
          color = SECONDARY_COLOR;
        } else {
          color = PIVOT_COLOR;
        }
        const barStyle = arrayBars[index].style;
        setTimeout(() => {
          barStyle.background = color;
        }, i * this.state.speed);
      } else if (animations[i].length === 4) {
        const indexOne = animations[i][2];
        const indexTwo = animations[i][3];
        const colorString = animations[i][1];
        let color;
        if (colorString === "PRIMARY_COLOR") {
          color = PRIMARY_COLOR;
        } else if (colorString === "SECONDARY_COLOR") {
          color = SECONDARY_COLOR;
        }
        const barOneStyle = arrayBars[indexOne].style;
        const barTwoStyle = arrayBars[indexTwo].style;
        setTimeout(() => {
          barOneStyle.background = color;
          barTwoStyle.background = color;
        }, i * this.state.speed);
      } else {
        const indexOne = animations[i][1];
        const indexTwo = animations[i][3];

        const barOneStyle = arrayBars[indexOne].style;
        const barTwoStyle = arrayBars[indexTwo].style;
        setTimeout(() => {
          barOneStyle.height = `${animations[i][2]}%`;
          barTwoStyle.height = `${animations[i][4]}%`;
        }, i * this.state.speed);
      }
    }
    setTimeout(() => {
      enableBtn();
    }, animations.length * this.state.speed);
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
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}%`;
        }, i * this.state.speed);
      }
    }
    setTimeout(() => {
      enableBtn();
    }, animations.length * this.state.speed);
  };

  handleChange = evt => {
    const arraySize = Math.floor((parseInt(evt.target.value) + 3) * 1.75);
    const array = generateArray(arraySize, MAXVALUE);
    const speed = (1000 / arraySize) * 1.6;
    this.setState({ array, speed, arraySize });

    generateArray(Math.floor((parseInt(evt.target.value) + 3) * 1.75));
  };
  render() {
    return (
      <div className="container segment">
        <div className="ui menu">
          <div className="item">
            <button onClick={this.bubbleSort} className="ui primary button">
              Bubble Sort
            </button>
          </div>
          <div className="item">
            <button onClick={this.mergeSort} className="ui primary button">
              Merge Sort
            </button>
          </div>
          <div className="item">
            <button onClick={this.quickSort} className="ui primary button">
              Quick Sort
            </button>
          </div>
          <div className="item">
            <button onClick={this.resetArray} className="ui button">
              Reset
            </button>
          </div>
          <div className="slidecontainer">
            <input
              className="slider"
              id="changeSize"
              type="range"
              min="0"
              max="100"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="array">{this.makeBars(this.state.array)}</div>
      </div>
    );
  }
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
  document.getElementsByClassName("slider")[0].disabled = true;
  let buttons = document.getElementsByClassName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function enableBtn() {
  document.getElementsByClassName("slider")[0].disabled = false;
  let buttons = document.getElementsByClassName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}
export default ArraySorting;
