/*seDeplacer(caseClic) {
    let playerCase = $("."+ this.name);
    let player = $("."+ this.name +" img");
    let caseMove = $(".case-move");
    
    player.remove();

    playerCase.removeClass("player");
    playerCase.removeClass(this.name);

    caseMove.removeClass("case-move");
    caseMove.removeAttr("name");

    caseClic.append(player);
    caseClic.addClass("player");
    caseClic.addClass(this.name);

    this.position = caseClic.attr("data-key");
}

checkMoving(playerNb) {
    let player = $('.player'+playerNb);
    let playerDataKey = parseInt(player.attr("data-key"));

    for (let i = 0; i < 3; i++) {
        if ($('div[data-key="'+ (playerDataKey + 1) +'"]').hasClass("obstacle") || $('div[data-key="'+ (playerDataKey + 1) +'"]').hasClass("player") || playerDataKey === 10 || playerDataKey === 20 || playerDataKey === 30 || playerDataKey === 40 || playerDataKey === 50 || playerDataKey === 60 || playerDataKey === 70 || playerDataKey === 80 || playerDataKey === 90) { // case directement à droite
            ; // pas d'instruction
        } else {
            $('div[data-key="'+ (playerDataKey + 1) +'"]').addClass("case-move");
            $('div[data-key="'+ (playerDataKey + 1) +'"]').attr("name", "droite"+ (i + 1));
            playerDataKey++;
        }                
    }

    playerDataKey = parseInt(player.attr("data-key"));

    for (let i = 0; i < 3; i++) {
        if ($('div[data-key="'+ (playerDataKey - 1) +'"]').hasClass("obstacle") || $('div[data-key="'+ (playerDataKey - 1) +'"]').hasClass("player") || (playerDataKey - 1) === 10 || (playerDataKey - 1) === 20 || (playerDataKey - 1) === 30 || (playerDataKey - 1) === 40 || (playerDataKey - 1) === 50 || (playerDataKey - 1) === 60 || (playerDataKey - 1) === 70 || (playerDataKey - 1) === 80 || (playerDataKey - 1) === 90) { // case directement à droite
            ; // pas d'instruction
        } else {
            $('div[data-key="'+ (playerDataKey - 1) +'"]').addClass("case-move");
            $('div[data-key="'+ (playerDataKey - 1) +'"]').attr("name", "gauche"+ (i + 1));
            playerDataKey--;
        }
    }   

    playerDataKey = parseInt(player.attr("data-key"));

    for (let i = 0; i < 3; i++) {
        if ($('div[data-key="'+ (playerDataKey + 10) +'"]').hasClass("obstacle") || $('div[data-key="'+ (playerDataKey + 10) +'"]').hasClass("player")) { // case directement à droite
            ; // pas d'instruction
        } else {
            $('div[data-key="'+ (playerDataKey + 10) +'"]').addClass("case-move");
            $('div[data-key="'+ (playerDataKey + 10) +'"]').attr("name", "bas"+ (i + 1));
            playerDataKey += 10;
        }
    } 
    
    playerDataKey = parseInt(player.attr("data-key"));

    for (let i = 0; i < 3; i++) {
        if ($('div[data-key="'+ (playerDataKey - 10) +'"]').hasClass("obstacle") || $('div[data-key="'+ (playerDataKey - 10) +'"]').hasClass("player")) { // case directement à droite
            ; // pas d'instruction
        } else {
            $('div[data-key="'+ (playerDataKey - 10) +'"]').addClass("case-move");
            $('div[data-key="'+ (playerDataKey - 10) +'"]').attr("name", "haut"+ (i + 1)); 
            playerDataKey -= 10;
        }
    }

    playerDataKey = parseInt(player.attr("data-key")); 
}

$(".case-move").click(function () { 
    let caseClicAttr = $(this).attr("name");
    let caseClic = $("div[name='"+ caseClicAttr +"']");
    arrPlayers[playerNb - 1].seDeplacer(caseClic);
}*/
