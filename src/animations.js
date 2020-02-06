// ======================= OverView =======================
// the amimations array will need to show what two elements are being compared
// by changing the background color of each element
// then swapping the values if they need to be swapped
// then changing the background color back to the default color

// ========================= TODO =========================
// More testing should be done to see if the sorting is correct!

export function getBubbleSortAnimations(array) {
  const animations = [];
  console.log("pre: " + array);
  if (array.length <= 1) return array;

  let len = array.length;
  let swapped;
  do {
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
    }
  } while (swapped);

  console.log("post: " + array);
  console.log(animations);
  return animations;
}
