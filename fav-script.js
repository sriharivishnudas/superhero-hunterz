//to load favourites
let myfav_superhero = localStorage.myfav_superhero.split(',');
//global variables
let gallery = document.getElementById('gallery');
const ts = '1690139129719'
const public_key = '4279055bc547897f4f7e827107d35f17';
const private_key = 'f40fc3fce8fe96a6e20d6c668f0f9e5e00656ac0';
const md5_var = '547765bcf4f83c6fa811681ad4ac748e'

//to load favourites
loadFavourties = async () => {
    gallery.innerHTML = '';
    for (let i = 0; i < myfav_superhero.length; i++) {
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${md5_var}&name=${myfav_superhero[i]}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        let div = document.createElement("div");
        div.classList.add('list');
        div.innerHTML = `<img src=${jsonData.data['results'][0].thumbnail.path}.${jsonData.data['results'][0].thumbnail.extension}>
    <p><b>${jsonData.data['results'][0].name}</b></p> <button class="like-button"> <i data-id="${jsonData.data['results'][0].name}" class="fa-solid fa-heart heart liked"></i> </button>`
        gallery.appendChild(div);
    }
}

loadFavourties();

//to remove character from favourites
function removeFromFavourites(target) {
    const id = target.dataset.id;
    myfav_superhero = myfav_superhero.filter(e => e !== id);
    target.classList.remove('liked');
    localStorage.setItem("myfav_superhero", myfav_superhero);
    loadFavourties();
}

//delegate event of the document
function delegateEvent(e) {
    const target = e.target;
    console.log(target);
    if (target.className == 'fa-solid fa-heart heart liked') {
        console.log('Remove from favourites');
        removeFromFavourites(target);
    }
}


document.addEventListener('click', delegateEvent)