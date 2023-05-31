/* Seleccionando el elemento HTML con la clase "cuadroPuntuacion" y almacenándolo en la variable
constante "cuadroPuntuacion". */
 const cuadroPuntuacion=document.querySelector('.cuadroPuntuacion');

           /* Estas líneas de código van seleccionando los elementos HTML con las clases
           "cuadroInicial" y "gameArea" y almacenándolos en las variables constantes `cuadroInicial`
           y `gameArea`, respectivamente. Estos elementos se utilizan posteriormente en el código
           para agregar detectores de eventos y manipular su contenido. */
            const cuadroInicial=document.querySelector('.cuadroInicial');
            const gameArea=document.querySelector('.gameArea');
            /*console.log(gameArea);*/
            /* Agregar un detector de eventos de clic al elemento HTML con la clase "cuadroInicial" y
            llamar a la función "iniciar" cuando se hace clic en el elemento. */
            cuadroInicial.addEventListener('click',start);
          /* Estas líneas de código crean dos objetos, `player` y `keys`, utilizando la palabra clave
          `let` para declararlos como variables. */
            let player={speed:10,cuadroPuntuacion:0};
            let keys ={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false}

         /* Estas líneas de código agregan detectores de eventos al objeto del documento para los
         eventos 'keydown' y 'keyup', respectivamente. Cuando se presiona o suelta una tecla, se
         llama a la función correspondiente 'keyDown' o 'keyUp'. Estas funciones actualizan el
         objeto 'llaves' con el estado actual de las teclas de flecha, que se utilizan para
         controlar el movimiento del automóvil del jugador en el juego. */
            document.addEventListener('keydown',keyDown);
            document.addEventListener('keyup',keyUp);


            function keyDown(e){
                e.preventDefault();
                keys[e.key]=true;

                // console.log(e.key);
                // console.log(keys);
            }
        
            function keyUp(e){
                e.preventDefault();
                keys[e.key]=false;
                /*console.log(e.key);
                console.log(keys);*/
            }

            function isCollide(a,b){
                aRect=a.getBoundingClientRect();
                bRect=b.getBoundingClientRect();
                return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
            }

            function moveLines(){
                let lines=document.querySelectorAll('.lines');
                lines.forEach(function(item){
                    if(item.y >=650){
                        item.y-=740;
                    }
                    item.y+=player.speed;
                    item.style.top=item.y+"px";
                })
            }
            function endGame(){
                player.start=false;
                cuadroInicial.classList.remove('hide');
                cuadroInicial.innerHTML="Fin del juego <br> Puntuación final:"+player.cuadroPuntuacion+" "+"<br>Pulsa de nuevo para volver a empezar";
            }
            function moveEnemy(yo){
                let carroCompetencia=document.querySelectorAll('.carroCompetencia');
                carroCompetencia.forEach(function(item){

                    if(isCollide(yo,item)){
                        console.log("Bang!");
                        endGame();
                    }
                    if(item.y >=750){
                        item.y=-300;
                        item.style.left=Math.floor(Math.random()*350)+"px";
                    }
                    item.y+=player.speed;
                    item.style.top=item.y+"px";
                })
            }
            /* La función `gamePlay()` es responsable de controlar el ciclo del juego. Primero
            selecciona el elemento del automóvil del jugador y obtiene las dimensiones del área de
            juego. Luego, comprueba si el juego ha comenzado (`player.start` es verdadero) y, de ser
            así, llama a las funciones `moveLines()` y `moveEnemy()` para mover las líneas de la
            carretera y los coches enemigos respectivamente. */
            function gamePlay(){
                console.log("here we go");
                let yo=document.querySelector('.yo');
                let road=gameArea.getBoundingClientRect();
                /*console.log(road);*/
                if(player.start){
                    moveLines();
                    moveEnemy(yo);

                    if(keys.ArrowUp && player.y>(road.top+70)){
                        player.y-=player.speed
                    }
                    if(keys.ArrowDown && player.y<(road.bottom-85)){
                        player.y+=player.speed
                    }
                    if(keys.ArrowLeft && player.x>0 ){
                        player.x-=player.speed
                    }
                    if(keys.ArrowRight && player.x<(road.width-50)){
                        player.x+=player.speed
                    }
                    yo.style.top=player.y+"px";
                    yo.style.left=player.x+"px";
                    window.requestAnimationFrame(gamePlay);
                    console.log(player.cuadroPuntuacion++);
                    player.cuadroPuntuacion++;
                    let ps=player.cuadroPuntuacion-1;
                    cuadroPuntuacion.innerText="cuadroPuntuacion: "+ps;
                }
            }
            function start(){
                //cuadroInicial.classList.remove('hide');
                cuadroInicial.classList.add('hide');
                gameArea.innerHTML="";
                player.start=true;
                player.cuadroPuntuacion=0;
                window.requestAnimationFrame(gamePlay);

                for(x=0;x<5;x++){
                    let roadLine=document.createElement('div');
                    roadLine.setAttribute('class','lines');
                    roadLine.y=(x*150);
                    roadLine.style.top=roadLine.y+"px";
                    gameArea.appendChild(roadLine);
                }

                let yo=document.createElement('div');
                yo.setAttribute('class','yo');
                /*yo.innerText="Hey I am yo";*/
                gameArea.appendChild(yo);

             /* Estas líneas de código establecen la posición inicial del automóvil del jugador en el
             área de juego. `yo` es una referencia al elemento del coche del jugador, y `offsetLeft`
             y `offsetTop` son propiedades que dan la distancia entre los bordes izquierdo y
             superior del elemento y los bordes izquierdo y superior de su elemento principal
             desplazado. Al establecer `player.x` y `player.y` en estos valores, el código almacena
             la posición inicial del automóvil del jugador para su uso posterior en el ciclo del
             juego. */
                player.x=yo.offsetLeft;
                player.y=yo.offsetTop;


               /* console.log(yo.offsetTop);
                console.log(yo.offsetLeft);*/

                for(x=0;x<3;x++){
                    let enemyCar=document.createElement('div');
                    enemyCar.setAttribute('class','carroCompetencia');
                    enemyCar.y=((x+1)*350)*-1;
                    enemyCar.style.top=enemyCar.y+"px";
                    enemyCar.style.backgroundColor=randomColor();
                    enemyCar.style.left=Math.floor(Math.random()*350)+"px";
                    gameArea.appendChild(enemyCar);
                }


            }
            function randomColor(){
                function c(){
                    let hex=Math.floor(Math.random()*256).toString(16);
                    return ("0"+String(hex)).substr(-2);
                }
                return "#"+c()+c()+c();
            }