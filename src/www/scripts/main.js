window.onload = function (event) {
    var info = new Information("divInformation");
    info.loader();
    info.getMonitors();
    info.showDashboard();
    window.info = info;
};

/**
 * @class Guarda toda informação
 * @constructs Informacao
 * @param {string} id - id do elemento HTML que contém a informação.
 * 
 * @property {monitors[]} monitors  - Array de objetos do tipo Monitor, para guardar todos os monitores do user
 */
function Information(id) {
    this.id = id;
    this.monitors = [];
};

/**
 * 
 * @param {*} monitor_id 
 * @param {*} user_id 
 * @param {*} title 
 */
function Monitor(monitor_id, user_id, title) {
    this.monitor_id = monitor_id;
    this.user_id = user_id;
    this.title = title;
}

Information.prototype.loader = function() {
    var preloader = document.querySelector('.lds-ripple-page');
    preloader.classList.remove('active');
    setTimeout(() => { preloader.remove(); }, 3000);
}

//Colocar o titulo HOME, limpar div
Information.prototype.showDashboard = function () {
    document.getElementById("headerTitle").textContent="Dashboard";
    document.getElementById("monitorForm").style.display="none";
    var table = document.createElement("table");
    table.id="tableMonitor";
    table.classList.add("table", "table-hover");
    table.appendChild(tableLine(new Monitor(),true));
    for(var i=0;i<this.monitors.length;i++){
        table.appendChild(tableLine(this.monitors[i],false));
    }
    var divTable = document.createElement("divTable");
    divTable.setAttribute("id", "divTable");
    divTable.appendChild(table);

    //butao add eventHandler
    function newMonitorEventHandler(){
        replaceChilds("divTable",document.createElement("div"));
        document.getElementById("monitorForm").action="javascript: info.processingMonitor('create');";
        document.getElementById("monitorForm").style.display="block";
       
    }
    createButton(divTable, newMonitorEventHandler, "Add Monitor", "btnCreate");

    replaceChilds(this.id,document.createElement("div"));
};

/**
 * Função genérica que cria um botão HTML, dá-lhe um evento e coloca-o na árvore de nós
 * @param {HTMLElement} fatherNode - nó pai do botão
 * @param {function} eventHandler - evento do botão.
 * @param {String} value - texto do botão.
 * @param {String} id - id do botão.
 */
function createButton(fatherNode, eventHandler, value, id){
    var button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.setAttribute('id', id);
    button.addEventListener("click", eventHandler);
    fatherNode.appendChild(button);
}

/**
 * Função que substitui todos os elementos filhos de um elemento HTML por um novo elemento HTML (facilitador de DOM)
 * @param {string} id - id do elemento HTML para o qual se pretende substituir os filhos.
 * @param {HTMLElement} newSon - elemento HTML que será o novo filho.
 */
function replaceChilds(id, newSon) {
    var no = document.getElementById(id);
    while(no.hasChildNodes()){
        no.removeChild(no.lastChild);
    }
    no.appendChild(newSon);
};

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com informação relativa ao estado das suas propriedades
 * @param {Object} object - objecto do qual vamos transformar o conteudo dos seus atributos em linhas
 * @param {boolean} headerFormat - controla de o formato é cabeçalho ou linha normal
 */
function tableLine(object, headerFormat, eventHandler) {
    var tr = document.createElement("tr");
    if (!headerFormat) tr.appendChild(createCellCheckbox());
    else tr.appendChild(document.createElement("th"));
    var tableCell = null;
    for (var property in object) {
        if ((object[property] instanceof Function)) 
            continue;
        if(headerFormat){
            tableCell = document.createElement("th");
            tableCell.textContent=property[0].toUpperCase() + property.substr(1,property.length-1);
        } else {
            tableCell = document.createElement("td");
            tableCell.textContent=object[property];
        }
        tr.appendChild(tableCell); 
    }
    //if(eventHandler!==undefined) createButton(tr, eventHandler, "view", object.ticket_id);
    return tr;
};
/**
 * Função genérica que tem como objetivo a criação de uma coluna com checkbox
 */
function createCellCheckbox(){
    var td=document.createElement("td");
    var check = document.createElement("input");
    check.type="checkbox";
    td.appendChild(check);
    return td;
}

Information.prototype.getMonitors = function (){
    var monitors = this.monitors;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4000/dashboard/monitors", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            response.monitor.forEach(function(current){
                monitors.push(current);
            });
        }
    };
    xhr.send();
};