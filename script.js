let oras = document.getElementById("oras");

let buton = document.getElementById("buton");

let rezultat = document.getElementById("rezultat");

buton.addEventListener("click", vreme);

async function vreme(){

    let orasScris = oras.value;

    if(orasScris===""){

        rezultat.innerHTML="Introdu un oraș!";

        return;

    }

    let raspuns = await fetch(

        "https://wttr.in/" + orasScris + "?format=j1"

    );

    let date = await raspuns.json();

    rezultat.innerHTML =

    `
        <h2>${orasScris}</h2>

        <h3>${date.current_condition[0].temp_C} °C</h3>

        <p>${date.current_condition[0].weatherDesc[0].value}</p>

        <p>Umiditate:
        ${date.current_condition[0].humidity}%</p>

        <p>Vânt:
        ${date.current_condition[0].windspeedKmph} km/h</p>
    `;

}