

//importeur ajax
function getXMLHttpRequest() {
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    }
    else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}

function importer_journal() {
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            document.getElementById("affichage").innerHTML = xhr.responseText;
        }
    };

    xhr.open("POST", "journal/journal.html", true);
    xhr.send();
};
function importer_grand_livre() {
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            document.getElementById("affichage").innerHTML = xhr.responseText;
        }
    };

    xhr.open("POST", "le_grand_livre/grand_livre.html", true);
    xhr.send();
};
function importer_resultat() {
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            document.getElementById("affichage").innerHTML = xhr.responseText;
        }
    };

    xhr.open("POST", "compte_resultat/compte_resultat.html", true);
    xhr.send();
};
function importer_bilan() {
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            document.getElementById("affichage").innerHTML = xhr.responseText;
        }
    };

    xhr.open("POST", "bilan/bilan.html", true);
    xhr.send();
};

//importeur JSON
function init() {
    importer_presentation();
}
function importer_maladies(){
	var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            traiter_maladie(JSON.parse(xhr.responseText))
        }
    };

    xhr.open("POST", "maladies.json", true);
    xhr.send();
};