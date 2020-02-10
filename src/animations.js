// ======================= OverView =======================
// the amimations array will need to show what two elements are being compared
// by changing the background color of each element
// then swapping the values if they need to be swapped
// then changing the background color back to the default color

// ========================= TODO =========================
// More testing should be done to see if the sorting is correct!
// Add optomization to bubble sort to stop running if array is sorted

// =======================================================================
// ==============================BubbleSort===============================
// =======================================================================

export function getBubbleSortAnimations(array) {
  const animations = [];

  let len = array.length;
  let swapped;
  for (let i = 0; i < len - 1; i++) {
    swapped = false;
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
        swapped = true;
      }
      // Dealing with the animations
      // push the indexes we are comparing
      animations.push([j, j + 1, true, false]);
      // push the new heights of the elements
      // [index, height]
      animations.push([j, array[j], false]);
      animations.push([j + 1, array[j + 1], false]);
      // push the indexes one more time to change color back to default
      animations.push([j, j + 1, true, true]);
    }
    if (!swapped) {
      break;
    }
  }
  return animations;
}

// =======================================================================
// ===============================MergeSort===============================
// =======================================================================
// https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/sortingAlgorithms/sortingAlgorithms.js

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// =======================================================================
// ===============================QuickSort===============================
// =======================================================================

export function getQuickSortAnimations(array) {
  const animations = [];
  array = quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(items, left, right, animations) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, animations); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1, animations);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right, animations);
    }
  }
  return items;
}

function partition(items, left, right, animations) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  animations.push(["color", "PIVOT_COLOR", Math.floor((right + left) / 2)]); //highlight the pivot element
  while (i <= j) {
    while (items[i] < pivot) {
      animations.push(["color", "SECONDARY_COLOR", i]); // change color
      animations.push(["color", "PRIMARY_COLOR", i]); // change back
      i++;
    }
    while (items[j] > pivot) {
      animations.push(["color", "SECONDARY_COLOR", j]); // change color
      animations.push(["color", "PRIMARY_COLOR", j]); // change back
      j--;
    }
    if (i <= j) {
      swap(items, i, j, animations); //sawpping two elements
      i++;
      j--;
    }
  }
  animations.push(["color", "PRIMARY_COLOR", Math.floor((right + left) / 2)]); //un-highlight the pivot element
  return i;
}

function swap(items, leftIndex, rightIndex, animations) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  animations.push(["color", "SECONDARY_COLOR", leftIndex, rightIndex]);
  animations.push([
    "swap",
    leftIndex,
    items[leftIndex],
    rightIndex,
    items[rightIndex]
  ]); // type, index, newvalue, index, newvalue
  animations.push(["color", "PRIMARY_COLOR", leftIndex, rightIndex]);
}
