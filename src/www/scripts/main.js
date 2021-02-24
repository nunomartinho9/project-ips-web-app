/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(ajax)
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    var info = new Information("divInformation");
    info.loader();
    info.getMonitors()
    .then(function (){
        info.showMonitors();
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
    this.data = [];
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
function Data(info_id, monitor_id, temperature, humidity, movement, currentdate) {
    this.info_id = info_id;
    this.monitor_id = monitor_id;
    this.temperature = temperature;
    this.movement = movement;
    this.currentdate = currentdate;
}

Information.prototype.loader = function() {
    var preloader = document.querySelector('.lds-ripple-page');
    preloader.classList.remove('active');
    setTimeout(() => { preloader.remove(); }, 2000);
}



//Mostrar todos os tickets, criar tabela e botôes
Information.prototype.showMonitors = function () {
    var info = this;
   document.getElementById("headerTitle").textContent="Dasboard";
   var ticketForm = document.getElementById("monitorForm").style.display="none";
    var table = document.createElement("table");
    table.id="tableMonitor";
    table.classList.add("table", "table-hover");
    table.appendChild(tableLine(new Monitor(),true));

    function eventHandler(event) {
        var id = event.currentTarget.id;
        console.log(id);
        replaceChilds(info.id,document.createElement("div"));
        //request da ultima info daquele monitor
        info.getData(id)
        .then(function() {
            console.log(info.data[0]);
             //criar html
        var div = document.createElement("div");
        var markup = `<div class="Pagina1-monitores">
        <div class="Titulo-Pagina1-monitores">
            <p><i class="fas fa-desktop"></i>Monitor</p>
        </div>
        <div class="Pagina-centrar-monitores">
            <table class="tabela-monitores">
                <tr>
                    <td class="linha1-tabela">
                        <p class="tabela-titulos">Temperatura Atual</p>
                        <div class="tabela-caixa1">
                            <p class="pt-3">${info.data[0].temperature} ºC</p>
                        </div>
                    </td>
                    <td class="linha1-tabela">
                        <p class="tabela-titulos">Humidade Atual</p>
                        <div class="tabela-caixa1 pl-4 pr-4">
                            <p class="pt-3">${info.data[0].humidity} %</p>
                        </div>
                    </td>
                    <td class="linha1-tabela">
                        <p class="tabela-titulos">Movimento Atual</p>
                        <div class="tabela-caixa2">

                        </div>
                    </td>
                </tr>
            </table>
            <btn class="btn btn-primary text-center text-white botao-monitores">Visualizar Gráficos</btn>
        </div>
    </div>`;
    div.innerHTML = markup;
    replaceChilds(info.id, div);   
        });
       
    }

    for(var i=0;i<this.monitors.length;i++){
        
        table.appendChild(tableLine(this.monitors[i],false, eventHandler,"btnView"));
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
    if (!headerFormat && eventHandler!==undefined) createButton(tr, eventHandler, "view", object.monitor_id);
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
Information.prototype.getMonitors = function (){
    var monitors = this.monitors;
    return new Promise(function(resolve, reject) {
       
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:4000/dashboard/monitors", true);
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

Information.prototype.getData = function(id) {
    var data = this.data; 
    return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4000/dashboard/monitor/"+id, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            response.data.forEach(function(current) {
            data.push(current);  
            resolve(response);  
            });
        }
    };
    xhr.send();
});
}

