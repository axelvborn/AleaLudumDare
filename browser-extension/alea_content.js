//LD's Links
// var API_LINK = "https://api.ldjam.com";
// var LD_LINK = "https://ldjam.com";
// var IMG_LINK = "//static.jam.host";

//DairyBox (self hosted JammerCore) links
var API_LINK = "http://api.ldjam.work";
var LD_LINK = "http://ldjam.work";
var IMG_LINK = "http://static.jammer.work";

var IMG_PARAMS = ".480x384.fit.jpg";

var API_RANDOM_GET = "/vx/random/game/get/";
var API_NODE_GET = "/vx/node/get/";

setTimeout(Init, 1000); // Short inevitable delay to make sure page was generated properly

async function Init() {
    let button = document.createElement("button");
    button.innerHTML = "Switch to Alea";
    button.style.fontSize = "22px";
    button.style.margin = "5px";
    button.onclick = function () {
        ReplaceMoreButton();
        ReplaceGames();
    }
    filtersContainer = document.getElementsByClassName("content-base content-common filter-item filter-game")[0];
    filtersContainer.insertBefore(button, filtersContainer.children[3]);
}

async function ReplaceGames() {
    let filters = document.getElementsByClassName("input-dropdown -filter-event")[0].children[0].children[1].children[1].innerHTML.toLowerCase();
    let gamesList = document.getElementsByClassName("button-base button-link content-box");
    const randomResponse = await fetch(API_LINK + API_RANDOM_GET + filters + "?count=" + String(gamesList.length));
    const randomJson = await randomResponse.json();

    if (!randomJson.listenabled) {
        return;
    }
    for (let i = 0; i < randomJson.games.length; i++) {
        const nodeResponse = await fetch(API_LINK + API_NODE_GET + randomJson.games[i]);
        const nodeJson = await nodeResponse.json();
        const eventResponse = await fetch(API_LINK + API_NODE_GET + nodeJson.node[0].parent);
        const eventJson = await eventResponse.json();
        gamesList[i].href = nodeJson.node[0].path;
        gamesList[i].children[0].src = IMG_LINK + nodeJson.node[0].meta.cover + IMG_PARAMS;
        gamesList[i].children[1].innerHTML = "<div>" + eventJson.node[0].name + "</div>"; //Might be empty
        let uppercaseCat = String(nodeJson.node[0].subsubtype).toUpperCase();
        switch (uppercaseCat) {
            case 'COMPO':
                gamesList[i].children[2].style.backgroundColor = "#f79122";
                break;
            case 'JAM':
                gamesList[i].children[2].style.backgroundColor = "#ee5533";
                break;
            case 'EXTRA':
                gamesList[i].children[2].style.backgroundColor = "#66cc22";
                break;
        }
        gamesList[i].children[2].children[0].innerHTML = uppercaseCat;
        gamesList[i].children[3].innerHTML = ""; //Trophies
        gamesList[i].children[4].innerHTML = ""; //???
        gamesList[i].children[5].children[0].innerHTML = nodeJson.node[0].name;
    }
}

function ReplaceMoreButton() {
    let moreButtonContainer = document.getElementsByClassName("content-base content-more")[0];
    moreButtonContainer.innerHTML = '<div class="button-base -button" tabindex="0">RANDOM</div>';
    moreButtonContainer.children[0].onclick = ReplaceGames;
    moreButtonContainer.children[0].onkeydown = ReplaceGames;
}