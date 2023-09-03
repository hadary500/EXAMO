
let openClose = document.getElementById('openClose')
let rowData=document.getElementById('rowData')
let searchContainer=document.getElementById('searchContainer')
var arrData = []
async function showData(arrData) {
  let apiResponse = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
  let finalResult = await apiResponse.json()
  arrData = finalResult
  displayData(arrData.meals)
}
showData()

function displayData(arrData) {
  let cartona = ""
  for (let i = 0; i < arrData.length; i++) {
    cartona += `
    <div class="col-md-3 g-4">
    <div onclick="getMealDetails('${arrData[i].idMeal}')" class="items position-relative">
      <img src="${arrData[i].strMealThumb}" class="w-100" height=300px alt="">
      <div class="layer text-center">
      <h2>${arrData[i].strMeal}</h2>
      </div>
    </div>
  </div>
    `
  }
  document.getElementById('rowData').innerHTML = cartona
}
$("#entreOut").click(function () {
  $("#leftNav").toggle(200).css("display", "flex")

})

async function getMealDetails(mealID) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  let finalResponse = await response.json()
  console.log(mealID);
  displayDetails(finalResponse.meals)
}
function displayDetails(arrData) {
  let cartona = ""
  for (let i = 0; i < arrData.length; i++) {
    cartona += `
      <div class="col-md-4" >
      
      <img src="${arrData[i].strMealThumb}" class="w-100" alt="">
      <h2>${arrData[i].strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
      <h2>Instructions</h2>
      <p class="text-white fs-5">${arrData[i].strInstructions}</p>
      <h2>Area:Turkish</h2>
      <h2>Category : Side</h2>
      <h2>Recipes :</h2>
      <ul class=" list-unstyled d-flex g-3 flex-wrap text-white">
        <li class="alert alert-info m-2 p-1">1 cup Lentils</li>
        <li class="alert alert-info m-2 p-1">1 large Onion</li>
        <li class="alert alert-info m-2 p-1">1 large Carrots</li>
        <li class="alert alert-info m-2 p-1">1 tbs Tomato Puree</li>
        <li class="alert alert-info m-2 p-1">2 tsp Cumin</li>
        <li class="alert alert-info m-2 p-1">1 tsp Paprika</li>
        <li class="alert alert-info m-2 p-1">1/2 tsp Mint</li>
        <li class="alert alert-info m-2 p-1">1/2 tsp Thyme</li>
        <li class="alert alert-info m-2 p-1">1/4 tsp Black Pepper</li>
        <li class="alert alert-info m-2 p-1">1/4 tsp Red Pepper Flakes</li>
        <li class="alert alert-info m-2 p-1">4 cups Vegetable Stock</li>
        <li class="alert alert-info m-2 p-1">1 cup Water</li>
        <li class="alert alert-info m-2 p-1">Pinch Sea Salt</li>
      </ul>
      <h2>Tags :</h2>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-danger m-2 p-1">Soup</li>
      </ul>
      <a target="_blank" href="${arrData[i].strSource}" class="btn btn-success">Source</a>
      <a target="_blank" href="${arrData[i].strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
      `
  }
  document.getElementById('rowData').innerHTML = cartona
}
// //////////////////////////////////////////////////////// 
async function getCategories(arrData) {
   searchContainer.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let finalResponse = await response.json()
  // category=finalResponse
  displayCategory(finalResponse.categories)
}
function displayCategory(arrData) {
  let cartona = ""
  for (let i = 0; i < arrData.length; i++) {
    cartona += `
    <div class="col-md-3 text-center g-5">
    <div onclick="categoryDetails('${arrData[i].strCategory}')" class="items-category position-relative">
      <img class="img-category w-100" src="${arrData[i].strCategoryThumb} "class="w-100" alt="">
      <div class="layer-category d-flex flex-column justify-content-center text-dark ">
        <h2>${arrData[i].strCategory}</h2>
        <p>${arrData[i].strCategoryDescription.split(" ").slice(0, 17).join(" ")}</p>
      </div>
    </div>
  </div>
    `
  }
  document.getElementById('rowData').innerHTML = cartona
}
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function categoryDetails(category){
  rowData.innerHTML=""
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let finalResponse=await response.json()
  console.log(finalResponse);
  displayData(finalResponse.meals)
// console.log('done')
}


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

 
// //////////////////////////////////////////////
async function getArea(arrData) {
   searchContainer.innerHTML = "";
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  let finalResponse = await response.json()
  console.log(finalResponse);
  displayArea(finalResponse.meals)
}
function displayArea(arrData) {
  let cartona = ""
  for (let i = 0; i < arrData.length; i++) {
    cartona += `
    <div class="col-md-3 g-5">
    <div onclick="mealsArea('${arrData[i].strArea}')" class="items-area">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h2>${arrData[i].strArea}</h2>
    </div>
    </div>
    `
  }
  document.getElementById('rowData').innerHTML = cartona
}
// /////////////////////////////////////////////

