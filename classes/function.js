let arrBoxes = [];
let arrPlayers= [];
let arrArmes=[];

function startingGame() {
    let map = new Map(420, 100, 10, 2, 6); // Instanciation de la classe Map, pour créer un plateau 420x420px

    $(".map").remove(); // Régénère la balise '.map' à chaque clic
    $(".board").show();

    map.genererMap(); // Méthode pour générer la map
    map.genererCases(); // Méthode pour générer les cases libres et les obstacles
    map.genererPlayersArmes(); // Méthode pour générer les joueurs et les armes sur la map
    $(".new-game").hide();

    arrPlayers[1].lifePoints = 100;
    
    movingTurn(1);
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];  
}

function checkPlayersTouch(player, nextPlayer) {
    if( player.position === nextPlayer.position || player.position === nextPlayer.position + 1 || player.position === nextPlayer.position - 1 || player.position === nextPlayer.position + 10 || player.position === nextPlayer.position - 10) {
        return true; // déclenche le combat     
    } else {
        return false; // déclenche la fonction déplacement
    }       
}

function checkMoves(casePlayerDK) {
    for (let i = 0; i < 3; i++) {
        if ($('div[data-key="'+ (casePlayerDK + (i+1)) +'"]').hasClass("obstacle") || $('div[data-key="'+ (casePlayerDK + (i+1)) +'"]').hasClass("player") || (casePlayerDK + (i+1))%10 === 1) {
            break;
        } else {
            $('div[data-key="'+ (casePlayerDK + (i+1)) +'"]').addClass("case-move");
        } 
    }
    for (let i = 0; i < 3; i++) {
        if ($('div[data-key="'+ (casePlayerDK - (i+1)) +'"]').hasClass("obstacle") || $('div[data-key="'+ (casePlayerDK - (i+1)) +'"]').hasClass("player") || (casePlayerDK - (i+1))%10 === 0) {
            break;
        } else {
            $('div[data-key="'+ (casePlayerDK - (i+1)) +'"]').addClass("case-move");
        } 
    }
    for (let i = 0; i < 3; i++) {
        if ($('div[data-key="'+ (casePlayerDK + (i+1)*10) +'"]').hasClass("obstacle") || $('div[data-key="'+ (casePlayerDK + (i+1)*10) +'"]').hasClass("player")) {
            break;
        } else {
            $('div[data-key="'+ (casePlayerDK + (i+1)*10) +'"]').addClass("case-move");
        } 
    }
    for (let i = 0; i < 3; i++) {
        if ($('div[data-key="'+ (casePlayerDK - (i+1)*10) +'"]').hasClass("obstacle") || $('div[data-key="'+ (casePlayerDK - (i+1)*10) +'"]').hasClass("player")) {
            break;
        } else {
            $('div[data-key="'+ (casePlayerDK - (i+1)*10) +'"]').addClass("case-move");
        } 
    }
}
    

function movingTurn(playerNb) {
    let casePlayer = $('.player' + playerNb); // Sélection de la div contenant le player
    let casePlayerDK = parseInt(casePlayer.attr("data-key")); // Obtention de l'attribut data-key (en nombre)

    $(".case-move").removeClass("case-move"); // on retire la présence des cases de déplacements du tour d'avant

    checkMoves(casePlayerDK); // fonction qui affiche les cases de déplacement

    $("#player" + playerNb + " .player-choices").show(); // On affiche "Your Turn" sur le board

    $(".case-move").click(function() {

        // Si la clase cliquée contient une arme
        if ($(this).hasClass("arme")) {
            let newArme = $(this); // Case contenant l'arme (img)
            let oldArme = $("#player"+ playerNb +" .arme-img-container"); // Conteneur  avec l'arme à jeter (dans le board)
            let newArmeImg = newArme.children("img"); // img de l'arme sur la map
            let oldArmeImg = oldArme.children("img"); // img de l'arme dans le board
            let dataNumber = parseInt(newArmeImg.attr("data-number")); 

            // on charge l'image qui était sur la map dans le board
            oldArme.append(newArmeImg); 
            oldArmeImg.addClass("arme-map");
            oldArmeImg.removeClass("arme-img");
            $("#player" + playerNb + " .degats").empty();
            $("#player" + playerNb + " .degats").append(arrArmes[dataNumber - 1].attackPoints + " damage points");
        
            // on charge l'image qui était dans le board dans la map
            newArme.append(oldArmeImg);
            newArmeImg.addClass("arme-img");
            newArmeImg.removeClass("arme-map");
        }

        // On enlève le joueur de la case où il se trouvait avant le clic
        $('#player'+ playerNb +'-img').remove();
        casePlayer.removeClass("player");
        casePlayer.removeClass("player"+ playerNb);

        // On ajoute le joueur sur la case cliquée
        $(this).addClass("player");
        $(this).addClass("player"+ playerNb);
        $(this).append('<img id="player'+ playerNb +'-img" src="assets/images/player'+ playerNb +'.png">');
        arrPlayers[playerNb -1].position = parseInt($(this).attr("data-key")); // On change la position des joueurs dans le tableau
     
        $("#player" + playerNb + " .player-choices").hide();// On cache "Your Turn" sur le board
        $(".case-move").off(); // On efface l'écouteur d'événements sur les cases cliquables pour ce tour

        // On vérifie si les joueurs ne sont pas sur deux cases adjacentes
        if (checkPlayersTouch(arrPlayers[0], arrPlayers[1])) { // Si oui :
            if (playerNb === 1) { // On affiche les boutons attack et defense pour le joueur concerné
                $("#player" + (playerNb + 1) + " .player-choices").show(); 
                $("#player" + (playerNb + 1) + " .player-choices .player-button").show();
            } else {
                $("#player" + (playerNb - 1) + " .player-choices").show();
                $("#player" + (playerNb - 1) + " .player-choices .player-button").show();
            }
            $(".case-move").removeClass("case-move"); // on efface les cases de déplacement
        } else { // Si non :
            if (playerNb === 1) {
                playerNb++;
            } else {
                playerNb--;
            }
            movingTurn(playerNb); // on recommence un tour pour le joueur suivant
        }               
    });
}

