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
  let baseD = getId(spanBaseId);
  let heightD = getId(spanHightId);
  const checkbox = getId(checkboxId);
  const editIcon = getId(editIconId);

  // add eventListener in checkbox
  addEventListener(checkbox, "click", () => {
    let tBase = getInputFieldValue(inputBaseId);
    let tHight = getInputFieldValue(inputHightId);

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
  addEventListener(editIcon, "click", (event) => {
    // Prevent immediate closing when editIcon is clicked
    event.stopPropagation();

    let baseDContent = parseFloat(baseD.textContent) || 0;
    let heightDContent = parseFloat(heightD.textContent) || 0;

    if (baseDContent === 0 && heightDContent === 0) {
      return;
    }

    // Create edit input elements
    const inputB = createElement("input");
    const inputH = createElement("input");

    // Set initial values
    inputB.value = baseDContent;
    inputH.value = heightDContent;
    inputB.classList.add("w-8", "text-center");
    inputH.classList.add("w-8", "text-center");

    // Clear existing elements and set new inputs
    baseD.innerHTML = "";
    heightD.innerHTML = "";
    baseD.appendChild(inputB);
    heightD.appendChild(inputH);

    // Function to exit edit mode
    function exitEditMode() {
      // Check if input is empty; set to initial value if empty
      baseD.textContent =
        inputB.value.trim() !== "" ? parseFloat(inputB.value) : baseDContent;
      heightD.textContent =
        inputH.value.trim() !== "" ? parseFloat(inputH.value) : heightDContent;

      // Remove the document click listener after exiting edit mode
      document.removeEventListener("click", handleClickOutside);
    }

    // Listener for focusout on each input field
    addEventListener(inputB, "focusout", () => {
      if (inputB.value.trim() === "") {
        inputB.value = baseDContent;
      }
    });
    addEventListener(inputH, "focusout", () => {
      if (inputH.value.trim() === "") {
        inputH.value = heightDContent;
      }
    });

    // Event listener to detect clicks outside the inputs
    function handleClickOutside(event) {
      if (!inputB.contains(event.target) && !inputH.contains(event.target)) {
        exitEditMode();
      }
    }

    // Add the click listener to the document
    document.addEventListener("click", handleClickOutside);
  });
};

// Generalized area calculation
const calculateArea = (
  arrayOfIds,
  areaFormula,
  displayElement,
  containerId,
  shapeName,
  checkboxId,
  messageId
) => {
  const checkbox = getId(checkboxId);
  console.log(checkbox);
  const showMessage = getId(messageId);
  console.log(showMessage);

  // Show message if the checkbox is not checked
  if (!checkbox.checked) {
    showMessage.style.display = "block";
    return;
  } else {
    showMessage.style.display = "none";
  }
  console.log(showMessage);

  const input = arrayOfIds.map((id) => {
    const value = getId(id).textContent;
    console.log(value);
    if (value === "0") {
      return;
    } else {
      return value;
    }
  });

  // Validation: Check if any value is NaN or empty
  if (input.some((value) => isNaN(value))) {
    return;
  }

  const area = areaFormula(...input);
  console.log(area, "result");

  // Dynamically display the result for the shape
  displayResult(containerId, shapeName, area);

  // reset input field
  arrayOfIds.forEach((id) => (getId(id).value = ""));
};

// Utility function for Display Results
const displayResult = (containerId, shapeName, calculationResult) => {
  const container = getId(containerId);
  if (!container) {
    console.warn(`Element with id "${containerId}" not found.`);
    return;
  }

  // Ensure the display area is visible
  const displayArea = getId("displayArea");
  if (displayArea) {
    displayArea.style.display = "block";
  } else {
    console.warn("Display area element not found.");
  }

  // Check if the result for the shape already exists
  const existingResult = getId(`${shapeName.toLowerCase()}ResultContainer`);

  if (existingResult) {
    // Update the existing result
    const resultElement = getId(`${shapeName.toLowerCase()}Result`);
    const cm = getId(`cm-${shapeName}`);
    resultElement.textContent = calculationResult;
    cm.textContent = "cm²";
  } else {
    // Create a new result entry
    const div = createElement("div");
    div.id = `${shapeName.toLowerCase()}ResultContainer`;
    div.classList.add("py-2");
    const resultId = `${shapeName.toLowerCase()}Result`;
    const buttonId = `convert${shapeName}`;

    div.innerHTML = `
      <li>
        ${shapeName} <span class="ml-2 sm:ml-5" id="${resultId}">${calculationResult}</span> <span id='cm-${shapeName}'>cm²</span>
        <button
          id="${buttonId}"
          class="bg-primary px-1 sm:px-2 sm:py-1 sm:font-bold rounded-sm text-white md:ml-5"
        >
          Convert to m<sup>2</sup>
        </button>
      </li>
    `;

    container.appendChild(div);

    // Convert result from cm² to m²
    const convertButton = getId(buttonId);
    const resultElement = getId(resultId);
    const cm = getId(`cm-${shapeName}`);

    convertButton.addEventListener("click", () => {
      const currentResult = parseFloat(resultElement.textContent);
      if (
        !isNaN(currentResult) &&
        cm.textContent === "cm²" &&
        currentResult > 0
      ) {
        const resultInM2 = (currentResult / 10000).toFixed(3);
        resultElement.textContent = resultInM2;
        cm.textContent = "m²";
      }
    });
    
  }
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
    "triangle",
    "checkbox",
    "triangleMessage"
  );
});
//Call input value add, edit, update
setupShapeEdit("baseD", "heightD", "checkbox", "editIcon", "tBase", "tHight");

