const searchBtn = document.querySelector('.search-btn');
const mobileContainer = document.querySelector('#mobile-container');
const seeMoreBtn = document.querySelector('.see-more-btn');
const invaildInput = document.querySelector('.invaild-input');
const successInput = document.querySelector('.success-input');
const successInputValue = successInput.children[0];
const noResultsFound = document.querySelector('.no-results-input');
const moreDetailContainer = document.querySelector('.detail-container');



//close button of moredetails


const removeMoredetails = () =>{
  moreDetailContainer.textContent = '';
}


//display more data if moredetails button is clicked

const displayMoreDetails = (moredata) =>{
    moreDetailContainer.textContent = '';
    const div = document.createElement('div');
    const sensors = moredata.mainFeatures.sensors;
    let others = [];
    let release;
    if(moredata.releaseDate === null || moredata.releaseDate === undefined || moredata.releaseDate === ''){
        release = 'No Release Date Found'
    }else{
      release = moredata.releaseDate;
    }

    //loping over other object and putting values to an array;
    if(moredata.others === undefined || moredata.others === null) {
      others = []
    }else{
      for (const [key, value] of Object.entries(moredata.others)) {
        others.push(`${key}: ${value}`);
      }

    }

   


    div.classList.add('detail-card');
    div.innerHTML =`
    <div class="card mb-3" style="max-width:840px;">
    <span id="close-btn" onclick="removeMoredetails()">X</span>
    <div class="row g-0">
      <div class="col-md-5 col-sm-12 d-flex justify-content-center align-items-center p-4">
        <img src="${moredata.image}" alt="" class="img-fluid">
      </div>
      <div class="col-md-7 col-sm-12">
        <div class="card-body">
          <h3 class="card-title text-center fw-bold __p-color"> ${moredata.name}</h3>
          <h5 class="card-brand text-center mb-3">Brand : ${moredata.brand}</h5>
          <div class="card-text fs-6"> 
          <p> <span class="fw-bold">Chipset :</span> ${moredata.mainFeatures.chipSet} </p>
          <p> <span class="fw-bold">Display :</span> ${moredata.mainFeatures.displaySize}  </p>
          <p> <span class="fw-bold">Memory :</span> ${moredata.mainFeatures.memory}  </p>
          <p> <span class="fw-bold">Sensors :</span> ${sensors.map((sensor) => sensor) }  </p>
          <p> <span class="fw-bold">Others :</span> ${others.map((other)=>other)}  </p>
          <p> <span class="fw-bold">Release Date :</span> ${release} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    `
    moreDetailContainer.appendChild(div);

}



// -----------------------OPTIONAL FUNCTION STARTS ------------------------------------------------------------


//get all mobiles data of a mobile by clicking button

const getMoreData = async (mobileId) => {
    moreDetailContainer.scrollIntoView();
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${mobileId}`)
    const data = await response.json();
    displayMoreDetails(data.data);
}

 

const showAll = ()=>{
  fetchDataforShowAll(globalSearchValue);

}

const displayAllData = async (displayalldata) => {
  const mobiles = displayalldata.data;

  mobileContainer.textContent = '';
  document.querySelector('.search-input').value = '';
  for(mobile of mobiles){
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
      <div class="__card mx-auto">
      <div class="__img-container">
      <img src="${mobile.image}" alt="" class="img-fluid">
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="__name">
      <h5>${mobile.phone_name}</h5>
      <p class = 'fs-6 text-center'> Brand : ${mobile.brand} </p>
      </div>
       <div class="details-btn-container"><button class="__btn" onclick="getMoreData('${mobile.slug}')">More Details</button></div>
      </div>
      </div>
      `
      mobileContainer.appendChild(div);

  }
  seeMoreBtn.classList.add('d-none');

}

const fetchDataforShowAll = async(showalldata) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${showalldata}`);
  const data = await response.json();
  displayAllData(data)
}



// --------------------------------OPTIONAL FUNCTIONS ENDS-------------------------------------------








//displaying data 
const displayData = (data) => {
   
    if(data.length > 0) {
        mobileContainer.textContent = '';
        const mobiles = data.slice(0,20);
        document.querySelector('.search-input').value = '';
        for(mobile of mobiles){
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="__card mx-auto">
            <div class="__img-container">
            <img src="${mobile.image}" alt="" class="img-fluid">
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center">
            <div class="__name">
            <h5>${mobile.phone_name}</h5>
            <p class = 'fs-6 text-center'> Brand : ${mobile.brand} </p>
            </div>
             <div class="details-btn-container"><button class="__btn" onclick="getMoreData('${mobile.slug}')">More Details</button></div>
            </div>
            </div>
            `
            mobileContainer.appendChild(div);
    
        }
        if(data.length > 20){
          seeMoreBtn.classList.remove('d-none');
        }
        //ERROR-HANDLING
       
        successInput.classList.remove('d-none');
        noResultsFound.classList.add('d-none');

    }else{
        mobileContainer.textContent = '';
        //ERROR-HANDLING
        noResultsFound.classList.remove('d-none');
        successInput.classList.add('d-none');
        seeMoreBtn.classList.add('d-none');

    }





}







//fetching data function

const getData = async(value) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);
    const data = await response.json();
    displayData(data.data);
    
}



//button event listener 

searchBtn.addEventListener('click',()=>{
    const searchValue = document.querySelector('.search-input').value;
    globalSearchValue = searchValue;
    if(searchValue.length > 0) {
        //ERROR-HANDLING
        invaildInput.classList.add('d-none');
        successInputValue.innerText = searchValue;
        //CALLING THE FETCH FUNCTION
        getData(searchValue.toLowerCase());
       
    }
    else{
        //ERROR-HANDLING
        invaildInput.classList.remove('d-none');
        mobileContainer.textContent = '';
        seeMoreBtn.classList.add('d-none');
        successInput.classList.add('d-none');
    }
    

});







