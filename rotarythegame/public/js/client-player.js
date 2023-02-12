
function getPlayersList() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            buildList(this.response);
        }
    }
    xmlHttp.open("GET", `${location.href}/players`, true);
    xmlHttp.send(null);
}

function subscribePlayersList() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            buildList(this.response);
            subscribePlayersList()
        }
    }
    xmlHttp.open("GET", `${location.href}/players/long`, true);
    xmlHttp.send(null);
}

function buildList(json){
    list = JSON.parse(json);
    document.getElementById("code-text").innerText = list.lobby.code;
    document.getElementById("host").setAttribute('value', list.lobby.host);
    html = '';
    list.lobby.players.forEach(player => {
        html+=`<div class="players-margin-div">
        <input type="text" value="${player.name}" class="waiting-input" disabled>
    </div>`;
    });
    document.getElementById('players').innerHTML=html;
}

getPlayersList();
subscribePlayersList();