//=====================Rectangle========================//
//Area calculation
const rectangleBtn = getId("rectangle");
const rectangleFormula = (width, length) => width * length;
addEventListener(rectangleBtn, "click", () => {
  calculateArea(
    ["widthR", "lengthR"],
    rectangleFormula,
    getId("rectangleResult"),
    "displayResult",
    "rectangle",
    "checkboxR",
    "rectangleMessage"
  );
});
//Call input value add, edit, update
setupShapeEdit(
  "widthR",
  "lengthR",
  "checkboxR",
  "editIconR",
  "tWidth",
  "tLength"
);

//=====================Parallelogram========================//
//Area calculation
const parallelogramBtn = getId("parallelogram");
const parallelogramAreaFormula = (base, height) => base * height;
addEventListener(parallelogramBtn, "click", () => {
  calculateArea(
    ["baseP", "heightP"],
    parallelogramAreaFormula,
    getId("parallelogramResult"),
    "displayResult",
    "parallelogram",
    "checkboxP",
    "parallelogramMessage"
  );
});
//Call input value add, edit, update
setupShapeEdit("baseP", "heightP", "checkboxP", "editIconP", "pBase", "pHight");
//=====================Rhombus========================//
//Area calculation
const rhombusBtn = getId("rhombus");
const rhombusAreaFormula = (base, height) => base * height * 0.5;
addEventListener(rhombusBtn, "click", () => {
  calculateArea(
    ["baseRom", "heightRom"],
    rhombusAreaFormula,
    getId("rhombusResult"),
    "displayResult",
    "rhombus",
    "checkboxRom",
    "rhombusMessage"
  );
});
//Call input value add, edit, update
setupShapeEdit(
  "baseRom",
  "heightRom",
  "checkboxRom",
  "editIconRom",
  "romBase",
  "romHight"
);
//=====================Pentagon========================//
//Area calculation
const pentagonBtn = getId("pentagon");
const pentagonAreaFormula = (base, height) => base * height * 0.5;
addEventListener(pentagonBtn, "click", () => {
  calculateArea(
    ["basePb", "heightPb"],
    pentagonAreaFormula,
    getId("pentagonResult"),
    "displayResult",
    "pentagon",
    "checkboxPb",
    "pentagonMessage"
  );
});
//Call input value add, edit, update
setupShapeEdit(
  "basePb",
  "heightPb",
  "checkboxPb",
  "editIconPb",
  "pbBase",
  "pbHight"
);

//=====================Ellipse========================//
//Area calculation
const ellipseBtn = getId("ellipse");
const ellipseAreaFormula = (base, height) => (base * height * 3.14).toFixed(2);
addEventListener(ellipseBtn, "click", () => {
  calculateArea(
    ["baseAb", "heightAb"],
    ellipseAreaFormula,
    getId("ellipseResult"),
    "displayResult",
    "ellipse",
    "checkboxAb",
    "ellipseMessage"
  );
});
//Call input value add, edit, update
setupShapeEdit(
  "baseAb",
  "heightAb",
  "checkboxAb",
  "editIconAb",
  "abBase",
  "abHight"
);
