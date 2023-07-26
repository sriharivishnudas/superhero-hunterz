//global variables

const ts = '1690139129719'
const public_key = '4279055bc547897f4f7e827107d35f17';
const private_key = 'f40fc3fce8fe96a6e20d6c668f0f9e5e00656ac0';
const md5_var = '547765bcf4f83c6fa811681ad4ac748e'

let listContainer = document.querySelector('.list');
let input = document.querySelector('.input');

let myfav_superhero = []
if ('myfav_superhero' in localStorage && localStorage.myfav_superhero != '') {
    myfav_superhero = localStorage.myfav_superhero.split(',');
}




superhero_list = document.getElementsByClassName('superhero-img');

//to genereate a random character ID
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



//to load a list of random characters on home page
defaultHeroes = async () => {
    for (let i = 0; i < superhero_list.length; i++) {
        let characterExists = false;
        let jsonData;
        while (characterExists == false) {
            let id = String(getRndInteger(1009351, 1009664))
            const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${public_key}&hash=${md5_var}`
            const response = await fetch(url);
            jsonData = await response.json();
            console.log(jsonData.data)
            if (jsonData.code == 200) {
                characterExists = true;
            }
        }
        superhero_list[i].innerHTML = `<img src=${jsonData.data['results'][0].thumbnail.path}.${jsonData.data['results'][0].thumbnail.extension}>
    <div class="superhero-name"><p><b>${jsonData.data['results'][0].name}</b></p></div>`
    }
}

defaultHeroes();


//to search characters
function displayWords(value) {
    input.value = value;
    removeElements();
}
function removeElements() {
    listContainer.innerHTML = "";
}
input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.length < 4) {
        return false;
    }
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${md5_var}&nameStartsWith=${input.value}&limit=5`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");
        if (myfav_superhero.includes(name)) {
            div.innerHTML = `<a href="detail.html" target="_blank"><p class="item" data-id="${name}">${name}</p> </a><button class="like-button"> <i data-id="${name}" class="fa-solid fa-heart heart liked"></i> </button>`;
        }
        else {
            div.innerHTML = `<a href="detail.html" target="_blank"><p class="item" data-id="${name}">${name}</p> </a><button class="like-button"> <i data-id="${name}" class="fa-solid fa-heart heart"></i> </button>`;
        }
        listContainer.appendChild(div);
    });
});

//to add a character to favourites
function addToFavourites(target) {
    const id = target.dataset.id;
    myfav_superhero.push(id);
    target.classList.add('liked');
    localStorage.setItem("myfav_superhero", myfav_superhero);
}

//to remove a character from favourites
function removeFromFavourites(target) {
    const id = target.dataset.id;
    myfav_superhero = myfav_superhero.filter(e => e !== id);
    target.classList.remove('liked');
    localStorage.setItem("myfav_superhero", myfav_superhero);
}

//delegate event over the document
function delegateEvent(e) {
    const target = e.target;
    console.log(target);
    if (target.className == 'item') {
        const id = target.dataset.id;
        localStorage.setItem("inputValue", id);
    }
    if (target.className == 'fa-solid fa-heart heart liked') {
        console.log('Remove from favourites');
        removeFromFavourites(target);
    }
    else if (target.className == 'fa-solid fa-heart heart') {
        console.log('Clicked on make a favourite')
        addToFavourites(target);
    }

}


document.addEventListener('click', delegateEvent)



