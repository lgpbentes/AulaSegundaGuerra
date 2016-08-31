var question1Hard;
var question1Easy;
var question2Hard;
var question2Easy;
var exercise1;
var exercise2;

var question;

var aula;
var screen;
var idView;
var bkpIdView;

//ATRIBUTO NOME ABAIXO, REPREENTA O NOME DO ARQUIVO. EX.: QUESTÃO1.HTML
//Aula que possui exercícios (NESTE CASO UMA AULA QUE POSSUI DOIS EXERCICIO)
//Exercicio que possui questão, (NESTE CASO DUAS QUESTÃO, A FACIL E A DIFICIL)
//Questão que possui dica, nome e o nível (fácil, dificil)

/*
view < -1 significa tela 1 de conteudo
view 0 significa questão 1
view 1 significa questão 2
view n significa questão n+1
*/
//Essa função é executada somente uma vez durante a execução do código
function setCookie(name,value){    //função universal para criar cookie 
	var date = new Date(); //  criando o COOKIE com a data atual
	date.setTime(date.getTime()+(1*24*60*60*1000));
	expires = date.toGMTString();
	
	document.cookie = name+"="+value+"; expires="+expires+"; path=iot/";
    if(document.cookie)
        return true;
}


function listen(){
	if(multioption.status == true){

	}
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function getCookie(){
	var c_name = document.cookie; // listando o nome de todos os cookies
	if(c_name!=undefined && c_name.length > 0) // verificando se o mesmo existe
	{
		var posCookie = c_name.indexOf("screen"); // checando se existe o cookieSeuNome 
	
		if (posCookie >= 0) //se existir o cookie mostra um alert no browser
		{
			alert("Cookie Existe!!!");
		}
		else
			alert("Cookie não existe!!!");
	}
}

function initializeVariables(){	

	idView = -1; //id da primeira tela, conteudo

	question1Hard = new Object();
	//question1Hard.content = "conteudo.html";
	question1Hard.tip = "dica-dificil-1.html";
	question1Hard.flagTip = false;
	question1Hard.nome = "dificil-1.html";
	question1Hard.level = "hard";
	question1Hard.flagBackContent = false;
	//question1Hard.flagState = false;

	question1Easy = new Object();
	question1Easy.tip = "dica-facil-1.html";
	question1Easy.flagTip = false;
	question1Easy.nome = "facil-1.html";
	question1Easy.level = "easy";
	question1Easy.flagShow = false;
	question1Easy.flagBackContent = false;

	question2Hard = new Object();
	question2Hard.tip = "dica-dificil-2.html";
	question2Hard.flagTip = false;
	question2Hard.nome = "dificil-2.html";
	question2Hard.level = "hard";
	question2Hard.flagBackContent = false;

	question2Easy = new Object();
	question2Easy.tip = "dica-facil-2.html";
	question2Easy.flagTip = false;
	question2Easy.nome = "facil-2.html";
	question2Easy.level = "easy";
	question2Easy.flagShow = false;
	question2Easy.flagBackContent = false;

	exercise1 = new Object();
	exercise1["questionHard"] = question1Hard;
	exercise1["questionEasy"] = question1Easy;
	exercise1["content"] = "conteudo.html";
	
	exercise2 = new Object();
	exercise2["questionHard"] = question2Hard;
	exercise2["questionEasy"] = question2Easy;
	exercise2["content"] = "conteudo.html";
	
	aula = new Array();
	aula[0] = exercise1;
	aula[1] = exercise2;

//	console.log ("TAM: "+ aula.length);
	setCookie("screen","conteudo"); 	
	
/*	console.log ("content: "+aula[0]["questionHard"]["tip"]);
	console.log ("content: "+aula[0]["questionHard"]["nome"]);
	console.log ("content: "+aula[0]["questionHard"]["level"]);

	console.log ("content: "+aula[0]["questionEasy"]["tip"]);	 
	console.log ("content: "+aula[0]["questionEasy"]["nome"]);	 
	console.log ("content: "+aula[0]["questionEasy"]["level"]);

	console.log ("content: "+aula[1]["questionHard"]["tip"]);
	console.log ("content: "+aula[1]["questionHard"]["nome"]);
	console.log ("content: "+aula[1]["questionHard"]["level"]);

	console.log ("content: "+aula[1]["questionEasy"]["tip"]);	 
	console.log ("content: "+aula[1]["questionEasy"]["nome"]);	 
	console.log ("content: "+aula[1]["questionEasy"]["level"]);

	console.log ("CONTE: "+aula[0]["content"]);
	console.log ("CONTE: "+aula[1]["content"]);
*/
}

function proxima() {

	idView++;
	console.log("proxima",idView);
	idTela = getCookie("screen");
	//console.log(idTela); // nao tá pegando
  	var timestamp = new Date().getTime();	
    //$.post("http://192.168.1.123:5000/storage/1",
    $.post("http://localhost:5000/storage/1",
    {
      idUser: "2",
      timeStamp: timestamp,
      tipo: "click",
      tag: "btn",
      x:"200",
      y:"100",
      id: idTela,
    },
    function(data, status){
       // alert("Data: " + data + "\nStatus: " + status);
    });

	if (idView == -1) {
		window.frames[0].location = "conteudo.html";		
		screen = "conteudo";
		if(setCookie("screen", screen)); console.log("ENTRO NA TELA CONTEUDO");			
		//console.log(getCookie("screen"));
	} else if(idView == aula.length) {
		idView = aula.length;
		console.log("deu errado");
		stopThreadSendAnalytics();
		window.frames[0].location = "fim.html";
		screen = "conteudo";
		if(setCookie("screen", screen)); //console.log("true");	
		//console.log(getCookie("screen"));
	} else if (idView == -2){
		idView = bkpIdView;
		if (aula[idView]["questionEasy"]["flagShow"] == false &&
			aula[idView]["questionHard"]["flagTip"] == false) {
			window.frames[0].location = aula[idView]["questionHard"]["nome"];
		}
		else if (aula[idView]["questionEasy"]["flagShow"] == false &&
			aula[idView]["questionHard"]["flagTip"] == true) {
			window.frames[0].location = aula[idView]["questionHard"]["nome"];
			console.log("here");
		}
		else if (aula[idView]["questionHard"]["flagBackContent"] == false){
			//window.frames[0].location = "conteudo.html";
			console.log("question hard");
		}
		else {
			
			window.frames[0].location = aula[idView]["questionEasy"]["nome"];
			console.log("-2 ELSE EASY");
		}
	} else {
		//console.log("ELSE");
		if (aula[idView]["questionEasy"]["flagShow"] == false) {
		window.frames[0].location = aula[idView]["questionHard"]["nome"];
		//console.log("IF HARD");
		} else{
			window.frames[0].location = aula[idView]["questionEasy"]["nome"];
			//console.log("ELSE EASY");
		}
		screen = "questionHard";
		if(setCookie("screen", screen)); //console.log("true");	
		//console.log(getCookie("screen"));
	}
}

function volta() {
	idView--;

	idTela = getCookie("screen");
	//console.log(idTela);
  	var timestamp = new Date().getTime();	
    //$.post("http://192.168.1.123:5000/storage/1",
    $.post("http://localhost:5000/storage/1",
    {
      idUser: "2",
      timeStamp: timestamp,
      tipo: "click",
      tag: "btn",
      x:"200",
      y:"100",
      id: idTela,
    },
    function(data, status){
       // alert("Data: " + data + "\nStatus: " + status);
    });

	if(idView <= -1){
		//bkpIdView = idView;
		idView = -1;
		window.frames[0].location = "conteudo.html";
		screen = "conteudo";
		if(setCookie("screen", screen)); //console.log("true");	
		//console.log(getCookie("screen"));
	} else {
		if (aula[idView]["questionEasy"]["flagShow"] == false) {
		window.frames[0].location = aula[idView]["questionHard"]["nome"];
		} else{
			window.frames[0].location = aula[idView]["questionEasy"]["nome"];
		}
		screen = "questionHard";
		if(setCookie("screen", screen)); //console.log("true");	
		//console.log(getCookie("screen"));
	}
}

function changeContent(){
	// >-1 significa está em um exercicio e não em um conteúdo ou dica
	console.log("idView",idView);
	if (idView > -1){
		bkpIdView = idView;
		console.log("estou no dentro do loop");
		if (aula[idView]["questionEasy"]["flagShow"] == false) {
			if (aula[idView]["questionHard"]["flagTip"] == false){
				stopThreadSendAnalytics();
				var choose = confirm('Você aceita uma dica? (Difícil)');
				startThreadSendAnalytics();
				sendDataAlert();
				aula[idView]["questionHard"]["flagTip"] = true; // marcar que passou pela dica	
				if (choose) {
					window.frames[0].location = aula[idView]["questionHard"]["tip"];
					console.log("dica difícil");
					idView = -3;
				}
				else {
					console.log("Aluno nao aceitou a dica", idView);
				}
			}
			else if (aula[idView]["questionHard"]["flagBackContent"] == false &&
				aula[idView]["questionHard"]["flagTip"] == true){
				
				stopThreadSendAnalytics();
				alert('Vamos voltar ao conteúdo? (Difícil)');
				startThreadSendAnalytics();
				sendDataAlert();
				aula[idView]["questionHard"]["flagBackContent"] = true;
				window.frames[0].location = aula[idView]["content"];
				idView = -3;
				console.log("volta ao conteúdo (difícil)");			
			} else if (aula[idView]["questionEasy"]["flagShow"] == false){
				stopThreadSendAnalytics();
				alert('Que tal tentar uma questão mais fácil?');
				startThreadSendAnalytics();
				sendDataAlert();
				aula[idView]["questionEasy"]["flagShow"] = true;
				window.frames[0].location = aula[idView]["questionEasy"]["nome"];
				console.log("questão mais fácil");				
			} else if (aula[idView]["questionEasy"]["flagTip"] == false){
				stopThreadSendAnalytics();
				var choose = confirm('Você aceita uma dica? (Fácil)');
				startThreadSendAnalytics();
				sendDataAlert();
				aula[idView]["questionEasy"]["flagTip"] = true;
				if (choose) {
					window.frames[0].location = aula[idView]["questionHard"]["tip"];
					console.log("dica fácil");
					idView = -3;				
				}
				else {
					console.log("Aluno não aceitou dica");					
				}
			} else{
				console.log("Professor será notificado");
			}
		} else {
			console.log("else");
			if (aula[idView]["questionEasy"]["flagTip"] == false){
				stopThreadSendAnalytics();
				var choose = confirm('Você aceita uma dica? (Fácil)');
				startThreadSendAnalytics();
				sendDataAlert();
				aula[idView]["questionEasy"]["flagTip"] = true;
				if (choose) {
					window.frames[0].location = aula[idView]["questionEasy"]["tip"];
					console.log("dica fácil");	
					idView = -3;
				}
				else {
					console.log("Não aceitou a dica");
				}
			} else if (aula[idView]["questionEasy"]["flagBackContent"] == false){
				stopThreadSendAnalytics();
				alert('Vamos voltar ao conteúdo? (Fácil)');
				startThreadSendAnalytics();
				sendDataAlert();
				aula[idView]["questionEasy"]["flagBackContent"] = true;
				window.frames[0].location = aula[idView]["content"];
				idView = -3;
				console.log("volta ao conteúdo (fácil)");			
			}  else{
				console.log("Professor será notificado");
				stopThreadSendAnalytics();
				window.frames[0].location = "fim.html";
			
			}

		}	
	}
}

recomenderThread = window.setInterval('adaptativeContent()',3000);

function adaptativeContent(){
	var xhttp = new XMLHttpRequest();
	var flag;
  var timestamp = new Date().getTime();
  
  //xhttp.open("GET", "http://192.168.1.123:5000/analytics/1?idUser=0002&timestamp="+timestamp);
  xhttp.open("GET", "http://localhost:5000/analytics/1?idUser=0002&timestamp="+timestamp);
  xhttp.send();
	
  	xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		flag = xhttp.responseText;
		console.log("flag: "+flag);
		if (flag == "True") {
			changeContent();	
				}
			}
		};
	}
function stopThreadSendAnalytics (){
	clearInterval(recomenderThread);
}

function startThreadSendAnalytics(){
	recomenderThread = window.setInterval('adaptativeContent()',3000);	
}

function sendDataAlert(){
	idTela = getCookie("screen");
  	var timestamp = new Date().getTime();	
    //$.post("http://192.168.1.123:5000/storage/1",
    $.post("http://localhost:5000/storage/1",
    {
      idUser: "2",
      timeStamp: timestamp,
      tipo: "click",
      tag: "alert",
      x:"200",
      y:"100",
      id: idTela,
    },
    function(data, status){
       // alert("Data: " + data + "\nStatus: " + status);
    });

}

