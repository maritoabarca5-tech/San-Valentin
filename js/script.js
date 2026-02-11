const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const imagen = document.getElementById("imagenReal");
const musica = document.getElementById("musica");
const scratchSound = document.getElementById("scratchSound");
const mensajeFinal = document.getElementById("mensajeFinal");

let raspando = false;
let revelado = false;

/* INICIAR CUANDO TODO CARGUE */
window.addEventListener("load", () => {
    canvas.width = imagen.offsetWidth;
    canvas.height = imagen.offsetHeight;

    ctx.fillStyle = "#5a001f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "destination-out";
});

/* EMPEZAR A RASCAR */
canvas.addEventListener("mousedown", () => {
    if (revelado) return;

    raspando = true;
    musica.play();

    scratchSound.loop = true;
    scratchSound.currentTime = 0;
    scratchSound.play();
});

/* DETENER */
canvas.addEventListener("mouseup", () => {
    raspando = false;
    scratchSound.pause();
});

/* RASPAR */
canvas.addEventListener("mousemove", (e) => {
    if (!raspando || revelado) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    verificarProgreso();
});

/* VERIFICAR PROGRESO */
function verificarProgreso() {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentes = 0;
    let total = 0;

    for (let i = 3; i < pixels.data.length; i += 80) {
        total++;
        if (pixels.data[i] === 0) {
            transparentes++;
        }
    }

    let porcentaje = transparentes / total;

    // Cambiar de 0.65 a 0.95 (95% raspado)
    if (porcentaje > 0.95) {
        revelado = true;
        scratchSound.pause();
        canvas.style.display = "none";
        mensajeFinal.style.display = "block";
    }
}



/* BOTON SI */
function respuestaSi() {
    document.getElementById("modalRosa").style.display = "flex";
}


/* BOTON NO QUE HUYE */
const botonNo = document.querySelector("button:last-of-type");
const contenedor = document.querySelector(".container");

botonNo.addEventListener("mouseover", () => {
    const contRect = contenedor.getBoundingClientRect();

    const maxX = contRect.width - botonNo.offsetWidth;
    const maxY = contRect.height - botonNo.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    botonNo.style.position = "absolute";
    botonNo.style.left = x + "px";
    botonNo.style.top = y + "px";
});




/* CORAZONES FLOTANDO */
function crearCorazon() {
    const corazon = document.createElement("div");
    corazon.classList.add("corazon");
    corazon.innerHTML = "❤";
    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = (Math.random() * 20 + 15) + "px";
    corazon.style.animationDuration = (Math.random() * 5 + 5) + "s";
    document.querySelector(".corazones").appendChild(corazon);


    setTimeout(() => {
        corazon.remove();
    }, 10000);
}

setInterval(crearCorazon, 600);

document.getElementById("modalRosa").addEventListener("click", () => {
    document.getElementById("modalRosa").style.display = "none";
});
