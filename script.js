let num = 0

button.addEventListener('click' , ()=>{
    
})

setInterval(()=>{
    let div = document.createElement("div")
    let p = document.createElement("p")
    let p2 = document.createElement("p")
    let image = document.createElement("img")
    let themes = document.createElement("p")
    let time_duration = document.createElement("p")
    document.body.appendChild(div)
    div.classList.add("class")
    div.appendChild(image)
    div.appendChild(themes)
    div.appendChild(p2)
    div.appendChild(time_duration)
    div.appendChild(p)
   
    p2.classList.add("p")
    num = num+1
    fetch("https://api.jikan.moe/v3/anime/" + num).then(response=>{
        return response.json()
        }).then(blob=>{
            p2.innerHTML = blob.title
           image.src = blob.image_url
           console.log(blob.image_url)
           themes.innerHTML =  "Opening Themes: "+ blob.opening_themes + "\n"
           time_duration.innerHTML = "Total episodes:" + blob.episodes
           p.innerHTML = blob.synopsis
           //    time_duration.innerHTML = blob.prop.from.day + "/" + blob.prop.from.month + "/" + blob.prop.from.year + "-" + + blob.prop.to.day + "/" + blob.prop.to.month + "/" + blob.prop.to.year
           if(p.innerHTML=="undefined"){
               console.log("empty")
               document.body.removeChild(div)
           }
        }).catch(()=>{
            num = num+1
            document.body.removeChild(div)
        })
},100)
