var btn = document.querySelector('button')
var input = document.querySelector('input')
var wrapper = document.querySelector('.recherche__wrapper')
var wrapperSearch = document.querySelector('.input__wrapper')


function chercher() {
   var inputValue = input.value;
   wrapper.innerHTML = "";

   if(input.value != "") {
      wrapperSearch.style.height = "50vh";
      wrapper.style.display = "grid";
      input.classList.remove("attention");

      const options = {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': 'e550cbca76msh819fe71e84cde48p1b8e8ejsnb07b3d4756f0',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
         }
      };

      fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${inputValue}`, options)
      .then(response => response.json())
      .then(response => {
         console.log(response);
            for (var i = 0 ; i < 24 ; i++){
               if (response.data[i].album && response.data[i].album.cover_xl) {
                  var rechercherInfo = 
                  `
                  <div class="recherche"  style="background: url(${response.data[i].album.cover_xl})no-repeat center/cover;">
                  <div class="artiste">Artiste : ${response.data[i].artist.name}</div>
                  <div class="Titre">Titre : ${response.data[i].title} (${(response.data[i].duration/60).toFixed(2).replace(".", "min")})</div>
                  <div class="img">
                  <img src="${response.data[i].album.cover}" alt="">
                  </div>
                  <audio controls src="${response.data[i].preview}"></audio>
                  </div>
                  `
                  wrapper.innerHTML += rechercherInfo;
               }
            }
      })
      .catch(err => console.error(err));

      input.value = "";
   }
   else {
      input.classList.add("attention");
   }
}


/////lancer la fonction de recherche/////
document.addEventListener("keydown", function(enter){
   if(enter.key === "Enter") {  
      chercher()
   }
});
btn.addEventListener("click", function(){
   chercher()
});
