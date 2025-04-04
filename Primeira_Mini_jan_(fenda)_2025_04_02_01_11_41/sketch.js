// Declaração das variáveis principais
let velocidade = 50; // Posição inicial do quadrado
let pular = 450; // Posição vertical do quadrado (altura inicial)
let velY = 0; // Velocidade vertical do quadrado
let gravidade = 0.9; // Intensidade da gravidade
let pulo = -12; // Força do pulo (valor negativo para subir)
let noChao = false; // Verifica se o quadrado está no chão

let obstaculos = []; // Array para armazenar obstáculos

function setup() {
  createCanvas(700, 500);

  // Criando obstáculos iniciais
  obstaculos.push({ x: 400, y: 470, tamanho: 10 });
  obstaculos.push({ x: 600, y: 470, tamanho: 10 });
}

function draw() {
  background("white");

  // Desenha o chão
  fill("red");
  rect(0, 480, 700, 20);

  // Aplica gravidade
  velY += gravidade;
  pular += velY;

  // Impede que o quadrado ultrapasse o chão
  if (pular > 450) {
    pular = 450;
    velY = 0;
    noChao = true;
  }

  // Desenha o quadrado azul (jogador)
  fill("blue");
  square(velocidade, pular, 30);

  // Atualiza e desenha os obstáculos
  fill("black");
  for (let i = 0; i < obstaculos.length; i++) {
    obstaculos[i].x -= 3; // Move os obstáculos para a esquerda
    square(obstaculos[i].x, obstaculos[i].y, obstaculos[i].tamanho);

  // sistema de colisão 

  //#1 A borda direita do jogador está à esquerda da borda direita d           obstáculo
  //#2 A borda esquerda do jogador está à direita da borda esquerda do         obstáculo (os dois juntos significam que os quadrados se cruzam no Eixo X)
  //#3 A borda inferior do jogador passou da borda superior do obstáculo, ou   seja, está tocando nele verticalmente.
    if (
      velocidade < obstaculos[i].x + obstaculos[i].tamanho && // #1
      velocidade + 30 > obstaculos[i].x && // #2
      pular + 30 > obstaculos[i].y // #3
    ) {
      noLoop(); // Para o jogo ao colidir
      console.log("Game Over!");
    }
  }

  // Adiciona um novo obstáculo ocasionalmente
  if (frameCount % 100 === 0) {
    obstaculos.push({ x: width, y: 470, tamanho: 10 });
  }
}

function keyPressed() {
  if (keyCode === 32 && noChao) {
    velY = pulo;
    noChao = false;
  }
}