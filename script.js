//utility function
const getId = (id) => document.getElementById(id);
const addEventListener = (element, event, callbackFn) => element.addEventListener(event, callbackFn);
const result = (element, value) => element.textContent = value ;

//triangle calculation
const triangleBtn = getId('triangle');
const tBase = getId('tbase');
const tHight= getId('thight');
const triangleResult= getId('triangleResult');
function triangleAreaCalculation(){
    const baseValue = parseFloat(tBase.value);
    const hightValue = parseFloat(tHight.value);
    const area =  baseValue * hightValue * 0.5;
    result(triangleResult, area);

    // Reset the input values
    tBase.value = '';
    tHight.value = '';

}
addEventListener(triangleBtn, 'click', triangleAreaCalculation)


//Rectangle calculation
const rectangleBtn = getId('rectangle');
const rWidth = getId('rWidth');
const rLength= getId('rLength');
const rectangleResult= getId('rectangleResult');
function rectangleAreaCalculation(){
    const widthValue = parseFloat(rWidth.value);
    const lengthValue = parseFloat(rLength.value);
    const area =  widthValue * lengthValue;
    result(rectangleResult, area);

    // Reset the input values
    rWidth.value = '';
    rLength.value = '';

}
addEventListener(rectangleBtn, 'click', rectangleAreaCalculation)