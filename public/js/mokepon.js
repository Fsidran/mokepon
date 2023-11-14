
//déclaration des constantes (const) et variables (let)
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque") //renvoi dans la variable la valeur de l'élément sélectionné par l'id
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById("boton-reiniciar")

const spanMascotaJugador = document.getElementById("mascota-jugador")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = [] //défini une variable pouvant contenir plusieurs valeurs
let mokeponesEnemigos = []
let opcionDeMokepones
let ataqueEnemigo = []
let ataqueJugador = []
let ataquesMokepon
let ataquesMokeponEnemigo

let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

let lienzo = mapa.getContext("2d") //créé un element 2d

let intervalo
let mapaBackground = new Image() //insert une image dans une variable
mapaBackground.src = "./assets/mokemap.png" //indique le lien de l'image

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

//créé une classe pour construire un objet
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        //permet de dessiner (afficher) une image avec ses caractéristiques.
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }

}

//créé les différents Mokepon grace à la classe: permet de rajouter des Mokepon facilement pour modification ultérieure du code
let hipodoge = new Mokepon("Hipodoge", "./assets/Hipodoge.png", 5, "./assets/HipodogeC.png")
let capipepo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5, "./assets/CapipepoC.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5, "./assets/RatigueyaC.png")


const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌳", id: "boton-tierra" },
]

const CAPIPEPO_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌳", id: "boton-tierra" },
    { nombre: "🌳", id: "boton-tierra" },
    { nombre: "🌳", id: "boton-tierra" },
]

const RATIGUEYA_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌳", id: "boton-tierra" },
]


//ajoute (push) les nouvelles attaques aux Mokepon
hipodoge.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

//ajoute tous les mokepones dans la variable mokepones
mokepones.push(hipodoge, capipepo, ratigueya)

//SEQUENCE 0 - à la fin du chargement de la page web, lance la fonction iniciarJuego.
window.addEventListener("load", inicarJuego)

//SEQUENCE 1 - lance le jeu
function inicarJuego() {
    sectionSeleccionarAtaque.style.display = "none" //permet de désactiver l'affiche d'une section de l'HMTL
    sectionVerMapa.style.display = "none"
    sectionReiniciar.style.display = "none"

    mokepones.forEach((mokepon) => {
        //créé pour chaque mokepon un input et une étiquette/image
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre} </p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} >
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones //modifie le HTML, pour chaque Mokepon, avec l'input et l'etiquette (image), le + permet d'ajouter plusieurs éléments

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")

    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador) //au click du bouton, lance la fonction
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

//fait appel au back-end pour définir l'id de l'utilisateur
function unirseAlJuego() {
    fetch("http://192.168.1.2:8080/unirse") //réalise une request pour retourner qqchose
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function(respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

//SEQUENCE 2 - controle quel input/Mokepon a été validé par le user
function seleccionarMascotaJugador() {
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id //.id pour renvoyer que le nom
        mascotaJugador = inputHipodoge.id
        mascotaJugadorObjeto = hipodoge
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        mascotaJugadorObjeto = capipepo
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
        mascotaJugadorObjeto = ratigueya
    } else {
        alert("no selecionnaste nada!")
        return //permet de stopper la fonction si rien n'a été sélectionné
    }

    sectionSeleccionarMascota.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

//envoi au back-end l'id
function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        mokepon: mascotaJugador
        })
    })

}

//SEQUENCE 3BIS - permet de lister dans la variable les attaques du mokepon sélectionné auparavant
function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

//SEQUENCE 3BIS - créé les boutons/affiche les attaques du mokepon sélectionné
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    //botonFuego = document.getElementById("boton-fuego") utile?
    //botonAgua = document.getElementById("boton-agua") utile?
    //botonTierra = document.getElementById("boton-tierra") utile?
    botones = document.querySelectorAll(".BAtaque") //renvoi la liste des éléments de classe BAtaque

}

//SEQUENCE 8 - sélectionne l'ordre des attaques
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                boton.style.background = "#112f58" //change la couleur du bouton
                boton.disabled = true //desactive le bouton pour qu'on ne puisse plus cliquer
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5){
                enviarAtaques()
            } 
        })
    })

}

