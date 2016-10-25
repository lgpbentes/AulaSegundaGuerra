var debug = true;
var timer;
var currentScreen = "";
var idClass = "";

var multioption = {
    status: false,
    id: "Q1-easy",
    type: 'tip'
}

onload =  function(e){

	var html = document.querySelectorAll("html");
    currentScreen = e.target.baseURI.split("/").slice(-1)[0];
	for (var i=0;  i < html.length; i++) {
		html[i].addEventListener("click", listenClick);
	}

    timer = setInterval(overflowTimer, 2000);
}

function overflowTimer(){
   // idTela = getCookie("screen");
    var timestamp = new Date().getTime();

    if (currentScreen == "questionario.html" && idClass == "") idClass = "Q:1:H:1-1";
    if(debug) {
       /* console.log("-------after two seconds----------");
        console.log("DataCollector timestamp: "+timestamp);
        console.log("Tela Atual: "+currentScreen);*/
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
       //     id: idTela,
            classId: idClass
        },
        function(data, status){
            //console.log("PLAYER------Data: " + data + "\nStatus: " + status);
            d = data;
            
            if (d.recommendation[0].recommendation.charAt(0) == "D"){
                multioption.status = true;
                multioption.type = "tip";
                multioption.id = d.recommendation[0].recommendation;
            }
            if (d.recommendation[0].recommendation.charAt(0) == "C") {
                multioption.status = true;
                multioption.type = "content";
                multioption.id = d.recommendation[0].recommendation;
            }
            if (d.recommendation[0].recommendation.charAt(0) == "Q") {
                multioption.status = true;
                multioption.type = "question";
                multioption.id = d.recommendation[0].recommendation;

            }
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
    idClass = e.target.className;
    //idTela = getCookie("screen");
    var timestamp = new Date().getTime();

    if(debug) {
       console.log("-----------------");
        console.log(e);
        console.log("tela:" + currentScreen);
        console.log("x: " + e.screenX + " y: " + e.screenY);
        console.log(e.type);
        console.log("target id: " + e.target.id);
        console.log("target class: " + e.target.className);
        console.log("selected option:", e.target.defaultValue);
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
     // alternativaSelecionada: e.target.defaultValue,
//      id: idTela,
      classId: idClass
    },
    function(data, status){
        // alert("Data: " + data + "\nStatus: " + status);
        d = data;
            
        if (d.recommendation[0].recommendation.charAt(0) == "D"){
            multioption.status = true;
            multioption.type = "tip";
            multioption.id = d.recommendation[0].recommendation;
        }
        if (d.recommendation[0].recommendation.charAt(0) == "C") {
            multioption.status = true;
            multioption.type = "content";
            multioption.id = d.recommendation[0].recommendation;
        }
        if (d.recommendation[0].recommendation.charAt(0) == "Q") {
            multioption.status = true;
            multioption.type = "question";
            multioption.id = "T" + d.recommendation[0].recommendation;
        }
    });
}

function listemMouseOver(e){
	console.log(e.target);
}

function listemMouseOut(e){
	console.log(e.target);
}
