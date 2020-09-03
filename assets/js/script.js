$(document).ready(function(){




// DÉCLARATION DES VARIABLES 

    // mise ne place des variables du canvas
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
   
    
    // mise en place des variables pour le plateau aléatoire
    const largeurCanvas = canvas.width;
    const hauteurCanvas = canvas.height;
    const largeurCase = 42;
    const nbCaseLigne = largeurCanvas / largeurCase;
    const nbCaseCol = hauteurCanvas / largeurCase;
    const nbCase = nbCaseLigne * nbCaseCol;
    const listeCases = []; // tableau regroupant toutes les cases du plateau
    const arrPlayers = []; // tableau regroupant les deux joueurs
    const arrArmes = []; // tableau regroupant les 4 armes


    // Mise en place des éléments cachés avant l'execution de la fonction genererMap()
    $("#canvas").hide(); // Par défaut, la balise canvas n'est pas affichée
    $(".board").hide(); // on cache les divs players tant que le bouton "nouvelle partie" n'est pas enclenché




// MISE EN PLACE DES DIFFÉRENTES FONCTIONS POUR GÉNÉRER LA MAP ALÉATOIRE

    // mise en place d'une fonction pour générer la map avec les cases blanches
    function genererMap () {
        let colonne = 0, ligne = 0;  // on initialise deux variables pour se déplacer de case en case

        context.fillStyle = "#eee"; 
        context.fillRect(0, 0, largeurCanvas, hauteurCanvas); // On défini le fond du plateau de jeux au format du canvas

        for (let i = 0; i < nbCase; i++) {
            context.strokeStyle = "#000000";
            context.strokeRect(largeurCase * colonne, largeurCase * ligne, largeurCase, largeurCase); // on crée une case avec contours noirs 

            // Création d'un tableau regroupant les 100 cases sous forme d'objet
            listeCases[i] =  {
                numero: i,
                id: "casevide",
                positionX: largeurCase * colonne,
                positionY: largeurCase * ligne
            }

            colonne++;

            if (colonne === nbCaseLigne) {
                colonne = 0  
                ligne++;  // on revient à la ligne en incrémentant une ligne et en réinitialisant une colonne à 0
            }
        }
    } 



    // On choisi un élément d'un tableau au hasard
    function random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];  
    }


    function creaElement(nb, id){
        for (let i = 0, nbPlayers = nb; i < nbPlayers; i++) {

            let r = random(listeCases);

            if (r.id !== "casevide") {
                i--;
            } else {
                r.id = id;

                if (id === "player") { // Code à appliquer pour créer joueur

                    arrPlayers[i] =  {
                        nom: "player" + (i+1),
                        id: i, 
                        positionX: r.positionX + 3,
                        positionY: r.positionY + 1,
                        lifePoints: 100,
                        attackPoints : 5
                    }

                    let imgPlayer = new Image();
                    imgPlayer.src = 'assets/images/player' + (i + 1) + '.png';
                    imgPlayer.setAttribute("id", "player" + (i+1));

                    imgPlayer.addEventListener('load', function() {
                        context.drawImage(imgPlayer, arrPlayers[i].positionX, arrPlayers[i].positionY, 35, 38);
                    }, false);

                } else if (id === "arme") { // Code à appliquer pour créer joueur

                    arrArmes[i] =  {
                        nom: "arme" + (i+1),
                        id: i, 
                        positionX: r.positionX + 8,
                        positionY: r.positionY + 10,
                        attackPoints: ""
                    }
    
                    let imgArme = new Image();
                    imgArme.src = 'assets/images/arme' + (i + 1) + '.png';
                    imgArme.setAttribute("id", "arme" + (i+1))
    
                    imgArme.addEventListener('load', function(){
                        context.drawImage(imgArme, arrArmes[i].positionX, arrArmes[i].positionY, 23, 25);
                    }, false);
                    
                } else { // Code à appliquer pour créer case obstacle (en orange)

                    r.id = "obstacle"; 
                    context.fillStyle = "darkorange";
                    context.fillRect(r.positionX, r.positionY, largeurCase, largeurCase);
                    context.strokeStyle = "#000000";
                    context.strokeRect(r.positionX, r.positionY, largeurCase, largeurCase);

                }

            }

        }

    }

    function appendElement(element) {
        $(element).append('<button class="yo">Déplacement</button>');
    }

    function game() {
        $('#canvas').show();
        genererMap();
        $(".board").show();
        creaElement(20, "obstacle");
        creaElement(2, "player");
        creaElement(4, "arme");
    }


// ÉVÉNEMENTS 

    // événement : clic sur le bouton "Nouvelle Partie"
    $(".new-game").click(game);

    

});