$("#player1 .player-choices .attack").click(function () { 
    let arme = $("#player1 .arme-img-container img")
    let dataNumber = parseInt(arme.attr("data-number"));
    let attackPoints = arrArmes[dataNumber - 1].attackPoints
    let lifeBar = $("#player2 .life-points");
    let lifePoints = $("#player2 .pv");

    if(arme.hasClass("half")) {
        attackPoints /= 2;
    } 

    if (arrPlayers[1].lifePoints <= attackPoints) {
        lifePoints.empty();
        lifePoints.append(0);
        lifeBar.css("width", "0%");
        let result = confirm("Bravo Player1, tu as gagné ! Veux tu jouer une nouvelle partie ?");
        if (result) {
            window.location.reload();
        }
    } else {
        lifeBar.css("width", (arrPlayers[1].lifePoints - attackPoints) + "%");
        arrPlayers[1].lifePoints -= attackPoints;
        lifePoints.empty();
        lifePoints.append(arrPlayers[1].lifePoints);

        $("#player2 .player-choices").show(); 
        $("#player2 .player-choices .player-button").show();
        $("#player1 .player-choices").hide();
    } 

    if(arme.hasClass("half")) {
        attackPoints *= 2;
        arme.removeClass("half");
    }     
});

$("#player2 .player-choices .attack").click(function () { 
    let arme = $("#player2 .arme-img-container img")
    let dataNumber = parseInt(arme.attr("data-number"));
    let attackPoints = arrArmes[dataNumber - 1].attackPoints
    let lifeBar = $("#player1 .life-points");
    let lifePoints = $("#player1 .pv");

    if(arme.hasClass("half")) {
        attackPoints /= 2;
    } 

    if (arrPlayers[0].lifePoints <= attackPoints) {
        lifePoints.empty();
        lifePoints.append(0);
        lifeBar.css("width", "0%");
        let result = confirm("Bravo Player2, tu as gagné ! Veux tu jouer une nouvelle partie ?");
        if (result) {
            window.location.reload();
        }
    } else {
        lifeBar.css("width", (arrPlayers[0].lifePoints - attackPoints) + "%");
        arrPlayers[0].lifePoints -= attackPoints;
        lifePoints.empty();
        lifePoints.append(arrPlayers[0].lifePoints);

        $("#player1 .player-choices").show(); 
        $("#player1 .player-choices .player-button").show();
        $("#player2 .player-choices").hide();
    }

    if(arme.hasClass("half")) {
        attackPoints *= 2;
        arme.removeClass("half");
    }     
});

$("#player1 .player-choices .defense").click(function () { 
    let arme = $("#player2 .arme-img-container img");

    arme.addClass("half");

    $("#player2 .player-choices").show(); 
    $("#player2 .player-choices .player-button").show();
    $("#player1 .player-choices").hide();

});

$("#player2 .player-choices .defense").click(function () { 
    let arme = $("#player1 .arme-img-container img");

    arme.addClass("half");

    $("#player1 .player-choices").show(); 
    $("#player1 .player-choices .player-button").show();
    $("#player2 .player-choices").hide();
});
