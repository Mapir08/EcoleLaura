let bouton1 = document.querySelector(".menu__1");
let bouton2 = document.querySelector(".menu__2");
let bouton3 = document.querySelector(".menu__3");
let bouton4 = document.querySelector(".menu__4");
let bouton5 = document.querySelector(".menu__5");
let tableau = document.getElementById("tableau");

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min)) + min;
}
function randPlusMoins() {
    var a = 1,
        b = '+-',
        c = '',
        d = 0,
        e = ''+b;
    for (; d < a; d++) {
      c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
}
bouton1.addEventListener('click', function() {
    tableau.innerHTML = "Cliqué !";
});