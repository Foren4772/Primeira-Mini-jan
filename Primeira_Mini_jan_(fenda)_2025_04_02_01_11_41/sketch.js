// Declaração das variáveis principais
let velocidade = 0;  // Posição horizontal do quadrado
let pular = 450;     // Posição vertical do quadrado (altura inicial)
let velY = 0;        // Velocidade vertical do quadrado
let gravidade = 0.9; // Intensidade da gravidade
let pulo = -12;      // Força do pulo (valor negativo para subir)
let noChao = false;  // Variável para verificar se o quadrado está no chão

function setup() {
  createCanvas(700, 500); // Cria o canvas de 700x500 pixels
}

function draw() {
  background("white"); // Define o fundo como branco

  // Desenha o chão
  fill("red");
  rect(0, 480, 700, 20);

  // Aplica a gravidade, aumentando a velocidade vertical
  velY += gravidade;
  pular += velY; // Atualiza a posição vertical do quadrado

  // Impede que o quadrado ultrapasse o chão
  if (pular > 450) {
    pular = 450; // Mantém o quadrado no chão
    velY = 0; // Reseta a velocidade vertical ao tocar o chão
    noChao = true; // Marca que o quadrado está no chão
  }

  // Desenha o quadrado azul
  fill("blue");
  square(velocidade, pular, 30);
  
  // Move o quadrado para a direita continuamente
  velocidade += 3;
}

function keyPressed() {
  if (keyCode === 32 && noChao) { // Se a tecla espaço for pressionada e estiver no chão
    velY = pulo; // Aplica a força do pulo
    noChao = false; // Define que o quadrado não está mais no chão
  }
}
