//*****************************utility functions*******************************
// get id
const getId = (id) => document.getElementById(id);

//create element
const createElement = (tag) => document.createElement(tag);

// add Event Listener
const addEventListener = (element, event, callbackFn) =>
  element.addEventListener(event, callbackFn);

// set result in element textContent
const result = (element, value) => {
  element.textContent = value;
};

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
const calculateArea = (
  arrayOfIds,
  areaFormula,
  displayElement,
  containerId,
  shapeName
) => {
  const input = arrayOfIds.map((id) => {
    const value = getId(id).innerHTML.trim();
    return value === "" ? null : parseFloat(value);
  });

  // Validation: Check if any value is NaN or empty
  if (input.some((value) => isNaN(value))) {
    result(displayElement, null);
    return;
  }
  const area = areaFormula(...input);
  console.log(area);

  // Dynamically display the result for the shape
  displayResult(containerId, shapeName, area);

  // reset input field
  arrayOfIds.forEach((id) => (getId(id).value = ""));
};

// Utility function for Display Results
const displayResult = (containerId, shapeName, calculationResult) => {
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
      ${shapeName} <span class="ml-2 sm:ml-5" id="${resultId}">0</span> <span id='cm-${shapeName}'>cm²</span>
      <button
        id="${buttonId}"
        class="bg-primary px-1 sm:px-2 sm:py-1 sm:font-bold rounded-sm text-white md:ml-5"
      >
        Convert to m<sup>2</sup>
      </button>
    </li>
  `;

  // Convert result cm² to m²
  const convertButton = getId(buttonId);
  const resultElement = getId(resultId);
  resultElement.textContent = calculationResult;
  const cm = getId(`cm-${shapeName}`);

  convertButton.addEventListener("click", () => {
    const currentResult = parseFloat(resultElement.textContent);
    if (!isNaN(currentResult) && currentResult > 0) {
      const resultInM2 = (currentResult / 10000).toFixed(3);
      console.log(resultInM2);
      resultElement.textContent = resultInM2;
      cm.textContent = "m²";
    }
  });
};

//Utility Function for input values add, edit, update
const setupShapeEdit = (
  spanBaseId,
  spanHightId,
  checkboxId,
  editIconId,
  inputBaseId,
  inputHightId
) => {
  // select elements
  const baseD = getId(spanBaseId);
  const heightD = getId(spanHightId);
  const checkbox = getId(checkboxId);
  const editIcon = getId(editIconId);

  // add eventListener in checkbox
  addEventListener(checkbox, "click", () => {
    const tBase = getInputFieldValue(inputBaseId);
    const tHight = getInputFieldValue(inputHightId);

    if (typeof tBase === "number" && typeof tHight === "number") {
      baseD.textContent = tBase;
      heightD.textContent = tHight;
    } else if (typeof tBase === "number" || typeof tHight === "number") {
      return "Value not passed";
    } else {
      return "Not valid input";
    }

    getId(inputBaseId).value = "";
    getId(inputHightId).value = "";
  });

  // Edit input value
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
      if (inputB.value.trim() === "") {
        inputB.value === baseD.textContent || 0;
      }
      baseD.innerHTML = inputB.value;
    });
    addEventListener(inputH, "blur", () => {
      if (inputH.value.trim() === "") {
        inputH.value === heightD.textContent || 0;
      }
      heightD.innerHTML = inputH.value;
    });
  });
};

//*************************Use of all utility functions ********************************/
//=====================Triangle========================//

//Area calculation
const triangleBtn = getId("triangle");
const triangleAreaFormula = (base, height) => base * height * 0.5;
addEventListener(triangleBtn, "click", () => {
  calculateArea(
    ["baseD", "heightD"],
    triangleAreaFormula,
    getId("triangleResult"),
    "displayResult",
    "triangle"
  );
});
//Call input value add, edit, update
setupShapeEdit("baseD", "heightD", "checkbox", "editIcon", "tBase", "tHight");

//=====================Rectangle========================//
//=====================Parallelogram========================//
//=====================Rhombus========================//
//=====================Pentagon========================//
//=====================Ellipse========================//
