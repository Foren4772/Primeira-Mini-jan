// Posição horizontal do jogador e posição vertical inicial para o pulo
let velocidade = 50;
let pular = 450;

// Variáveis de física: velocidade vertical, gravidade, força do pulo e verificação se está no chão
let velY = 0;
let gravidade = 1.1;
let pulo = -12;
let noChao = false;

// Array para armazenar as plataformas, velocidade do jogo e quanto ela vai aumentando com o tempo
let plataformas = [];
let velocidadeJogo = 3;
let aumentoVelocidade = 0.001;

// Pontuação atual e recorde
let pontos = 0;
let maiorPontuacao = 0;

// Estado do jogo: se está rolando ou acabou
let jogoAtivo = true;

function setup() {
  createCanvas(700, 500)
  plataformas.push({ x: 0, largura: width }); // Adiciona a primeira plataforma inicial ocupando toda a largura
}

function draw() {
  // Se o jogo acabou, mostra a tela de Game Over e não executa o resto do jogo
  if (!jogoAtivo) {
    background("#2E2E2E");
    fill("rgb(255,255,255)");
    textSize(25);
    text("Game Over", 280, 250);
    textSize(18);
    text("Pressione espaço para reiniciar", 230, 280);
    
    // Atualiza a maior pontuação se a pontuação atual for maior
    if (maiorPontuacao < pontos){
      maiorPontuacao = pontos;
    }

    return;
  }

  // Desenha o fundo e elementos visuais
  drawBackground();
  desenharMontanhas();
  desenharNuvens();
  desenharSol();

  // Aplica a gravidade ao jogador
  velY += gravidade;
  pular += velY;

  // Desenha a terra
  fill("brown");
  rect(0, 480, 700, 30);

  // Atualiza e desenha todas as plataformas
  fill("#8AC149");
  for (let i = plataformas.length - 1; i >= 0; i--) {
    let plat = plataformas[i];
    plat.x -= velocidadeJogo; // Move a plataforma para esquerda
    rect(plat.x, 480, plat.largura, 20); // Desenha a plataforma
    if (plat.x + plat.largura < 0) {
      plataformas.splice(i, 1); // Remove a plataforma que saiu da tela
    }
  }

  // Verifica se o jogador está em cima da plataforma
  let sobrePlataforma = false;
  for (let plat of plataformas) {
    if (
      velocidade + 30 > plat.x &&
      velocidade < plat.x + plat.largura &&
      pular + 30 >= 480 &&
      pular + 30 <= 490
    ) {
      sobrePlataforma = true;
      break;
    }
  }

  // Se estiver sobre uma plataforma, reseta a posição de pulo e a velocidade vertical
  if (sobrePlataforma) {
    pular = 450;
    velY = 0;
    noChao = true;
  } else if (pular > height) {
    // Se caiu fora da tela, termina o jogo
    console.log("E morreu");
    jogoAtivo = false;
  } else {
    noChao = false;
  }

  // Desenha o jogador
  desenharJogador(velocidade, pular);

  // Gera novas plataformas conforme o boneco avança
  let ultimaX = plataformas.length > 0
    ? plataformas[plataformas.length - 1].x + plataformas[plataformas.length - 1].largura
    : 0;

  while (ultimaX < width + 200) {
    let buraco = random(20 + velocidadeJogo * 7, 50 + velocidadeJogo * 10); // Espaço entre plataformas
    let plataforma = random(110 + velocidadeJogo * 20, 210 + velocidadeJogo * 40); // Largura da nova plataforma
    ultimaX += buraco;
    plataformas.push({ x: ultimaX, largura: plataforma });
    ultimaX += plataforma;
  }

  // controla a velocidade do jogo
  if (velocidadeJogo < 35) {
    if (velocidadeJogo < 20) {
      velocidadeJogo += aumentoVelocidade;
    } else if (velocidadeJogo < 30) {
      velocidadeJogo += aumentoVelocidade / 2;
    } else {
      velocidadeJogo += aumentoVelocidade / 5;
    }
  }

  // Atualiza e exibe a pontuação
  pontos += 1;
  fill(255);
  textSize(20);
  text("Pontuação: " + pontos, 10, 30);
  text("Maior Pontuação: " + maiorPontuacao, 10, 50);
}

function keyPressed() {
  // Faz o jogador pular se estiver no chão e o jogo estiver ativo
  if (keyCode === 32 && noChao && jogoAtivo) {
    velY = pulo;
    noChao = false;
  }

  if (!jogoAtivo && (keyCode === 32 || keyCode === 32)) {
    reiniciarJogo();
  }
}

// função que reinicia o jogo
function reiniciarJogo() {
  plataformas = [{ x: 0, largura: width }];
  pular = 450;
  velY = 0;
  velocidadeJogo = 3;
  pontos = 0;
  jogoAtivo = true;
}

// ----- ELEMENTOS VISUAIS -----

// Céu
function drawBackground() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(0, 126, 255), color(135, 206, 250), y / height);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
}

// Montanhas
function desenharMontanhas() {
  fill(80, 130, 100);
  triangle(100, 480, 300, 200, 500, 480);
  fill(255);
  triangle(272, 240, 300, 200, 330, 240);
  fill(100, 150, 120);
  triangle(400, 480, 600, 250, 800, 480);
  fill(255);
  triangle(566, 290, 600, 250, 636, 290);
}

// Nuvens
function desenharNuvens() {
  fill("white");
  noStroke();
  ellipse(150, 100, 80, 50);
  ellipse(180, 100, 80, 50);
  ellipse(165, 80, 70, 50);
  ellipse(500, 70, 100, 60);
  ellipse(540, 70, 90, 50);
  ellipse(520, 50, 80, 40);
}

// Sol amarelo no canto
function desenharSol() {
  fill("yellow");
  noStroke();
  ellipse(680, 30, 80, 80);
}

// O bonequinho azul do jogador
function desenharJogador(x, y) {
  fill("blue");
  rect(x, y, 30, 30, 5); // Corpo
  fill("white");
  ellipse(x + 22, y + 10, 5, 5); // Olhinho
}
