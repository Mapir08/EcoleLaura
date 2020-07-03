const btnSuivant = document.getElementById('pupitre__btnSuivant');
const btnRetour = document.getElementById('pupitre__btnRetour');
const tableau = document.getElementById('tableau');
let compteur = document.getElementById('pupitre__compteur');
let choixMenu = 0;
let chiffre1;
let chiffre2;
let signe;
let resultatReel;
const calculPose = "\
<form id='tableau__pose'>\
    <div id='ligneChiffre1'>\
        <label class='chiffre' id='c1'></label>\
        <label class='chiffre' id='d1'></label>\
        <label class='chiffre' id='u1'></label>\
    </div>\
    <div id='ligneChiffre2'>\
        <label class='chiffre' id='signe'></label>\
        <label class='chiffre' id='c2'></label>\
        <label class='chiffre' id='d2'></label>\
        <label class='chiffre' id='u2'></label>\
    </div>\
    <div id='ligneResultat'>\
        <input class='result' id='mR'></input>\
        <input class='result' id='cR'></input>\
        <input class='result' id='dR'></input>\
        <input class='result' id='uR'></input>\
    </div>\
</form>"; // Ajouter les reports tous au même endroit et les placer en CSS

// Cache affiche les décors à droite :
function decorVisible(value) {
    if (value) {
        document.getElementById('postit').style.display = "block";
        document.getElementById('decor').style.display = "block";
        tableau.style.width = "484px";
    } else {
        document.getElementById('postit').style.display = "none";
        document.getElementById('decor').style.display = "none";
        tableau.style.width = "640px";
    }
}
// Calculs automatique :
function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function randPlusMoins() {
    let a = 1,
        b = '+-',
        c = '',
        d = 0,
        e = '' + b;
    for (; d < a; d++) {
        c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
}
function calculResultat(v1, v2, s) {
    if (s == "-") {
        return v1 - v2;
    } if (s == "+") {
        return v1 + v2;
    } if (s == "x") {
        return v1 * v2;
    } else {
        return 0;
    }
}
// Valeurs entrés : FONCTIONNE PAS ???????
function resultatEntre() {
    let m = document.getElementById('mR').value;
    let c = document.getElementById('cR').value;
    let d = document.getElementById('dR').value;
    let u = document.getElementById('uR').value;
    return (m * 1000) + (c * 100) + (d * 10) + u;
}
// Affichage des chiffres divisé ET calcul du résultat :
function randomTous(quoi) {
    if (quoi == 'plusmoins') {
        signe = randPlusMoins();
        chiffre1 = getRandInt(10, 999);
        chiffre2 = getRandInt(10, 999);
    } if (quoi == 'fois') {
        signe = 'x';
        chiffre1 = getRandInt(10,999);
        chiffre2 = getRandInt(2, 9);
    }
        afficherChiffre(chiffre1, chiffre2, signe);
        document.querySelector("#signe").textContent = signe;
}// PROBLEME avec le calcul lors des MOINS
function afficherChiffre(v1, v2, s) {
    let checked ;
    if (s == '-') {
        checked = checkOrdreMoins(v1,v2);
    } else {
        checked = {v1: v1, v2: v2};
    }
    let chiffre1Divise = diviserChiffre(checked.v1);
    let chiffre2Divise = diviserChiffre(checked.v2);
    document.querySelector("#c1").textContent = Math.trunc(chiffre1Divise.c);
    document.querySelector("#d1").textContent = Math.trunc(chiffre1Divise.d);
    document.querySelector("#u1").textContent = Math.trunc(chiffre1Divise.u);
    document.querySelector("#c2").textContent = Math.trunc(chiffre2Divise.c);
    document.querySelector("#d2").textContent = Math.trunc(chiffre2Divise.d);
    document.querySelector("#u2").textContent = Math.trunc(chiffre2Divise.u);
    resultatReel = calculResultat(v1, v2, s);
    if (c1.textContent == 0) {
        c1.textContent = "";
        if (d1.textContent == 0) {
            d1.textContent = "";
        }
    }
    if (c2.textContent == 0) {
        c2.textContent = "";
        if (d2.textContent == 0) {
            d2.textContent = "";
        }
    }
}
function diviserChiffre(value) {
    let c = value / 100 % 10;
    let d = value / 10 % 10;
    let u = value % 10;
    return { c: c, d: d, u: u };
}
function checkOrdreMoins(v1, v2) {
    if (v1 < v2) {
        return {v1: v2, v2: v1}
    } else {
        return {v1: v1, v2: v2}
    }
}
// Afficher bouton Suivant / Précedent
function btnSuivantVisible(ouinon) {
    if (ouinon) {
        btnSuivant.style.display = "block";
    } else {
        btnSuivant.style.display = "none";
    }
}
function btnRetourVisible(ouinon) {
    if (ouinon) {
        btnRetour.style.display = "block";
    } else {
        btnRetour.style.display = "none";
    }
}
function compteurInit(ouinon) {
    if (ouinon) {
        compteur.textContent = 1;
        compteur.style.display = "block";
    } else {
        compteur.style.display = "none";
    }
}
// Au clique sur ...
// Calcul Posée :
document.querySelector(".menu__1").addEventListener('click', function () {
    if (choixMenu != 'choixMenu1') {
        choixMenu = 'choixMenu1';
        decorVisible(true);
        tableau.innerHTML = calculPose;
        btnSuivantVisible(true);
        btnRetourVisible(true);
        btnSuivant.classList.remove(btnSuivant.classList);
        btnSuivant.classList.add(choixMenu);
        randomTous('plusmoins');
        compteurInit(true);
        btnSuivant.textContent = resultatReel;
    }
});
// Tables de multiplications :
document.querySelector(".menu__2").addEventListener('click', function () {
    if (choixMenu != 'choixMenu2') {
        choixMenu = 'choixMenu2';
        decorVisible(true);
        tableau.innerHTML = "Tableau 2";
        btnSuivantVisible(true);
        btnSuivant.classList.remove(btnSuivant.classList);
        btnSuivant.classList.add(choixMenu);
    }
});
// Multiplication posé :
document.querySelector(".menu__3").addEventListener('click', function () {
    if (choixMenu != 'choixMenu3') {
        choixMenu = 'choixMenu3';
        decorVisible(true);
        tableau.innerHTML = calculPose;
        btnSuivantVisible(true);
        btnSuivant.classList.remove(btnSuivant.classList);
        btnSuivant.classList.add(choixMenu);
        randomTous('fois');
        compteurInit(true);
    }
});
// Problèmes :
document.querySelector(".menu__4").addEventListener('click', function () {
    if (choixMenu != 'choixMenu4') {
        choixMenu = 'choixMenu4';
        decorVisible(false);
        tableau.innerHTML = "Tableau 4";
        btnSuivantVisible(true);
        btnSuivant.classList.remove(btnSuivant.classList);
        btnSuivant.classList.add(choixMenu);
    }
});
// Autres :
document.querySelector(".menu__5").addEventListener('click', function () {
    if (choixMenu != 'choixMenu5') {
        choixMenu = 'choixMenu5';
        decorVisible(false);
        tableau.innerHTML = "Tableau 5";
        btnSuivantVisible(true);
        btnSuivant.classList.remove(btnSuivant.classList);
        btnSuivant.classList.add(choixMenu);
    }
});

btnSuivant.addEventListener('click', function () {
    if (compteur.textContent < 20) {
        if (choixMenu == 'choixMenu1' || choixMenu == 'choixMenu3') {
            if (resultatReel == resultatEntre()) {
                compteur.textContent ++
                randomTous('plusmoins');
            }
        } 
    } else {
        tableau.innerHTML = "Bravo tu as fini !";
        decorVisible(false);
        btnSuivantVisible(false);
        compteur.style.display = "none";
    }
  
});