const searchBtn = document.querySelector('.search-btn');
const mobileContainer = document.querySelector('#mobile-container');
const seeMoreBtn = document.querySelector('.see-more-btn');
const invaildInput = document.querySelector('.invaild-input');
const successInput = document.querySelector('.success-input');
const successInputValue = successInput.children[0];
const noResultsFound = document.querySelector('.no-results-input');







//display more data if moredetails button is clicked

const displayMoreDetails = (moredata) =>{
    console.log(moredata);
}






//get more data of a mobile by clicking button

const getMoreData = async (mobileId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${mobileId}`)
    const data = await response.json();
    displayMoreDetails(data.data);
  
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


