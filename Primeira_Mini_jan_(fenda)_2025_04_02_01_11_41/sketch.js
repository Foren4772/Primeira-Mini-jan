// Posição do jogador
let velocidade = 50;
let pular = 450;

// Gravidade e pulo
let velY = 0;
let gravidade = 1.1;
let pulo = -12;
let noChao = false;

// Lista de plataformas e controle de velocidade
let plataformas = [];
let velocidadeJogo = 3;
let aumentoVelocidade = 0.001;

// Pontuação do jogador
let pontos = 0;

function setup() {
  createCanvas(700, 500);

  // Começa com uma plataforma que ocupa toda a base da tela
  plataformas.push({ x: 0, largura: width });
}

function draw() {
  // Desenha o céu, sol, nuvens e montanhas
  drawBackground();
  desenharMontanhas();
  desenharNuvens();
  desenharSol();

  // Aplica a gravidade no personagem
  velY += gravidade;
  pular += velY;

  // Desenha o chão (faixa marrom)
  fill("brown");
  rect(0, 480, 700, 30);

  // Desenha e move as plataformas verdes
  fill("#8AC149");
  for (let i = plataformas.length - 1; i >= 0; i--) {
    let plat = plataformas[i];
    plat.x -= velocidadeJogo; // move pra esquerda

    // desenha plataforma
    rect(plat.x, 480, plat.largura, 20);

    // remove se saiu da tela
    if (plat.x + plat.largura < 0) {
      plataformas.splice(i, 1);
    }
  }

  // Verifica se o jogador está em cima de uma plataforma
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

  // Se estiver em cima, zera a gravidade e mantém no chão
  if (sobrePlataforma) {
    pular = 450;
    velY = 0;
    noChao = true;
  } 
  // Se cair demais, o jogo para
  else if (pular > height) {
    console.log("Game Over! Você caiu.");
    noLoop(); // pausa o draw
  } 
  // Caso esteja no ar
  else {
    noChao = false;
  }

  // Desenha o jogador
  desenharJogador(velocidade, pular);

  // Descobre onde termina a última plataforma
  let ultimaX = plataformas.length > 0
    ? plataformas[plataformas.length - 1].x + plataformas[plataformas.length - 1].largura
    : 0;

  // Cria novas plataformas e buracos até preencher o lado direito da tela
  while (ultimaX < width + 200) {
    let buraco = random(20 + velocidadeJogo * 7, 50 + velocidadeJogo * 10);
    let plataforma = random(110 + velocidadeJogo * 20, 210 + velocidadeJogo * 40);
    ultimaX += buraco;
    plataformas.push({ x: ultimaX, largura: plataforma });
    ultimaX += plataforma;
  }

  // Aumenta a velocidade do jogo aos poucos
  if (velocidadeJogo < 35) {
    if (velocidadeJogo < 20) {
      velocidadeJogo += aumentoVelocidade;
    } else if (velocidadeJogo < 30) {
      velocidadeJogo += aumentoVelocidade / 2;
    } else {
      velocidadeJogo += aumentoVelocidade / 5;
    }
  }

  // Mostra pontuação na tela
  pontos += 1;
  fill(255);
  textSize(20);
  text("Pontuação: " + pontos, 10, 30);
}

function keyPressed() {
  // Faz o personagem pular ao apertar espaço, se estiver no chão
  if (keyCode === 32 && noChao) {
    velY = pulo;
    noChao = false;
  }
}

// ----- VISUAIS -----

function drawBackground() {
  // Faz um degradê de azul no céu
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(0, 126, 255), color(135, 206, 250), y / height);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
}

function desenharMontanhas() {
  // Montanha da esquerda
  fill(80, 130, 100);
  triangle(100, 480, 300, 200, 500, 480);

  // Neve da montanha da esquerda
  fill(255);
  triangle(272, 240, 300, 200, 330, 240);

  // Montanha da direita
  fill(100, 150, 120);
  triangle(400, 480, 600, 250, 800, 480);

  // Neve da montanha da direita
  fill(255);
  triangle(566, 290, 600, 250, 636, 290);
}

function desenharNuvens() {
  // Nuvem 1
  fill(255, 255, 255, 180);
  noStroke();
  ellipse(150, 100, 80, 50);
  ellipse(180, 100, 80, 50);
  ellipse(165, 80, 70, 50);

  // Nuvem 2
  ellipse(500, 70, 100, 60);
  ellipse(540, 70, 90, 50);
  ellipse(520, 50, 80, 40);
}

function desenharSol() {
  // Sol amarelo no canto superior direito
  fill("yellow");
  noStroke();
  ellipse(680, 30, 80, 80);
}

function desenharJogador(x, y) {
  // Jogador azul com bordas arredondadas
  fill("blue");
  rect(x, y, 30, 30, 5);

  // Um "olhinho" branco só de detalhe
  fill("white");
  ellipse(x + 22, y + 10, 5, 5);
}
