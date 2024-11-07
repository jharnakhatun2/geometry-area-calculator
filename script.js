//utility functions
// get id
const getId = (id) => document.getElementById(id);

//create element
const createElement = (tag) => document.createElement(tag);

// add Event Listener
const addEventListener = (element, event, callbackFn) => element.addEventListener(event, callbackFn);

// set result in element textContent
const result = (element, value) => (element.textContent = value);

// Convert cm² to m² utility function
const convertCmToM = (valueInCm2) => (valueInCm2 / 10000).toFixed(3) + ' m²';

// get input field value
const getInputFieldValue = (id) => {
  const inputField = document.getElementById(id);
  if (!inputField) {
    console.warn(`Element with id "${id}" not found.`);
    return NaN;
  }
  const inputValue = inputField.value.trim();
  const inputValueNumber = parseFloat(inputValue);
  return isNaN(inputValueNumber) ? null : inputValueNumber;
};

// Generalized area calculation
const calculateArea = (arrayOfIds, areaFormula, displayElement) => {
  const input = arrayOfIds.map((id) => {
    const value = getId(id).innerHTML.trim();
    return value === '' ? null : parseFloat(value);
  });

// Validation: Check if any value is NaN or empty
if (input.some((value) => isNaN(value))) {
  result(displayElement, null);
  return;
}
  const area = areaFormula(...input);
  result(displayElement, area);

  // reset input field
  arrayOfIds.forEach((id) => (getId(id).value = ""));
};

//********************************main function*******************************************/
//input value set and show in edit item for Triangle
// select elements
const baseD = getId("baseD");
const heightD = getId("heightD");
const checkbox = getId("checkbox");
const editIcon = getId("editIcon");

// add eventListener in checkbox
addEventListener(checkbox, "click", () => {
  const tBase = getInputFieldValue("tBase");
  const tHight = getInputFieldValue("tHight");

  if (typeof tBase === "number" && typeof tHight === "number") {
    baseD.textContent = tBase;
    heightD.textContent = tHight;
  } else if (typeof tBase === "number" || typeof tHight === "number") {
    return "Value not passed";
  } else {
    return "Not valid input";
  }

  getId("tBase").value = "";
  getId("tHight").value = "";
});

addEventListener(editIcon, "click", () => {
  if (baseD.innerHTML === "0" && heightD.innerHTML === "0") {
    return;
  }
  // create edit input elements
  const inputB = createElement("input");
  const inputH = createElement("input");
  // set inner value
  inputB.value = baseD.innerHTML;
  inputH.value = heightD.innerHTML;
  inputB.classList.add("w-8", "text-center");
  inputH.classList.add("w-8", "text-center");

  // clear existing element and set new value
  baseD.innerHTML = "";
  heightD.innerHTML = "";
  baseD.appendChild(inputB);
  heightD.appendChild(inputH);

  // update
  addEventListener(inputB, "blur", () => {
    if(inputB.value.trim() === ''){
      inputB.value === baseD.textContent || 0;
    }
    baseD.innerHTML = inputB.value;
  });
  addEventListener(inputH, "blur", () =>{
    if(inputH.value.trim() === ''){
      inputH.value === heightD.textContent || 0;
    }
    heightD.innerHTML = inputH.value;
  });
});

//*************************Display Area Calculation ********************************/
// Display Results Function
const displayResult = (containerId, shapeName, resultValue) => {
  const ol = getId(containerId);

  if (!ol) {
    console.warn(`Element with id "${containerId}" not found.`);
    return;
  }
  // Generate unique IDs for the result and button
  const resultId = `${shapeName.toLowerCase()}Result`;
  const buttonId = `convert${shapeName}`;
  
  ol.innerHTML = `
    <li>
      ${shapeName} <span class="ml-5" id="${resultId}">${resultValue}</span> cm<sup>2</sup>
      <button
        id="${buttonId}"
        class="bg-primary px-2 py-1 font-bold rounded-sm text-white ml-5"
      >
        Convert to m<sup>2</sup>
      </button>
    </li>
  `;

  // Attach click event to the conversion button
  const convertButton = getId(buttonId);
  const resultElement = getId(resultId);
  
  convertButton.addEventListener("click", () => {
    const currentResult = parseFloat(resultElement.textContent);
    if (!isNaN(currentResult) && currentResult > 0) {
      resultElement.textContent = convertCmToM(currentResult); // Convert and update to m²
    }
  });
};

// Example usage
displayResult('displayResult', 'Triangle', 0);

//*************************Triangle area calculation ********************************/
// Triangle area calculation using the utility function
const triangleBtn = getId("triangle");
const triangleResult = getId("triangleResult");
const triangleAreaFormula = (base, height) => base * height * 0.5;
addEventListener(triangleBtn, "click", () => {
  calculateArea(["baseD", "heightD"], triangleAreaFormula, triangleResult);
});

//*************************Convert result cm² to m² ********************************/
// Conversion button for triangle result
const convertTriangleBtn = getId("convertTriangle");
addEventListener(convertTriangleBtn, "click", () => {
  const currentResult = parseFloat(triangleResult.textContent);
  if (!isNaN(currentResult) && currentResult > 0) {
    const resultInM2 = convertCmToM(currentResult);
    result(triangleResult, resultInM2); // Update the result element to show the converted value in m²
  }
});