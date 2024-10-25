let form = document.getElementById("form");
form.addEventListener("submit", function(event){
    event.preventDefault()//Impede que a ação aconteça de forma síncrona
    let dadosform = new FormData(form)
    buscarFilmes(dadosform.get("nome"))
})

function buscarFilmes(nomeFilme){

  let urlApi = new URL("https://api.themoviedb.org/3/search/movie")
  urlApi.searchParams.append('query', nomeFilme);
  urlApi.searchParams.append('include_adult', false);
  urlApi.searchParams.append('language', "pt-BR");
  urlApi.searchParams.append('page', 1);
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDIzNTE1ZjBlZjU5NDRlNDNjZjVkZGZhZGRiNGE0OSIsIm5iZiI6MTcyNTY3MTk1MC45MjQzNDQsInN1YiI6IjY2NDM2YzUxZTg2YmQzMTBiYTE4NWU3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4OIRgnTzq0x9LA5xZnkgqZoFOYJqqQKq7UMhl9xjwI'
    }
  };
  
  fetch(urlApi, options)
   .then(response => {

    let resultado = document.getElementById("resultado");

    if(response.ok==true)
      {
        resultado.innerHTML = null;
        return response.json();
      }
      else{
        resultado.innerText ="Não foi possivel";
      }
   })
   .then(data =>{
    console.log(data)
    let filmes = data.results
    filmes.forEach(filme =>{


      let poster = document.createElement('img')
      poster.src = "https://image.tmdb.org/t/p/w500/"+filme.poster_path
      poster.title = filme.title;
      poster.alt = filme.title;
      poster.classList.add('imagem')

      let divImagem = document.createElement('div')
      divImagem.appendChild(poster)
      divImagem.classList.add('divimagem')

      let elementTitulo = document.createElement('h2')
      elementTitulo.innerText = filme.title

      let elementoSinopse = document.createElement('p')
      elementoSinopse.innerText = filme.overview

      let divConteudo = document.createElement('div')
      divConteudo.appendChild(elementTitulo)
      divConteudo.appendChild(elementoSinopse)
      divConteudo.classList.add('divconteudo')

      let divFilme = document.createElement('div')
      divFilme.appendChild(divImagem)
      divFilme.appendChild(divConteudo)
      divFilme.classList.add('divfilme')

      resultado.append(divFilme)
      let elementDivisor = document.createElement('hr')
      resultado.append(elementDivisor)
      

      


    });
  })

}









//let resultados = document.getElementById("infofilm");
//resultados.addEventListener(MouseEvent(matchMedia, moveBy, MouseEvent), function()
//{
 // resultados.computedStyleMap.apply
//});
