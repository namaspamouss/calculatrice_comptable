var irow = 0
var compte_irow = 0
var number_account = 0
var liste_no_compte = []

function ajouter_ligne() {
    var newline = "<tr>\n<td id=\"td_type\"><select id=\"type" + irow + "\">\n<option value=\"A\">A</option>\n<option value=\"V\">V</option>\n<option value=\"OD\">OD</option>\n<option value=\"BQ\">BQ</option>\n</select></td>\n<td id=\"td_date\"><input class=\"date\" width=\"5\" id=\"date" + irow + "\" type=\"date\"></td>\n<td id=\"td_compte\"><select width=\"40\" onchange=\"definir_client(" + irow + ")\"id=\"compte" + irow + "\"   ></select></td>\n<td id=\"td_libelle\"><label id=\"libelle" + irow + "\"></td>\n<td id=\"td_debit\"><input onkeyup=\"kick_credit(" + irow + ")\" id=\"debit" + irow + "\"onkeyup=\"calculer_dc()\" type=\"number\"></td>\n<td id=\"td_credit\"><input onkeyup=\"kick_debit(" + irow + ")\" id=\"credit" + irow + "\"onkeyup=\"calculer_dc()\" type=\"number\"></td>\n<td id=\"td_DC\"><label class=\"DC\" id=\"DC" + irow + "\"></td>\n</tr>"
    document.getElementById("la_somme").insertAdjacentHTML("beforebegin", newline)
    console.log("fonction auto_complete en cours..")
    var xhr = new XMLHttpRequest(), method = "GET", url = "plan_comptable.json";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        console.log("xhr running...")
        if (xhr.readyState === 4 && xhr.status === 200) {
            var obj = JSON.parse(xhr.responseText)
            for (var i = 0; i < obj.length; i++) {
                var ligne_option = ("<option value=\"" + obj[i].nunero + "\">" + obj[i].nunero + "</option>")
                var current_compte = document.getElementById("compte" + irow);
                current_compte.insertAdjacentHTML("beforeend", ligne_option)
            }
            irow++
            console.log("nouvelle ligne crée. l'irow est maintenant a " + irow)
        }
    }
    xhr.send();
}
"onchange=\"kick_debit(" + irow + ")\""


function kick_credit(cell) {
    var debit_cell = "debit" + cell
    var credit_cell = "credit" + cell
    var debit_case = document.getElementById(debit_cell).value
    if (debit_case === null || debit_case === undefined || debit_case == "") {
        document.getElementById(credit_cell).disabled = false
    }
    else {
        document.getElementById(credit_cell).disabled = true
    }
    calculer_dc()
}

function kick_debit(cell) {
    var debit_cell = "debit" + cell
    var credit_cell = "credit" + cell
    var credit_case = document.getElementById(credit_cell).value
    if (credit_case === null || credit_case === undefined || credit_case == "") {
        document.getElementById(debit_cell).disabled = false
    }
    else {
        document.getElementById(debit_cell).disabled = true
    }
    calculer_dc()
}

function charger_lignes() {
    irow_to_create = localStorage.getItem("irow")
    for (x = 0; x < irow_to_create; x++) {
        ajouter_ligne()

        var v_type = localStorage.getItem("type" + x)
        var v_date = localStorage.getItem("date" + x)
        var v_compte = localStorage.getItem("compte" + x)
        var v_libelle = localStorage.getItem("libelle" + x)
        var v_debit = localStorage.getItem("debit" + x)
        var v_credit = localStorage.getItem("credit" + x)
        var v_dc = localStorage.getItem("DC" + x)

        document.getElementById("type" + x).value = v_type
        document.getElementById("date" + x).value = v_date
        document.getElementById("compte" + x).value = v_compte
        document.getElementById("libelle" + x).value = v_libelle
        document.getElementById("debit" + x).value = v_debit
        document.getElementById("credit" + x).value = v_credit
        document.getElementById("DC" + x).innerHTML = v_dc

    }
}

function calculer_dc() {
    for (x = 0; x < irow; x++) {
        var d = document.getElementById("debit" + x).value
        var c = document.getElementById("credit" + x).value
        if (d == null || d == undefined) {
            d = 0
        }
        document.getElementById("DC" + x).innerText = d - c;    
    }
    calculer_somme_finale()
}

function calculer_somme_finale() {
    var somme_debit=0
    var somme_credit=0
    var somme_dc=0
    for (x = 0; x < irow; x++) {
        somme_debit += Number(document.getElementById("debit" + x).value)
        somme_credit += Number(document.getElementById("credit" + x).value)
        somme_dc = somme_debit-somme_credit
        document.getElementById("somme_debit").innerText=somme_debit
        document.getElementById("somme_credit").innerText=somme_credit
        document.getElementById("somme_DC").innerText=somme_dc

    }
}

function sauvegarder_lignes() {
    localStorage.clear()
    localStorage.setItem("irow", irow)
    for (x = 0; x < irow; x++) {

        var k_type = "type" + x
        var v_type = document.getElementById(k_type).value
        localStorage.setItem(k_type, v_type)

        var k_date = "date" + x
        var v_date = document.getElementById(k_date).value
        localStorage.setItem(k_date, v_date)

        var k_compte = "compte" + x
        var v_compte = document.getElementById(k_compte).value
        localStorage.setItem(k_compte, v_compte)

        var k_libelle = "libelle" + x
        var v_libelle = document.getElementById(k_libelle).value
        localStorage.setItem(k_libelle, v_libelle)

        var k_debit = "debit" + x
        var v_debit = document.getElementById(k_debit).value
        localStorage.setItem(k_debit, v_debit)

        var k_credit = "credit" + x
        var v_credit = document.getElementById(k_credit).value
        localStorage.setItem(k_credit, v_credit)

        var k_dc = "DC" + x
        var v_dc = document.getElementById(k_dc).innerHTML
        localStorage.setItem(k_dc, v_dc)
    }
}
function definir_client_tous() {
    for (var x = 0; x < irow; x++) {
        definir_client("compte" + x)
    }
}
function definir_client(cell) {
    number_account = document.getElementById("compte" + cell).value
    console.log("number_account: " + number_account)
    var xhr = new XMLHttpRequest(), method = "GET", url = "plan_comptable.json";

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var obj = JSON.parse(xhr.responseText)
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].nunero == number_account) {
                    document.getElementById("libelle" + cell).innerHTML = obj[i].compte
                }
            }

        }
    };
    xhr.send();
}
