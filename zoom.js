let id = sessionStorage.getItem('id')
let image = document.createElement('img')
let title = document.createElement('h1')
let rating = document.createElement('p')
let ep = document.createElement('h4')
let synopsis = document.createElement('h5')
let link = document.createElement('a')
let type = document.createElement('h4')
let airing = document.createElement('h4')
let theme_div = document.createElement('div')
let opening_div = document.createElement('div')
let ending_div = document.createElement('div')

image.style.margin = "20px"
synopsis.style.margin = "20px"

document.body.appendChild(image)
document.body.appendChild(rating)
document.body.appendChild(type)
document.body.appendChild(title)
document.body.appendChild(theme_div)
document.body.appendChild(ep)
document.body.appendChild(link)
document.body.appendChild(airing)
document.body.appendChild(synopsis)

image.style.height = 'auto'
image.style.width = 'auto'
console.log(id)

theme_div.classList.add('div2')
theme_div.appendChild(opening_div)
theme_div.appendChild(ending_div)


fetch("https://api.jikan.moe/v3/anime/" + id)
    .then(res => res.json())
    .then(anime => {
        console.log(anime)
        link.href = anime.url
        link.innerText = anime.url
        type.textContent = "Type: " + anime.type
        link.style.width = "50px"
        ep.textContent = "Total Episodes: " + anime.episodes
        rating.textContent = anime.rating

        for (let i = 0; i < anime.opening_themes.length; i++) {
            let op = document.createElement('p')
            opening_div.appendChild(op)
            op.textContent = anime.opening_themes[i]
        }

        for (let i = 0; i < anime.ending_themes.length; i++) {
            let op = document.createElement('p')
            ending_div.appendChild(op)
            op.textContent = anime.ending_themes[i]
        }
        title.textContent = anime.title
        image.src = anime.image_url
        synopsis.textContent = anime.synopsis
        if(anime.type != "Movie" ){
            airing.textContent = anime.aired.prop.from.day + "/" + anime.aired.prop.from.month + "/" + anime.aired.prop.from.year + "-" + anime.aired.prop.to.day + "/" + anime.aired.prop.to.month + "/" + anime.aired.prop.to.year
        }
        else{
            airing.textContent = "Released: "+anime.aired.prop.from.day + "/" + anime.aired.prop.from.month + "/" + anime.aired.prop.from.year
       
        }
        document.title = anime.title
        if (anime.type == "Movie") {
            document.body.removeChild(ep)
        }
    })