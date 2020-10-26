const btnSuivant = document.getElementById("pupitre__btnSuivant");
const btnRetour = document.getElementById("pupitre__btnRetour");
const tableau = document.getElementById("tableau");
let compteur = document.getElementById("pupitre__compteur");
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
        <input class='result' id='mR' type='number' maxlenght='1'></input>\
        <input class='result' id='cR' type='number' maxlenght='1'></input>\
        <input class='result' id='dR' type='number' maxlenght='1'></input>\
        <input class='result' id='uR' type='number' maxlenght='1'></input>\
    </div>\
    <input class='report report__AM' type='number' min=0 max=9></input>\
    <input class='report report__AC' type='number' min=0 max=9></input>\
    <input class='report report__AD' type='number' min=0 max=9></input>\
    <input class='report report__SD' type='number' min=0 max=9></input>\
    <input class='report report__SU' type='number' min=0 max=9></input>\
    <input class='report report__sC' type='number' min=0 max=9></input>\
    <input class='report report__sD' type='number' min=0 max=9></input>\
</form>"; // Ajouter les reports tous au même endroit et les placer en CSS
const underConstr = "<p id='tableau__exo'>Under Construction !</p>";

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
function resultatEntre() {
    let m = document.getElementById('mR').value;
    let c = document.getElementById('cR').value;
    let d = document.getElementById('dR').value;
    let u = document.getElementById('uR').value;
    return (m * 1000) + (c * 100) + (d * 10) + parseInt(u);
}
function clearEntre() {
    document.getElementById('mR').value = "";
    document.getElementById('cR').value = "";
    document.getElementById('dR').value = "";
    document.getElementById('uR').value = "";
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
}
function afficherChiffre(v1, v2, s) {
    let checked ;
    if (s == '-') {
        checked = checkOrdreMoins(v1,v2);
        reportVisible(true);
    } else {
        checked = {v1: v1, v2: v2};
        reportVisible(false);
    }
    let chiffre1Divise = diviserChiffre(checked.v1);
    let chiffre2Divise = diviserChiffre(checked.v2);
    document.querySelector("#c1").textContent = Math.trunc(chiffre1Divise.c);
    document.querySelector("#d1").textContent = Math.trunc(chiffre1Divise.d);
    document.querySelector("#u1").textContent = Math.trunc(chiffre1Divise.u);
    document.querySelector("#c2").textContent = Math.trunc(chiffre2Divise.c);
    document.querySelector("#d2").textContent = Math.trunc(chiffre2Divise.d);
    document.querySelector("#u2").textContent = Math.trunc(chiffre2Divise.u);
    resultatReel = calculResultat(checked.v1, checked.v2, s);
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
function checkOrdreMoins(val1, val2) {
    if (val1 < val2) {
        return {v1: val2, v2: val1};
    } else {
        return {v1: val1, v2: val2};
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
function reportVisible(moins) {
    document.querySelector('.report__AM').value = "" ;
    document.querySelector('.report__AC').value = "" ;
    document.querySelector('.report__AD').value = "" ;
    document.querySelector('.report__SD').value = "" ;
    document.querySelector('.report__SU').value = "" ;
    document.querySelector('.report__sC').value = "" ;
    document.querySelector('.report__sD').value = "" ;
    document.querySelector('.report__AM').style.display = 'none';
    document.querySelector('.report__AC').style.display = 'none';
    document.querySelector('.report__AD').style.display = 'none';
    document.querySelector('.report__SD').style.display = 'none';
    document.querySelector('.report__SU').style.display = 'none';
    document.querySelector('.report__sC').style.display = 'none';
    document.querySelector('.report__sD').style.display = 'none';
    if (moins) {
        document.querySelector('.report__SD').style.display = 'block';
        document.querySelector('.report__SU').style.display = 'block';
        document.querySelector('.report__sC').style.display = 'block';
        document.querySelector('.report__sD').style.display = 'block';
    } else {
        document.querySelector('.report__AM').style.display = 'block';
        document.querySelector('.report__AC').style.display = 'block';
        document.querySelector('.report__AD').style.display = 'block';
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
        tableau.innerHTML = calculPose; // contenu de la page
        btnSuivantVisible(true);
        btnRetourVisible(false);
        btnSuivant.classList.remove(btnSuivant.classList);
        btnSuivant.classList.add(choixMenu);
        randomTous('plusmoins');
        compteurInit(true);
    }
});
// Tables de multiplications :
document.querySelector(".menu__2").addEventListener('click', function () {
    if (choixMenu != 'choixMenu2') {
        choixMenu = 'choixMenu2';
        decorVisible(true);
        tableau.innerHTML = underConstr; // contenu de la page
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
        tableau.innerHTML = calculPose; // contenu de la page
        btnSuivantVisible(true);
        btnRetourVisible(false);
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
        compteurInit(false);
        btnSuivantVisible(false);
        tableau.innerHTML = underConstr; // contenu de la page
        btnSuivant.classList.remove(btnSuivant.classList);
        btnSuivant.classList.add(choixMenu);
    }
});
// Autres : POUR LES ESSAIS
document.querySelector(".menu__5").addEventListener('click', function () {
    if (choixMenu != 'choixMenu5') {
        choixMenu = 'choixMenu5';
        decorVisible(false);
        compteurInit(false);
        tableau.innerHTML = '<div id="test">Click</div> \
        <div id="test__resultat"></div>'; // contenu de la page
        btnSuivantVisible(false);
        btnRetourVisible(false);
        btnSuivant.classList.remove(btnSuivant.classList);
        btnSuivant.classList.add(choixMenu);
    }
    document.querySelector("#test").addEventListener('click', function () {
        let request = new XMLHttpRequest() ;

        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
                let response = JSON.parse(this.responseText);
                document.getElementById("test__resultat").textContent = response.name;
            }
        };
        request.open("GET", "public/JS/test.json") ;
        request.send();
    });
});

btnSuivant.addEventListener('click', function () {
    if (compteur.textContent < 20) {
        if (resultatReel == resultatEntre()) {
            if (choixMenu == 'choixMenu1') {
                randomTous('plusmoins');
            } if (choixMenu == 'choixMenu3') {
                randomTous('fois');
            }
            compteur.textContent ++
            clearEntre();
        } else {
            alert("Soit tu n'a rien noté, soit c'est incorrect. Recommence !");
        }
    } else {
        tableau.innerHTML = "Bravo tu as fini !";
        decorVisible(false);
        btnSuivantVisible(false);
        compteur.style.display = "none";
    }
  
});

/* 
Reste à faire :
    - Mettre toutes les variables et constantes dans un fichier à part ;
    - Utiliser le bouton Retour pour relancer "l'onglet" ;
    - Créer le tableau2 "Table de multiplication" :
        . Choix de la table / Pas de compteur ;
        . Lancer le visuel avec calcul centré ;
    - Créer le tableau4 "Problème" ;
        . créer un listing de plusieurs problèmes dans un fichier à part ;
*/