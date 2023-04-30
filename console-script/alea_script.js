//LD's Links
var API_LINK = "https://api.ldjam.com";
var LD_LINK = "https://ldjam.com";
var IMG_LINK = "//static.jam.host";

//DairyBox (self hosted JammerCore) links
// var API_LINK = "http://api.ldjam.work";
// var LD_LINK = "http://ldjam.work";
// var IMG_LINK = "http://static.jammer.work";

var IMG_PARAMS = ".480x384.fit.jpg";
var API_RANDOM_GET = "/vx/random/game/get/";
var API_NODE_GET = "/vx/node/get/";

var wasSetToAlea = false;
var dropdownOpen = false;

Init();

async function Init() {
    sortDropdown = document.getElementsByClassName("input-dropdown -filter-event")[1];
    sortDropdown.children[0].onclick = function () {
        dropdownOpen = !dropdownOpen;
        if (!dropdownOpen) {
            if (wasSetToAlea) {
                setTimeout(UpdateDropdownText, 0, sortDropdown, 1);
            }
            return;
        }
        if (wasSetToAlea) {
            setTimeout(UpdateDropdownText, 0, sortDropdown, 0);
        }
        let aleaButton = document.createElement("div");
        aleaButton.className = "-item";
        aleaButton.innerHTML = '<div><svg class="svg-icon icon-ticket"><use xlink:href="#icon-ticket"></use></svg><div>Alea</div></div>';
        aleaButton.onclick = function () {
            wasSetToAlea = true;
            ReplaceMoreButton();
            ReplaceGames();
            sortDropdown.children[1].remove();
            setTimeout(UpdateDropdownText, 0, sortDropdown, 1);
            dropdownOpen = false;
        }
        sortDropdown.children[1].style.maxHeight = "30em";
        sortDropdown.children[1].appendChild(aleaButton);
    };
    document.body.onclick = function () {
        if (dropdownOpen) {
            setTimeout(OnBodyClickDelayed, 1, sortDropdown);
        }
    };
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
    moreButtonContainer.innerHTML = '<div class="button-base -button" tabindex="0">REROLL</div>';
    moreButtonContainer.children[0].onclick = ReplaceGames;
    moreButtonContainer.children[0].onkeydown = ReplaceGames;
}

function OnBodyClickDelayed(dropdown) {
    if (dropdown.children.length == 1) {
        dropdownOpen = false;
        if (wasSetToAlea) {
            UpdateDropdownText(dropdown, 1)
        }
    }
}

//1 = Upon Closing, 0 = Upon Opening. Called with a timeout to make sure DOM was already changed.
function UpdateDropdownText(dropdown, value) {
    dropdown.children[0].children[value].innerHTML = '<svg class="svg-icon icon-ticket"><use xlink:href="#icon-ticket"></use></svg><div>Alea</div>';
}