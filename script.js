let main = document.getElementById('main')
let text = document.getElementById('search-text')
let button = document.getElementById('search-button')
let num = 0
let url_array = []
button.onclick = () => {
    fetchOnClick();
}
text.onchange = () => {
    fetchOnClick();
}

function fetchOnClick() {
    if(text.value.length!=0){
        url_array = []
    fetch("https://api.jikan.moe/v3/search/anime?q=" + text.value + "&page=1")
        .then(res => res.json())
        .then(anime => {
            clearInterval(interval)
            while (main.firstChild) {
                main.removeChild(main.firstChild)

            }
            console.log(anime)
            for(let i=0;i<anime.results.length;i++){
                url_array.push(anime.results[i].image_url)
                let div = document.createElement('div')
                let image = document.createElement('img')
                let title = document.createElement('h4')
                image.onclick = () => {
                    for(let i=0;i<url_array.length;i++){
                        if(image.src == url_array[i]){
                            sessionStorage.setItem('id', anime.results[i].mal_id)
                            window.location.href = "zoom.html"
                        }
                        
                    }
                    
                }
                
                main.appendChild(div)
                div.classList.add('div')
                div.appendChild(image)
                div.appendChild(title)
                title.textContent = anime.results[i].title
                image.src = anime.results[i].image_url

            }

        })
    }
    else{
        window.location.reload();
    }
    
}

function fetchAnime() {
    num += 1
    let div = document.createElement('div')
    let img = document.createElement('img')
    let title = document.createElement('h3')
    main.appendChild(div)
    img.style.height = "60%"
    img.style.width = "100%"
    fetch("https://api.jikan.moe/v3/anime/" + num)
        .then(res => res.json())
        .then(anime => {
            console.log(anime)
            div.onclick = () => {
                sessionStorage.setItem('id', anime.mal_id)
                window.location.href = "zoom.html"
            }
            div.appendChild(img)
            div.appendChild(title)
            title.textContent = anime.title
            img.src = anime.image_url
            div.classList.add("div")
            if (anime.image_url == null) {
                main.removeChild(div)
            }
        }).catch(() => {
            if (main.contains(div)) {
                main.removeChild(div)

            }
            console.log("oh man")
        })

}

var interval = setInterval(fetchAnime, 100)