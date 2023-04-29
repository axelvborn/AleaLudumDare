//LD's Links
const API_LINK = "http://api.ldjam.com";
const LD_LINK = "http://ldjam.com";

//DairyBox (self hosted JammerCore) links
// const API_LINK = "http://api.ldjam.work";
// const LD_LINK = "http://ldjam.work";

const API_RANDOM_GET = "/vx/random/game/get/";
const API_NODE_GET = "/vx/node/get/";

var noResultsText;

window.onload = Init;

function Init() {
    noResultsText = document.getElementById("noResultsText");
}

async function getRandomGame() {
    var filter = document.querySelector('input[name="category"]:checked').value;
    const randomResponse = await fetch(API_LINK + API_RANDOM_GET + filter + "?count=1");
    const randomJson = await randomResponse.json();

    if (randomJson.listenabled) {
        const nodeResponse = await fetch(API_LINK + API_NODE_GET + randomJson.games[0]);
        const nodeJson = await nodeResponse.json();
        window.open(LD_LINK + nodeJson.node[0].path, '_blank');
        noResultsText.style.display = "none";
    } else {
        noResultsText.style.display = "block";
    }
}