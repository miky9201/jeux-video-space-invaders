class Map {
    constructor(width, nbBoxes, nbObstacles, nbPlayers, nbArmes) {
        this.width = $(".map-container").css("width", width);
        this.nbBoxes = nbBoxes;
        this.nbObstacles = nbObstacles;
        this.nbPlayers = nbPlayers;
        this.nbArmes = nbArmes;
    }

    genererMap() {
        $(".map-container").append('<div class="map"></div>'); // On place la div .map dans .map-container
    }

    genererCases() {
        let ligne = 1, colonne = 1;

        for (let i = 0; i < this.nbBoxes; i++) {
            // On génère un tableau contenant chaque case sous forme d'objet
            arrBoxes[i] = {
                id: i + 1,
                etat: "casevide",
                positionX: ligne,
                positionY: colonne
            };

            $(".map").append("<div id='box" + (i+1) + "' class='case casevide' data-key='"+ (i+1) +"'></div>");

            colonne++;
            if (colonne === 11) { // Lorsque l'on arrive à la fin des 10 colonnes, on passe à la ligne suivante et on régénère la colonne.
                colonne = 1;
                ligne++;
            }
        }

        for (let i = 0; i < this.nbObstacles; i++) {
            let r = random(arrBoxes); // on choisi une case au hasard dans l'ensemble des cases générées

            if (r.etat !== "casevide") {
                i--; // On choisit une autre case si la fonction désigne une case "obstacle"
            } else {
                r.etat = "obstacle"; 
                $('#box' + r.id).removeClass("casevide");
                $('#box' + r.id).addClass("obstacle");
            }
        }
    }

    genererPlayersArmes() {
        // générer les joueurs aléatoirement (+ leur arme de base)
        for (let i = 0; i < this.nbPlayers; i++) {
            let r = random(arrBoxes);
            let caseGauche = r.id - 1, caseDroite = r.id + 1, caseHaut = r.id - 10, caseBas = r.id + 10; // on selectione l'id des cases adjacentes à "r" 

            if (r.etat !== "casevide" || $('#box' + caseGauche).hasClass("player") || $('#box' + caseDroite).hasClass("player") || $('#box' + caseHaut).hasClass("player") || $('#box' + caseBas).hasClass("player")) {
                i--; // si la case selectionnée et les cases adjacentes ne sont pas "casevide", alors on choisit une nouvelle case
            } else {
                r.etat = "player";
                $('#box' + r.id).addClass("player" + (i+1));
                $('#box' + r.id).addClass("player");
                $('#box' + r.id).append('<img id="player'+ (i+1) +'-img" src="assets/images/player'+ (i+1) +'.png">');

                arrPlayers[i] = new Player("player" + (i+1), i+1, parseInt($(".player" + (i+1)).attr("data-key"))); // On génère un tableau qui instancie les deux joueurs 

                $("#player"+ (i+1) +" .pv").append(arrPlayers[i].lifePoints);

                arrArmes[i] = new Arme("katana"+ (i+1), i+1, arrPlayers[i].position, 10, "occupe"); // On génère un tableau qui instancie les deux armes qui équipent les joueurs.
                $("#player"+ (i+1) +" .arme-img-container").empty(); // Régénère l'image de l'arme dans les boards
                $("#player"+ (i+1) +" .arme-img-container").append('<img id="arme'+ (i+1) +'" data-number="'+ (i+1) +'" class="arme-img" src="assets/images/arme'+ (i+1) +'.png">'); // on affiche les armes par défaut dans le board
            } 
        }

        // générer les armes aléatoirement
        for (let i = 2; i < this.nbArmes; i++) {
            let r = random(arrBoxes);

            if (r.etat !== "casevide") {
                i--;
            } else {
                r.etat = "arme";
                $('#box' + r.id).addClass("arme");
                $('#box' + r.id).append('<img id="arme'+ (i+1) +'" data-number="'+ (i+1) +'" class="arme-map"  src="assets/images/arme'+ (i+1) +'.png">');

                // On instancie et génère dans le DOM les 4 armes aléatoires du plateau
                arrArmes[i] = new Arme("", i+1, r.position, "", "libre");
                if ((i+1) === 3) {
                    arrArmes[i].name = "arbalete";
                    arrArmes[i].attackPoints = 20;

                } else if ((i+1) === 4) {
                    arrArmes[i].name = "lightsaber";
                    arrArmes[i].attackPoints = 30;

                } else if ((i+1) === 5) {
                    arrArmes[i].name = "pistol";
                    arrArmes[i].attackPoints = 30;

                } else {
                    arrArmes[i].name = "laser-pistol";
                    arrArmes[i].attackPoints = 40;
                } 
            } 
        }
        console.log(arrPlayers);
        console.log(arrArmes);
        console.log(arrBoxes);
    }
}