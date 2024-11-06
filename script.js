//utility functions
// get id
const getId = (id) => document.getElementById(id);

//create element
const createElement = (tag) => document.createElement(tag);

// add Event Listener
const addEventListener = (element, event, callbackFn) =>
  element.addEventListener(event, callbackFn);

// set result in element textContent
const result = (element, value) => (element.textContent = value);

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
  const input = arrayOfIds.map((id) => getInputFieldValue(id));
  const area = areaFormula(...input);
  result(displayElement, area);

  // reset input field
  arrayOfIds.forEach((id) => (getId(id).value = ""));
};



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
  baseD.textContent = tBase;
  heightD.textContent = tHight;
  getId("tBase").value = "";
  getId("tHight").value = "";
});
addEventListener(editIcon, "click", () => {
  // create edit input elements
  const inputB = createElement('input');
  const inputH = createElement('input');
  // set inner value
  inputB.value = baseD.innerHTML;
  inputH.value = heightD.innerHTML;
  inputB.classList.add('w-8', 'text-center');
  inputH.classList.add('w-8', 'text-center');

  // clear existing element and set new value
  baseD.innerHTML = '';
  heightD.innerHTML = '';
  baseD.appendChild(inputB);
  heightD.appendChild(inputH);

  // update 
  addEventListener(inputB, 'blur', ()=> baseD.innerHTML = inputB.value );
  addEventListener(inputH, 'blur', ()=> heightD.innerHTML = inputH.value );
})

// Triangle area calculation using the utility function
const triangleBtn = getId("triangle");
const triangleResult = getId("triangleResult");
const triangleAreaFormula = (base, height) => base * height * 0.5;
addEventListener(triangleBtn, "click", () => {
  calculateArea(["tBase", "tHight"], triangleAreaFormula, triangleResult);
});

// Rectangle area calculation using the utility function
const rectangleBtn = getId("rectangle");
const rectangleFormula = (width, length) => width * length;
const rectangleResult = getId("rectangleResult");
addEventListener(rectangleBtn, "click", () => {
  calculateArea(["rWidth", "rLength"], rectangleFormula, rectangleResult);
});