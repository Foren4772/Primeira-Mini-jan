// Posição do jogador no eixo X
let velocidade = 50;
// Posição do jogador no eixo Y
let pular = 450;
// Velocidade vertical (gravidade)
let velY = 0;
// Força da gravidade
let gravidade = 1;
// Força do pulo
let pulo = -12;
// Verifica se o jogador está no chão
let noChao = false;

// Lista de plataformas
let plataformas = [];
// Velocidade do jogo (quanto as plataformas se movem)
let velocidadeJogo = 3;
// Quanto a velocidade aumenta a cada frame
let aumentoVelocidade = 0.005;

function setup() {
  // Cria a tela do jogo
  createCanvas(700, 500);

  // Começa com uma plataforma cobrindo a tela toda
  plataformas.push({ x: 0, largura: width });
}

function draw() {
  // Cor de fundo
  background("rgb(0,126,255)");

  // Mostra a velocidade atual no console
  console.log(velocidadeJogo)

  // Aplica gravidade ao jogador
  velY += gravidade;
  pular += velY;

  // Desenha o chão (faixa marrom embaixo)
  fill("brown");
  rect(0, 481, 700, 30);

  // Desenha as plataformas (verdes)
  fill("#8BC34A");
  for (let i = plataformas.length - 1; i >= 0; i--) {
    let plat = plataformas[i];
    // Move as plataformas para a esquerda
    plat.x -= velocidadeJogo;

    // Desenha a plataforma
    rect(plat.x, 480, plat.largura, 20);

    // Remove a plataforma se ela saiu da tela
    if (plat.x + plat.largura < 0) {
      plataformas.splice(i, 1);
    }
  }

  // Verifica se o jogador está sobre alguma plataforma
  let sobrePlataforma = false;
  for (let plat of plataformas) {
    if (
      velocidade + 30 > plat.x &&
      velocidade < plat.x + plat.largura &&
      pular + 30 >= 480
    ) {
      sobrePlataforma = true;
      break;
    }
  }

  // Se estiver sobre a plataforma, para de cair
  if (sobrePlataforma && pular + 30 >= 480) {
    pular = 450;
    velY = 0;
    noChao = true;
  } 
  // Se cair demais, acaba o jogo
  else if (pular >= height) {
    noLoop();
    console.log("Game Over! Você caiu.");
  } 
  // Se não está no chão nem caiu, está no ar
  else {
    noChao = false;
  }

  // Desenha o jogador (quadrado azul)
  fill("blue");
  square(velocidade, pular, 30);

  // Ponto final da última plataforma para continuar gerando
  let ultimaX = plataformas.length > 0
    ? plataformas[plataformas.length - 1].x + plataformas[plataformas.length - 1].largura
    : 0;

  // Gera novas plataformas conforme o jogo avança
  while (ultimaX < width + 200) {
    // Define a largura dos buracos (fissuras) e plataformas
    let buraco = random(16 + velocidadeJogo * 4, 27 + velocidadeJogo * 17);
    let plataforma = random(110 + velocidadeJogo * 20, 210 + velocidadeJogo * 40);

    // Cria espaço do buraco
    ultimaX += buraco;
    // Adiciona nova plataforma
    plataformas.push({ x: ultimaX, largura: plataforma });
    // Avança o ponteiro para depois da plataforma
    ultimaX += plataforma;
  }

  // Aumenta a velocidade gradualmente, mas com limite
  if (velocidadeJogo < 35){
    if (velocidadeJogo < 20){
      // Aumenta mais rápido
      velocidadeJogo += aumentoVelocidade;
    } else if (velocidadeJogo < 30){
      // Aumenta moderadamente
      velocidadeJogo += aumentoVelocidade / 2;
    } else {
      // Aumenta bem devagar
      velocidadeJogo += aumentoVelocidade / 5;
    }
  }
}

function keyPressed() {
  // Faz o jogador pular quando aperta espaço e estiver no chão
  if (keyCode === 32 && noChao) {
    velY = pulo;
    noChao = false;
  }
}
