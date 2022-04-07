var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    Input2,
    isReaction = false,
    unkwnCommReaction = "Comando no Reconocido",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function(e){
    if(e.keyCode == 13){
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if(input.length > 0) {
    createBubble(input)
    }
}
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();
  

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if(input.length > 0) {
    createBubble(input)
  }
}) //end of eventlistener

var createBubble = function(input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');
  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble)

  checkInput(input);
}

var checkInput = function(input) {
  hasCorrectInput = false;
  isReaction = false;
  //Checks all text values in possibleInput
  for(var textVal in possibleInput){
    //If user reacts with "yes" and the previous input was in textVal
    
    if(previousInput == textVal) {
      isReaction = true;
      hasCorrectInput = true;
      Input2 = input;
      botResponse(textVal);
    }
    //Is a word of the input also in possibleInput object?
    if(input == textVal || input.indexOf(textVal) >=0 && isReaction == false){
			console.log("succes");
        hasCorrectInput = true;
        botResponse(textVal);
		}
	}
  //When input is not in possibleInput
  if(hasCorrectInput == false){
    console.log("failed");
    unknownCommand(unkwnCommReaction);
    botResponse("salir")
    hasCorrectInput = true;
  }
}

// debugger;

function botResponse(textVal) {
  //sets previous input to that what was called
  // previousInput = input;

  //create response bubble
  var userBubble = document.createElement('li');
  userBubble.classList.add('bot__output');
  if(textVal == "salir"){
    if (typeof salirInput["salir"] === "function") {
      //adds input of textarea to chatbubble list item
        userBubble.innerHTML = salirInput["salir"]();
      } else {
        userBubble.innerHTML = salirInput["salir"];
      }
  }
  if(isReaction){
    if (typeof reactionInput[textVal] === "function") {
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = reactionInput[textVal]();
    } else {
      userBubble.innerHTML = reactionInput[textVal];
    }
  }else if(!isReaction){
    //Is the command a function?
    if (typeof possibleInput[textVal] === "function") {
      // console.log(possibleInput[textVal] +" is a function");
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = possibleInput[textVal]();
    } else {
      userBubble.innerHTML = possibleInput[textVal];
    }
  }
  //add list item to chatlist
  chatList.appendChild(userBubble) //adds chatBubble to chatlist

  // reset text area input
  textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
    console.log(response.clientHeight);
  }, 0)
}

function inicialtext(){
  var response = document.createElement('li');
  response.classList.add("bot__output");

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = '<span class="bot__output--second-sentence">Puedes utilizar los siguientes comandos para resolver tus dudas</span>'+
  '<ul>'+
    '<li class="input__nested-list"><span class="bot__command">Pagina</span></li>'+
    '<li class="input__nested-list"><span class="bot__command">Privacidad</span></li>'+
    '<li class="input__nested-list"><span class="bot__command">Doctores</span></li>'+
  '</ul>';

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
    console.log(response.clientHeight);
  }, 0)



}

function reaction1(e){
  var response = document.createElement('li');
  response.classList.add("bot__output");

  var re1='', re2='', re3='';
  if(e=="pagina"){
    re1 = '1. ¿Qué es quetzual?'
    re2 = '2. ¿Cuál es el objetivo de quetzual?'
  }else if(e=="privacidad"){
    re1 = '1. ¿Quién tiene acceso a mis datos?'
    re2 = '2. ¿Cómo protegen mis datos?'
    re3 = '<li class="input__nested-list"><span class="bot__command">3. ¿Cómo puedo eliminar mis datos?</span></li>'
  }else if(e=="doctores"){
    re1 = '1. ¿la información que proporcionan es de confianza?'
    re2 = '2. ¿Cómo puedo unirme al proyecto como un doctor?'
  }

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = '<span class="bot__output--second-sentence">Utilice los numeros que aparecen para indicar la acción que desea realizar</span>'+
  '<ul>'+
    '<li class="input__nested-list"><span class="bot__command">'+re1+'</span></li>'+
    '<li class="input__nested-list"><span class="bot__command">'+re2+'</span></li>'+re3+
    '<li class="input__nested-list"><span class="bot__command">Salir</span></li>'+
  '</ul>';

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
    console.log(response.clientHeight);
  }, 0)
}

