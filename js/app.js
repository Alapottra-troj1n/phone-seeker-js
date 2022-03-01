const searchBtn = document.querySelector('.search-btn');
const mobileContainer = document.querySelector('#mobile-container');
const seeMoreBtn = document.querySelector('.see-more-btn');
const invaildInput = document.querySelector('.invaild-input');
const successInput = document.querySelector('.success-input');
const successInputValue = successInput.children[0];
const noResultsFound = document.querySelector('.no-results-input');
const moreDetailContainer = document.querySelector('.detail-container');


// brand: "Samsung"
// image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-5g.jpg"
// mainFeatures:
// chipSet: "Exynos 2200 (4 nm) - EuropeQualcomm SM8450 Snapdragon 8 Gen 1 (4 nm) - ROW"
// displaySize: "6.1 inches, 90.1 cm2 (~87.4% screen-to-body ratio)"
// memory: "128GB 8GB RAM, 256GB 8GB RAM"
// sensors: (7) ['Fingerprint (under display', 'ultrasonic)', 'accelerometer', 'gyro', 'proximity', 'compass', 'barometer']
// storage: "128GB/256GB storage, no card slot"
// [[Prototype]]: Object
// name: "Galaxy S22 5G"
// others: {WLAN: 'Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct, hotspot', Bluetooth: '5.2, A2DP, LE', GPS: 'Yes, with A-GPS, GLONASS, BDS, GALILEO', NFC: 'Yes', Radio: 'No', …}
// releaseDate: "Released 2022, February 25"
// slug: "samsung_galaxy_s22_5g-11253"




//display more data if moredetails button is clicked

const displayMoreDetails = (moredata) =>{
    moreDetailContainer.textContent = '';
    const div = document.createElement('div');
    const sensors = moredata.mainFeatures.sensors;
    let others = [];
    const data = moredata;
    console.log(data);
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
          <p> <span class="fw-bold">Release Date :</span> ${moredata.releaseDate} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    `
    moreDetailContainer.appendChild(div);

}






//get more data of a mobile by clicking button

const getMoreData = async (mobileId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${mobileId}`)
    const data = await response.json();
    displayMoreDetails(data.data);
    console.log(data.data)
  
}









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
        //ERROR-HANDLING
        seeMoreBtn.classList.remove('d-none');
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