async function mealsArea(area) {
  searchContainer.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let finalResponse = await response.json()
  showDataArea(finalResponse.meals)
}
function showDataArea(arrData) {
  let cartona = ""
  for (let i = 0; i <arrData.length;i++) {
    cartona += `
    <div class="col-md-3 g-4">
    <div onclick="getMealDetails('${arrData[i].strArea}')" class="items position-relative">
      <img src="${arrData[i].strMealThumb}" class="w-100" height=300px alt="">
      <div class="layer text-center">
      <h2>${arrData[i].strMeal}</h2>
      </div>
    </div>
  </div>
    `
  }
  document.getElementById('rowData').innerHTML = cartona
}
// ////////////////////////////////////// ingridiants
async function getgridin() {
  searchContainer.innerHTML = "";
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  let finalResponse = await response.json()
  console.log(finalResponse.meals);
  displayIngrid(finalResponse.meals.slice(0, 20))
}
function displayIngrid(arrData) {
  searchContainer.innerHTML = "";
  let cartona = ""
  for (let i = 0; i < arrData.length; i++) {
    cartona += `
    
    <div class="col-md-3">
          <div onclick="getIngridDetails('${arrData[i].strIngredient}')" class="ittems-ingtid text-white  text-center">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h2>${arrData[i].strIngredient}</h2>
            <p>${arrData[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div> 
    
    `
  }
  document.getElementById('rowData').innerHTML = cartona
}
async function getIngridDetails(ingrid){
  rowData.innerHTML=""
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrid}`)
  let finalResponse=await response.json()
  displayData(finalResponse.meals)
}
// ///////////////////////////// contact ////////////////////////////
function showContacts(){
  rowData.innerHTML=`
  <div class="contact d-flex justify-content-center align-items-center">
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="first">
          <input type="text" class="form-control" id="userName" placeholder="ENTRE YOUR NAME"  >
        </div>
        <div class=" bg-danger text-center py-2 rounded-1 mt-2 d-none"id="nameAlert">
          <p class=" mt-2"> Special characters and numbers not allowed</p>
      </div>
      </div>
      <div class="col-md-6">
        <div class="first">
          <input type="email" class="form-control" id="userEmail" placeholder="ENTRE YOUR E-MAIL"  >
        </div>
        <div class=" bg-danger text-center py-2 rounded-1 mt-2 d-none" id="emailAlert">
          <p class=" mt-2"> Email not valid *exemple@yyy.zzz</p>
      </div>
      </div>
      <div class="col-md-6 mt-4">
        <div class="first">
          <input type="number" class="form-control" id="userPhone" placeholder="ENTRE YOUR PHONE"  >
        </div>
        <div class=" bg-danger text-center py-2 rounded-1 mt-2 d-none" id="phoneAlert">
          <p class=" mt-2"> Enter valid Phone Number</p>
      </div>
      </div>
      <div class="col-md-6 mt-4"> 
        <div class="first">
          <input type="number" class="form-control" id="userAge" placeholder="ENTRE YOUR AGE"  >
        </div>
        <div class=" bg-danger text-center py-2 rounded-1 mt-2 d-none" id="ageAlert">
          <p class=" mt-2"> Enter valid age</p>
      </div>
      </div>
      <div class="col-md-6 mt-4"> 
        <div class="first">
          <input type="password" class="form-control" id="userPass" placeholder="ENTRE YOUR Password"  >
        </div>
        <div class=" bg-danger text-center py-2 rounded-1 mt-2 d-none" id="passwordAlert">
          <p class=" mt-2"> Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
      </div>
      </div>
      <div class="col-md-6 mt-4"> 
        <div class="first">
          <input type="password" class="form-control " id="userName" placeholder="REPSSWORD"  >
        </div>
        <div class=" bg-danger text-center py-2 rounded-1 mt-2 d-none" id="rePasswordAlert">
          <p class=" mt-2"> ENTRE SAME PASS</p>
      </div>
      </div>
      <button class="btn btn-danger w-25 mt-3">submit</button>
      </div>
  </div>
</div>
  `
}

// //////////////////////////////////////////////////////////
function showSearchInputs() {
  searchContainer.innerHTML = `
  <div class="row py-4 fixed-top w-50 mx-auto">
      <div class="col-md-6 ">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`

  rowData.innerHTML = ""
}



async function searchByName(term) {
  rowData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  let finalResponse = await response.json()
 displayData(finalResponse.meals) 
}

async function searchByFLetter(term) {
  rowData.innerHTML = ""
  term == "" ? term = "a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  response = await response.json()
 displayData(finalResponse.meals)
}
$('.links').click(function(){
  $('#leftNav').hide(200)
})
$(document).ready(function(){
  $(".spinner").fadeOut(1000,function(){
    $("loading").fadeOut(1000,  $("body").css('overflow','auto'));
  })
})