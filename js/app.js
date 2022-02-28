const searchBtn = document.querySelector('.search-btn');





//fetching data function

const getData = async(searchValue) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await response.json();
    console.log(data.data);
}



//button event listener 

searchBtn.addEventListener('click',()=>{

    const searchValue = document.querySelector('.search-input').value;
    getData(searchValue.toLowerCase());

});