//envoi les attaques au serveur Back-end
function enviarAtaques(){
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}/ataques`,{
        method:"post",
        headers:{"Content-Type":"application/json"
    },
        body:JSON.stringify({
            ataques:ataqueJugador
        })
    })
intervalo=setInterval(obtenerAtaques,50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.2:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if(res.ok) {
            res.json()
            .then(function({ataques}){
                if (ataques.length === 5) {
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}

//SEQUENCE 7 - enregistre quel est l'ennemi
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

//SEQUENCE 9 - sélectionne aléatoirement les attaques de l'ennemi
function ataqueAleatorioEnemigo() {

    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    iniciarPelea()
}

//SEQUENCE 10 - Vérifie si le nombre d'attaque de l'ennemi est de 5 
function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

//SEQUENCE 11 - permet de renvoyer l'attaque utilisé par le user et par l'enemi
function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

//SEQUENCE 10 - Combat, comparaison des variables pour chaque attaque de la secuencia
function combate() {
    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index);
            crearMensaje();
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index);
            crearMensaje();
            victoriasJugador++; //incrémente de 1 la variable
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index);
            crearMensaje();
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index);
            crearMensaje();
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponente(index, index);
            crearMensaje();
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVidas()
}

//SEQUENCE 13 - compare les victoires
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("esto fue un empate...")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Ganas!!")
    } else {
        crearMensajeFinal("Perdiste!!")
    }

}

//SEQUENCE 12 - renvoi dans le HMTL les attaques utilisées
function crearMensaje() {
    let NuevoAtaquesDelJugador = document.createElement("p") //crée un paragraphe
    let NuevoAtaquesDelenemigo = document.createElement("p")

    //sectionMensajes.innerHTML = resultado
    NuevoAtaquesDelJugador.innerHTML = indexAtaqueJugador
    NuevoAtaquesDelenemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(NuevoAtaquesDelJugador) //ajoute un noeud à l'élément
    ataquesDelEnemigo.appendChild(NuevoAtaquesDelenemigo)
}

//SEQUENCE 14 - créé le message final
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "block"
}

//HORS SEQUENCE - lancement suivant appel
function reiniciarJuego() {
    location.reload()
}

//HORS SEQUENCE - lancement suivant appel
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//SEQUENCE 5 - Permet d'actualiser l'image de l'objet (mokepon) et la carte, "re-imprime" sur l'ancienne image
function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX //modifie la valeur en x sur le canva de l'objet
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY //modifie la valeur en y sur le canva de l'objet
    //lienzo.clearRect(0, 0, mapa.width, mapa.height) encore utile? a priori non car on re-imprime
//affiche la carte (background)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
//affiche les mokepon
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}



//envoi au back-end les coordonées du mokepon
function enviarPosicion(x, y) {
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "content-Type":"application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo)
                    {
                        let mokeponEnmigo = null
                        if(enemigo.mokepon != undefined)
                        {
                            const mokeponNombre = enemigo.mokepon.nombre 
                            switch (mokeponNombre)
                            {
                            case "Hipodoge":
                                mokeponEnemigo = new Mokepon("Hipodoge", "./assets/Hipodoge.png", 5, "./assets/HipodogeC.png", enemigo.id)
                                    break
                                case "Capipepo":
                                    mokeponEnemigo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5, "./assets/CapipepoC.png", enemigo.id)
                                    break
                                case "Ratigueya":
                                    mokeponEnemigo = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5, "./assets/RatigueyaC.png", enemigo.id)
                                    break
                                default:
                                    break
                            }
                    
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        }
                            return mokeponEnemigo
                    })
                })
            }
        })
    }




//HORS SEQUENCE - lancement suivant appel
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

//HORS SEQUENCE - lancement suivant appel
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

//HORS SEQUENCE - lancement suivant appel
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

//HORS SEQUENCE - lancement suivant appel
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

//HORS SEQUENCE - lancement suivant appel
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

//HORS SEQUENCE - lancement suivant appel
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break;
    }

}

//SEQUENCE 3 - permet d'afficher la carte de jeu et de déplacer les mokepon grace aux fonctions appelées
function iniciarMapa() {
//    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50) //permet d'appeler une fonction toutes les 50ms, attention, il faut annuler l'intervale par un clearInterval... on le met dans une variable pour pouvoir stopper l'appel avec un ClearInterval faisant référence à cette variable - utile si plusieurs setinterval dans un meme script

    window.addEventListener("keydown", sePresionoUnaTecla) //à chaque appui de touche, appelle la fonction
    window.addEventListener("keyup", detenerMovimiento) //à chaque relaché de touche, appelle la fonction
}

//SEQUENCE 4 - renvoi l'objet Mokepon, plus utile, défini directement dans la séquence 2
/* function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
} */

//SEQUENCE 6 - Vérifie si il y a une colision entre 2 éléments du canva
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return; //l'execution de la fonction est stoppé si une des conditions est vraie
    }

    detenerMovimiento
    clearInterval(intervalo) //stop l'appel récurrent de la fonction
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}