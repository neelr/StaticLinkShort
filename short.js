var endpoint = "https://www.jsonstore.io/4fb5b62b7515d19e4d0e402a57393672f17ab05bd49542945fbbb521c5d4f1c8";
function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}
function getdelurl(){
    var url = document.getElementById("delinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
    document.getElementById('buttons').innerHTML = 'Submited! Please Reload!';
    document.getElementById('buttons').className = 'button is-success';
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}
$.getJSON(endpoint, function (data) {
    datafull = data["result"];
});
function delurl() {
    deleteurl = getdelurl();
    deletecode = document.getElementById('shortinput').value;
    try {
        if (datafull[deletecode] == deleteurl) {
            $.ajax({
                'url': endpoint + "/" + deletecode,
                'type': 'DELETE',
            })
            document.getElementById('buttons').innerHTML = 'DELETED!!!';
            document.getElementById('buttons').className = 'button is-danger';
            document.getElementById('err').innerHTML = "Delete Page!";
            $.getJSON(endpoint, function (data) {
                datafull = data["result"];
            });
        } else {
            document.getElementById('err').innerHTML = "ERROR PLEASE TRY AGAIN!!!";
            $.getJSON(endpoint, function (data) {
                datafull = data["result"];
            });
        }
    } catch {
        document.getElementById('err').innerHTML = "ERROR PLEASE TRY AGAIN!!!"
        $.getJSON(endpoint, function (data) {
            datafull = data["result"];
        });
    }
}