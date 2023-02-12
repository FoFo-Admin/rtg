
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
        <input type="text" value="${player.name}" class="waiting-input" disabled><!--
        --><div class="inline-block-div">
            <div class="delete-btn">
                <!-- SVG START -->
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_170_1230)">
                        <path d="M10.0063 14.7209C9.91611 14.8293 9.87045 14.8944 9.81508 14.9491C8.25511 16.5096 6.69456 18.07 5.13401 19.6294C4.63913 20.1234 4.12143 20.1229 3.62712 19.6294C2.53462 18.5373 1.44213 17.4459 0.350199 16.3533C-0.114426 15.8883 -0.116709 15.3582 0.347345 14.8944C1.9176 13.3237 3.48785 11.7541 5.05981 10.1851C5.1146 10.1303 5.18424 10.0909 5.24703 10.0441C5.25844 10.0105 5.27043 9.97682 5.28185 9.94315C5.20707 9.90093 5.11803 9.87298 5.05924 9.81478C3.49584 8.25718 1.93586 6.6973 0.375314 5.13686C-0.128125 4.63306 -0.125271 4.12356 0.381022 3.61634C1.46781 2.52831 2.55403 1.44027 3.64082 0.352237C4.10487 -0.112189 4.63913 -0.116754 5.10205 0.34539C6.67344 1.9144 8.24369 3.48455 9.81337 5.05584C9.87273 5.11517 9.91897 5.1882 9.97604 5.26123C10.06 5.18421 10.1079 5.14427 10.1518 5.09977C11.7215 3.52905 13.2912 1.95776 14.8603 0.38647C15.3729 -0.127024 15.8837 -0.128735 16.398 0.385329C17.4797 1.46766 18.5613 2.55056 19.6418 3.63403C20.1207 4.11443 20.119 4.64561 19.6373 5.12773C18.0722 6.69331 16.5059 8.25775 14.9408 9.82277C14.8866 9.87697 14.8346 9.93402 14.7718 9.99907C14.8318 10.063 14.8826 10.12 14.9368 10.1742C16.4973 11.7347 18.0579 13.294 19.6184 14.8544C20.1282 15.3645 20.1282 15.8814 19.6167 16.3932C18.5396 17.4704 17.4626 18.5476 16.3849 19.6236C15.8809 20.1269 15.3666 20.1257 14.8626 19.6208C13.3026 18.0603 11.7432 16.4999 10.1844 14.9383C10.1302 14.8835 10.0862 14.8185 10.0074 14.7204L10.0063 14.7209Z" fill="#F7A81B"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_170_1230">
                            <rect width="20" height="20" fill="white"/>
                        </clipPath>
                    </defs>
                </svg> 
            <!-- SVG END -->
            </div>
        </div>
    </div>    `;
    });
    document.getElementById('players').innerHTML=html;
}

getPlayersList();
subscribePlayersList();