function responseImg(e) {
  var image = new Image();

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = "./img/miyamura.jpg";
  chatList.appendChild(image);

  animateBotOutput()
  if(image.completed) {
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function(){
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
}

//change to SCSS loop
function animateBotOutput() {
  chatList.lastElementChild.style.animationDelay= (animationCounter * animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];
}


// hlep

var possibleInput = {
  // "hlep" : this.help(),
  "pagina" : function(){
    reaction1("pagina")
    commandReset(0);
    return
    },
  "privacidad" : function(){
    reaction1("privacidad")
    commandReset(1);
    return
    },
  "doctores" : function(){
    reaction1("doctores")
    commandReset(2);
    return
    },
}

var reactionInput = {
  "pagina" : function(){
    var seguir = false;
      if(Input2 == "1" || Input2.indexOf("1") >=0){
        responseText("Quetzual es una pagina dirigida para los estudiantes del CECyT #9 con el fin de brindar una mejor guía a los estudiantes en su educación sobre salud sexual mediante la resolución de dudas sobre el tema.");
        responseText("Salir")
        seguir = true;
      }else  if(Input2 == "2"|| Input2.indexOf("2") >=0){
        responseText("Desarrollar un sistema de información que se encargue de gestionar las dudas de los estudiantes del CECyT #9 acerca de la salud sexual para brindar una guía en temas de educación sexual mediante una aplicación web.");
        responseText("Salir")
        seguir = true;
        
      }else if(Input2 == "salir" || Input2.indexOf("salir") >=0){
        inicialtext()
        seguir = true;
        previousInput = ''
      }else if(!seguir){
        unknownCommand(unkwnCommReaction);
        reaction1("pagina")
      }
    return
    },
  "privacidad" : function(){
    var seguir = false;
    if(Input2 == "1" || Input2.indexOf("1") >=0){
      responseText("Los datos como son tu correo, genero, contraseña y nombre de usuario solo tienes acceso tú. Las preguntas que realices en el programa son visibles para doctores, administradores y otros usuarios.");
      responseText("Salir")
      seguir = true;
    }else if(Input2 == "2" || Input2.indexOf("2") >=0){
      responseText("Tus Datos personales están protegidos para solo tu puedas acceder a esos datos. Los datos se encuentran guardados en una base de datos centralizada, cifrada con AES 256 y el uso de tokens mediante la implementación JWT para verificación de los permisos para la realización de las acciones que pueden comprometer los datos personales recabados en el sistema.On this GitHub page you'll find everything about Navvy");
      responseText("Salir")
      seguir = true;
      
    }else if(Input2 == "3" || Input2.indexOf("3") >=0){
      responseText("Para poder eliminar tu cuenta debes ingresar al sistema ir a la parte de cuenta y bajar donde dice eliminar cuenta, esta acción serás permanente y ya no podrás acceder al sistema, al presionar eliminar tu cuenta los datos de las preguntas que se han realizado no se borraran del sistema esto debido a que podría ayudar a otros usuarios con sus dudas");
      responseText("Salir")
      seguir = true;
    }else if(Input2 == "salir" || Input2.indexOf("salir") >=0){
      inicialtext()
      seguir = true;
      previousInput = ''
    }else if(!seguir){
      unknownCommand(unkwnCommReaction);
      reaction1("privacidad")
    }
    return
    },
  "doctores" : function(){
    var seguir = false;
    if(Input2 == "1" || Input2.indexOf("1") >=0){
      responseText("Los doctores encargados de responder las preguntas del sistema son especialistas en el tema de educación sexual y ginecología, por lo que las guías que proporcionan son de confianza");
      responseText("Salir")
      seguir = true;
      
    }else if(Input2 == "2" || Input2.indexOf("2") >=0){
      responseText("Actualmente no estamos buscando nuevos integrantes debido a que aun es proyecto pequeño pero puedes enviar un correo a quetzual@gmail.com por si quieres estar mas al pendiente si hay convocatorias");
      responseText("Salir")
      seguir = true;
      
    }else if(Input2 == "salir" || Input2.indexOf("salir") >=0){
      inicialtext()
      seguir = true;
      previousInput = ''
    }else if(!seguir){
      unknownCommand(unkwnCommReaction);
      reaction1("doctores")
    }
    return
    },
}

var salirInput = {
  "salir": function(){
    inicialtext();
    return
  },
}

/*"best work" : function(){
    //Redirects you to a different page after 3 secs
    responseText("On this GitHub page you'll find everything about Navvy");
    responseText("<a href='https://github.com/meesrutten/chatbot'>Navvy on GitHub</a>")
    animationCounter = 1;
    return
  },
  "about" : function(){
    responseText("Things I want to learn or do:");
    responseText("Get great at CSS & JS animation");
    responseText("Create 3D browser experiences");
    responseText("Learn Three.js and WebGL");
    responseText("Combine Motion Design with Front-End");
    animationCounter = 1;
    return
    }*/