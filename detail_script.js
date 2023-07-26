//to fetch the character name
window.onload = console.log(localStorage.getItem("inputValue"));

//global variables
const ts = '1690139129719'
const public_key = '4279055bc547897f4f7e827107d35f17';
const private_key = 'f40fc3fce8fe96a6e20d6c668f0f9e5e00656ac0';
const md5_var = '547765bcf4f83c6fa811681ad4ac748e'
let superhero = localStorage.getItem("inputValue");

let heroName = document.getElementById("hero-name");


//to load details of the character
heroDetails = async () => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${md5_var}&name=${superhero}`
    const response = await fetch(url);
    const jsonData = await response.json();
    //setting name
    heroName.innerHTML = jsonData.data['results'][0].name;
    //setting image
    document.getElementById('profile-pic').innerHTML = `<img src=${jsonData.data['results'][0].thumbnail.path}.${jsonData.data['results'][0].thumbnail.extension}>`
    //setting description
    document.getElementById('bio').innerHTML = jsonData.data['results'][0].description;
    //setting comics
    let limit = 0;
    if (jsonData.data.results[0].comics.returned > 5) {
        limit = 5;
    }
    else {
        limit = jsonData.data.results[0].comics.returned;
    }
    for (var i = 0; i < limit; i++) {
        document.getElementById('comics').innerHTML = document.getElementById('comics').innerHTML + `${i + 1}. ${jsonData.data.results[0].comics.items[i].name} <br>`;
    }
    //setting Events
    if (jsonData.data.results[0].events.returned > 5) {
        limit = 5;
    }
    else {
        limit = jsonData.data.results[0].events.returned;
    }
    for (var i = 0; i < limit; i++) {
        document.getElementById('events').innerHTML = document.getElementById('events').innerHTML + `${i + 1}. ${jsonData.data.results[0].events.items[i].name} <br>`;
    }
    //setting StoryLines
    if (jsonData.data.results[0].stories.returned > 5) {
        limit = 5;
    }
    else {
        limit = jsonData.data.results[0].stories.returned;
    }
    for (var i = 0; i < limit; i++) {
        document.getElementById('storylines').innerHTML = document.getElementById('storylines').innerHTML + `${i + 1}. ${jsonData.data.results[0].stories.items[i].name} <br>`;
    }
}

heroDetails();

