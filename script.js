//utility functions
// get id
const getId = (id) => document.getElementById(id);

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
const calculateArea = (arrayOfIds,areaFormula,displayElement) =>{
const input = arrayOfIds.map(id => getInputFieldValue(id));
const area = areaFormula(...input);
result(displayElement, area);

// reset input field
arrayOfIds.forEach( id => getId(id).value = ''); 
}
  
  // Triangle area calculation using the utility function
  const triangleBtn = getId('triangle');
  const triangleResult = getId('triangleResult');
  const triangleAreaFormula = (base, height) => base * height * 0.5 ;
  addEventListener(triangleBtn, 'click', ()=>{
    calculateArea(['tBase','tHight'], triangleAreaFormula, triangleResult)
  });
  

  // Rectangle area calculation using the utility function
  const rectangleBtn = getId('rectangle');
  const rectangleFormula = (width, length) => width * length ;
  const rectangleResult = getId('rectangleResult')
  addEventListener(rectangleBtn, 'click', ()=>{
    calculateArea(['rWidth','rLength'], rectangleFormula, rectangleResult)
  })



