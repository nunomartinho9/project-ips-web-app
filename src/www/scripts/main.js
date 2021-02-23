/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(ajax)
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    var info = new Information("divInformation");
    info.loader();
    info.getTickets()
    .then(function (){
        info.showTickets();
    });
    window.info = info;
};

/** 
* @class Guarda toda informação
* @constructs Informacao
* @param {string} id - id do elemento HTML que contém a informação.
* 
* @property {string} id - id do elemento HTML que contém a informação.
* @property {tickets[]} tickets - Array de objetos do tipo Ticket, para guardar todos os tickets do nosso sistema
*/
function Information(id) {
    this.id = id;
    this.monitors = [];
};

/**
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
    setTimeout(() => { preloader.remove(); }, 2000);
}



//Mostrar todos os tickets, criar tabela e botôes
Information.prototype.showTickets = function () {
   document.getElementById("headerTitle").textContent="Dasboard";
   var ticketForm = document.getElementById("monitorForm").style.display="none";
    var table = document.createElement("table");
    table.id="tableTicket";
    table.classList.add("table", "table-hover");
    table.appendChild(tableLine(new Monitor(),true));

    console.log(this.monitors[0]);
    for(var i=0;i<this.monitors.length;i++){
        table.appendChild(tableLine(this.monitors[i],false));
    }
    var divTable = document.createElement("divTable");
    divTable.setAttribute("id", "divTable");
    divTable.appendChild(table);
    replaceChilds(this.id,divTable);
}

/**
 * Função genérica que cria um botão HTML, dá-lhe um evento e coloca-o na árvore de nós
 * @param {HTMLElement} fatherNode - nó pai do botão
 * @param {function} eventHandler - evento do botão.
 * @param {String} value - texto do botão.
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
//Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso ticket através do verbo GET, usando pedidos assincronos e JSON
Information.prototype.getTickets = function (){
    var monitors = this.monitors;
    return new Promise(function(resolve, reject) {
       
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:4000/monitors", true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                var response = JSON.parse(xhr.responseText);
                response.monitor.forEach(function(current){
                    monitors.push(current);
                    resolve(response);
                });
            }
        };
        xhr.send();
    });
};


Information.prototype.removeTicket = function (id){
    var info = this;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8081/helpit/admin/delete-ticket/"+id, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            info.tickets.splice(info.tickets.findIndex(i => i.ticket_id == id),1);
            info.showPerson();
        }
    };
    xhr.send();
}

/**
 * Função que insere ou atualiza o recurso ticket com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 *  * @param {String} action - controla qual a operação do CRUD queremos fazer
 */
Information.prototype.processingTicket = function (action) {
    var info = this;
    var ticket_id = document.getElementById("id").value;
    var user_id = document.getElementById("user_id").value;
    var ticket_title = document.getElementById("title").value;
    var ticket_description = document.getElementById("desc").value;
    var ticket_priority = document.getElementById("priority").value;
    var ticket_status = document.getElementById("status").value;
    var ticket = {ticket_id: ticket_id, user_id: user_id, ticket_title: ticket_title, ticket_description: ticket_description, ticket_priority: ticket_priority, ticket_status: ticket_status};
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    if(action === "create") {
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                var newTicket = new Ticket(xhr.response.insertId, user_id,ticket_title, ticket_description, ticket_priority, ticket_status);
                info.tickets.push(newTicket);
                info.showTickets();
            }
        }
        xhr.open("POST", "http://localhost:8081/helpit/new-ticket", true);
    }else if(action === "update"){
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                info.tickets.splice(info.tickets.findIndex(i => i.ticket_id == ticket_id), 1);
                info.tickets.push(ticket);
                info.showTickets();
            }
        }
        xhr.open("PUT", "http://localhost:8081/helpit/update-ticket/"+ticket_id, true);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(ticket));

}