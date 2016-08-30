var debug = true;
var timer;
var currentScreen = "conteudo.html";
var multioption = {
    status: false,
    div: "Q1-facil"
}

onload =  function(e){

	var html = document.querySelectorAll("html");

	for (var i=0;  i < html.length; i++) {
		html[i].addEventListener("click", listenClick);
	}

    //timer = setInterval(overflowTimer, 2000);
}

function overflowTimer(){
    idTela = getCookie("screen");
    var timestamp = new Date().getTime();

    if(debug) {
        console.log("-------after two seconds----------");
        console.log("DataCollector timestamp: "+timestamp);
        console.log("Tela Atual: "+currentScreen);
    }

    $.post("http://localhost:5000/storage/1",
        {
            idUser: "2",
            timeStamp: timestamp,
            tipo: null,
            tela: currentScreen,
            tag: null,
            x: null,
            y: null,
            id: idTela,
        },
        function(data, status){
            // alert("Data: " + data + "\nStatus: " + status);
            multioption.status = false;
            multioption.div = "Q1-facil";
        });
}

var escolha;
window.confirm = function(al, $){
    return function(msg) {
        al.call(window,msg);
        $(window).trigger("confirmacao");
    };
}(window.confirm, window.jQuery);


$(window).on("confirmacao", function(e) {
    console.log("escolhi: "+escolha);
});


function getCookie(cname) {
    var name = cname + "=";

    var ca = document.cookie.split(';');
    //console.log(ca);
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            //console.log(c);
            return c.substring(name.length,c.length);
        }
    }
  return "";
}

function listenClick(e){
    clearInterval(timer);
    timer = setInterval(overflowTimer, 2000);
    currentScreen = e.target.baseURI.split("/").slice(-1)[0];

    idTela = getCookie("screen");
    var timestamp = new Date().getTime();

    if(debug) {
        console.log("-----------------");
        console.log(e);
        console.log("tela:" + currentScreen);
        console.log("x: " + e.screenX + " y: " + e.screenY);
        console.log(e.type);
        console.log("target id: " + e.target.id);
        console.log("target class: " + e.target.className);
        console.log(e.target.localName);
        console.log(e.timeStamp);
        console.log(e.which);
        console.log("DataCollector timestamp: "+timestamp);
    }

    $.post("http://localhost:5000/storage/1",
    {
      idUser: "2",
      timeStamp: timestamp,
      tipo: e.type,
      tela: currentScreen,
      tag: e.target.localName,
      x:e.screenX,
      y:e.screenY,
      id: idTela,
    },
    function(data, status){
        // alert("Data: " + data + "\nStatus: " + status);
        multioption.status = false;
        multioption.div = "Q1-facil";
    });
}

function listemMouseOver(e){
	console.log(e.target);
}

function listemMouseOut(e){
	console.log(e.target);
}
