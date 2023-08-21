const w = 79
const h = 79
const icons = 9
const time = 100
const sloted = [0,0,0]
let sloted_names = ["","",""]
const icons_map = ["banana","7","cereja","uva","laranja","sino","bar","limao","melancia"]
const nome = document.getElementById("nome")
const premio = document.getElementById("premio")

const roll = (reel, offset = 0) => {
    const delta = (offset +2) * icons + Math.round(Math.random() * icons)
    const y = isNaN(parseFloat(reel.style.backgroundPositionY.split('px')[0])) ? 0 : parseFloat(reel.style.backgroundPositionY.split('px')[0])
    
    return new Promise ((resolve, reject) => {
        reel.style.transition = 'background-position-y ' + (8 + delta * time) + 'ms cubic-bezier(.53,-0.22,.52,1.2)'
        reel.style.backgroundPositionY = (y + delta * h) + 'px'
        console.log()
        
        setTimeout(() => {
            resolve(delta%icons)
        },8 + delta * time) 
    })
}

function rollall() {
    const reels = [...document.querySelectorAll('.reel')]
    premio.textContent = "RODANDO"
    
    Promise
        .all(reels.map((reel,i) => roll(reel,i)))
        .then((deltas) => {
            deltas.forEach((delta, i) => sloted[i] = (sloted[i] + delta)%icons)
            sloted_names = sloted.map((i) =>{return icons_map[i]})
            console.log(sloted_names)

            if(sloted[0] == sloted[1] || sloted[0] == sloted[2] || sloted[1] == sloted[2]){
                premio.textContent = "PARABENS VC GANHOU PORRA NENHUMA"
            }
            else{
                premio.textContent = "NÃO FOI DESSA VEZ"
            }
        })
        
}

setInterval(() => {
    fetch('http://localhost:8000/lastslot')
        .then(res => res.text())
        .then(text => {
            console.log(text)
            if(!(text === "")){
                rollall()
                nome.textContent = text
            }
        })
}, 5000)