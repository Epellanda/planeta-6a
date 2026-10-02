/* ============================================================
   PLANETA V OU F — Geografia 6º ano
   Lógica do jogo: verdadeiro ou falso com tempo
   ============================================================ */

// ---------- BANCO DE PERGUNTAS (Geografia 6º ano) ----------
const BANCO_DE_PERGUNTAS = [
  {
    afirmacao: "O Brasil está localizado no continente americano.",
    resposta: true,
    explicacao: "Isso mesmo! O Brasil fica na América do Sul, que faz parte do continente americano."
  },
  {
    afirmacao: "A linha do Equador atravessa o território brasileiro.",
    resposta: true,
    explicacao: "Correto! A linha do Equador passa pelo norte do Brasil, nos estados do Amazonas, Pará, Amapá e Roraima."
  },
  {
    afirmacao: "O relevo brasileiro é formado apenas por montanhas muito altas, como os Andes.",
    resposta: false,
    explicacao: "Falso! O relevo brasileiro é formado principalmente por planaltos, planícies e depressões. As grandes montanhas ficam nos Andes, na América do Sul."
  },
  {
    afirmacao: "A Amazônia é o maior bioma brasileiro e possui a maior floresta tropical do mundo.",
    resposta: true,
    explicacao: "Verdade! A Floresta Amazônica é a maior floresta tropical do planeta e ocupa grande parte do Norte do Brasil."
  },
  {
    afirmacao: "O Rio Amazonas é o rio mais extenso e volumoso do mundo.",
    resposta: true,
    explicacao: "Isso! O Rio Amazonas é considerado o rio mais caudaloso do mundo e um dos mais extensos."
  },
  {
    afirmacao: "O Pantanal é um bioma brasileiro conhecido por suas áreas alagadas e grande biodiversidade.",
    resposta: true,
    explicacao: "Exato! O Pantanal é a maior planície alagável do planeta e fica nos estados de Mato Grosso e Mato Grosso do Sul."
  },
  {
    afirmacao: "A Caatinga é um bioma típico da região Sul do Brasil.",
    resposta: false,
    explicacao: "Falso! A Caatinga é exclusiva do Nordeste brasileiro, com clima semiárido e vegetação adaptada à seca."
  },
  {
    afirmacao: "O Cerrado é o segundo maior bioma do Brasil e é conhecido como 'berço das águas'.",
    resposta: true,
    explicacao: "Muito bem! O Cerrado abriga nascentes de grandes rios brasileiros, por isso é chamado de 'berço das águas'."
  },
  {
    afirmacao: "A Mata Atlântica é o bioma mais preservado do Brasil, ocupando mais de 80% do território original.",
    resposta: false,
    explicacao: "Falso! A Mata Atlântica é um dos biomas mais devastados do Brasil. Restam menos de 15% da vegetação original."
  },
  {
    afirmacao: "O clima equatorial é quente e úmido, com chuvas durante quase todo o ano.",
    resposta: true,
    explicacao: "Isso! O clima equatorial ocorre na região Amazônica, com altas temperaturas e muita chuva."
  },
  {
    afirmacao: "O clima semiárido é típico da região Nordeste e possui longos períodos de seca.",
    resposta: true,
    explicacao: "Correto! O semiárido nordestino tem chuvas escassas e irregulares, com longas estiagens."
  },
  {
    afirmacao: "A região Sudeste é a que possui o maior número de estados do Brasil.",
    resposta: false,
    explicacao: "Falso! A região Nordeste é a que possui o maior número de estados: são 9. O Sudeste tem 4 estados."
  },
  {
    afirmacao: "São Paulo é a capital do Brasil.",
    resposta: false,
    explicacao: "Falso! A capital do Brasil é Brasília, no Distrito Federal, desde 1960."
  },
  {
    afirmacao: "O Brasil possui 5 regiões oficiais: Norte, Nordeste, Centro-Oeste, Sudeste e Sul.",
    resposta: true,
    explicacao: "Isso mesmo! Essa é a divisão regional oficial do IBGE."
  },
  {
    afirmacao: "A maior parte do território brasileiro está no hemisfério sul.",
    resposta: true,
    explicacao: "Verdade! Quase todo o Brasil está ao sul da linha do Equador, no hemisfério sul."
  },
  {
    afirmacao: "Os rios brasileiros são todos temporários, ou seja, secam em alguma época do ano.",
    resposta: false,
    explicacao: "Falso! A maioria dos rios brasileiros é perene, ou seja, corre o ano todo. Alguns, como os do sertão, são temporários."
  },
  {
    afirmacao: "O ponto mais alto do Brasil é o Pico da Neblina, localizado no Amazonas.",
    resposta: true,
    explicacao: "Muito bem! O Pico da Neblina tem cerca de 2.995 metros e fica no estado do Amazonas."
  },
  {
    afirmacao: "As planícies são formas de relevo mais elevadas que os planaltos.",
    resposta: false,
    explicacao: "Falso! As planícies são áreas mais baixas e planas. Os planaltos são mais elevados."
  },
  {
    afirmacao: "O litoral brasileiro é banhado apenas pelo Oceano Pacífico.",
    resposta: false,
    explicacao: "Falso! O Brasil é banhado pelo Oceano Atlântico, a leste do território."
  },
  {
    afirmacao: "O Trópico de Capricórnio passa pelo estado de São Paulo.",
    resposta: true,
    explicacao: "Verdade! O Trópico de Capricórnio atravessa o estado de São Paulo, próximo à cidade de São Paulo."
  },
  {
    afirmacao: "A região Norte é a maior região brasileira em extensão territorial.",
    resposta: true,
    explicacao: "Correto! A região Norte ocupa cerca de 45% do território brasileiro."
  },
  {
    afirmacao: "A região Sul do Brasil é formada por quatro estados: Paraná, Santa Catarina, Rio Grande do Sul e São Paulo.",
    resposta: false,
    explicacao: "Falso! A região Sul tem apenas três estados: Paraná, Santa Catarina e Rio Grande do Sul. São Paulo fica no Sudeste."
  }
];

// ---------- CONSTANTES DE JOGO ----------
const TEMPO_MAX = 15;            // segundos por pergunta
const PONTOS_BASE = 100;         // pontos base por acerto
const BONUS_TEMPO = 10;          // pontos extras por segundo restante
const TOTAL_VIDAS = 3;
const TOTAL_PERGUNTAS = 12;      // quantas perguntas por partida
const PAUSA_FEEDBACK = 1800;     // ms que o feedback fica visível

// ---------- ESTADO DO JOGO ----------
let perguntasPartida = [];
let indiceAtual = 0;
let pontos = 0;
let vidas = TOTAL_VIDAS;
let acertos = 0;
let erros = 0;
let tempoRestante = TEMPO_MAX;
let intervalo = null;
let feedbackTimeout = null;
let respostaTravada = false;
let jogoAtivo = false;

// ---------- REFERÊNCIAS DO DOM ----------
const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const telaFim = document.getElementById('tela-fim');

const botaoIniciar = document.getElementById('botao-iniciar');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const botaoV = document.getElementById('botao-verdadeiro');
const botaoF = document.getElementById('botao-falso');

const elPontos = document.getElementById('pontos');
const elVidas = document.getElementById('vidas');
const elContador = document.getElementById('contador');
const elAfirmacao = document.getElementById('afirmacao');
const elTempoPreenchimento = document.getElementById('tempo-preenchimento');
const elTempoTexto = document.getElementById('tempo-texto');

const elPontosFinais = document.getElementById('pontos-finais');
const elMedalha = document.getElementById('medalha');
const elTituloFinal = document.getElementById('titulo-final');
const elResumoFinal = document.getElementById('resumo-final');

const feedback = document.getElementById('feedback');
const feedbackCaixa = document.getElementById('feedback-caixa');
const feedbackIcone = document.getElementById('feedback-icone');
const feedbackTitulo = document.getElementById('feedback-titulo');
const feedbackExplicacao = document.getElementById('feedback-explicacao');

// ---------- FUNÇÕES AUXILIARES ----------

/** Embaralha um array (Fisher–Yates) */
function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** Mostra uma tela específica */
function mostrarTela(tela) {
  [telaInicio, telaJogo, telaFim].forEach(t => t.classList.remove('ativa'));
  tela.classList.add('ativa');
}

/** Atualiza a barra de vidas (❤️) */
function atualizarVidas() {
  const cheias = '❤️'.repeat(vidas);
  const vazias = '🤍'.repeat(TOTAL_VIDAS - vidas);
  elVidas.textContent = cheias + vazias;
}

/** Atualiza o placar */
function atualizarPlacar() {
  elPontos.textContent = pontos;
  elContador.textContent = `${indiceAtual + 1}/${TOTAL_PERGUNTAS}`;
  atualizarVidas();
}

/** Atualiza a barra de tempo visual e o número */
function atualizarTempo() {
  const pct = (tempoRestante / TEMPO_MAX) * 100;
  elTempoPreenchimento.style.width = pct + '%';
  elTempoTexto.textContent = Math.ceil(tempoRestante) + 's';

  elTempoPreenchimento.classList.remove('alerta', 'perigo');
  if (tempoRestante <= 5) {
    elTempoPreenchimento.classList.add('perigo');
  } else if (tempoRestante <= 10) {
    elTempoPreenchimento.classList.add('alerta');
  }
}

/** Mostra o overlay de feedback */
function mostrarFeedback(tipo, titulo, explicacao) {
  clearTimeout(feedbackTimeout);

  feedbackCaixa.classList.remove('erro', 'tempo');
  if (tipo === 'erro') feedbackCaixa.classList.add('erro');
  if (tipo === 'tempo') feedbackCaixa.classList.add('tempo');

  if (tipo === 'acerto') {
    feedbackIcone.textContent = '✅';
  } else if (tipo === 'erro') {
    feedbackIcone.textContent = '❌';
  } else {
    feedbackIcone.textContent = '⏰';
  }

  feedbackTitulo.textContent = titulo;
  feedbackExplicacao.textContent = explicacao;
  feedback.classList.remove('oculto');

  feedbackTimeout = setTimeout(() => {
    feedback.classList.add('oculto');
  }, PAUSA_FEEDBACK);
}

/** Para o timer atual */
function pararTimer() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }
}

/** Inicia o timer da pergunta atual */
function iniciarTimer() {
  pararTimer();
  tempoRestante = TEMPO_MAX;
  atualizarTempo();

  intervalo = setInterval(() => {
    tempoRestante -= 0.1;
    if (tempoRestante <= 0) {
      tempoRestante = 0;
      atualizarTempo();
      pararTimer();
      responder(null); // tempo esgotado
    } else {
      atualizarTempo();
    }
  }, 100);
}

// ---------- FLUXO DO JOGO ----------

/** Inicia uma nova partida */
function iniciarJogo() {
  // Sorteia 12 perguntas aleatórias
  perguntasPartida = embaralhar(BANCO_DE_PERGUNTAS).slice(0, TOTAL_PERGUNTAS);

  indiceAtual = 0;
  pontos = 0;
  vidas = TOTAL_VIDAS;
  acertos = 0;
  erros = 0;
  jogoAtivo = true;
  respostaTravada = false;

  feedback.classList.add('oculto');
  mostrarTela(telaJogo);
  carregarPergunta();
}

/** Carrega a pergunta atual na tela */
function carregarPergunta() {
  if (indiceAtual >= TOTAL_PERGUNTAS) {
    finalizarJogo();
    return;
  }

  const pergunta = perguntasPartida[indiceAtual];
  elAfirmacao.textContent = pergunta.afirmacao;

  respostaTravada = false;
  botaoV.disabled = false;
  botaoF.disabled = false;

  atualizarPlacar();
  iniciarTimer();
}

/** Processa a resposta do jogador (true, false ou null para tempo esgotado) */
function responder(respostaJogador) {
  if (!jogoAtivo || respostaTravada) return;

  respostaTravada = true;
  pararTimer();
  botaoV.disabled = true;
  botaoF.disabled = true;

  const pergunta = perguntasPartida[indiceAtual];
  const tempoNoMomento = Math.max(0, Math.ceil(tempoRestante));

  // --- TEMPO ESGOTADO ---
  if (respostaJogador === null) {
    vidas--;
    erros++;
    atualizarPlacar();
    mostrarFeedback('tempo', '⏰ Tempo esgotado!', `A afirmação era ${pergunta.resposta ? 'VERDADEIRA' : 'FALSA'}. ${pergunta.explicacao}`);
    avancarOuFinalizar();
    return;
  }

  // --- RESPOSTA CORRETA ---
  if (respostaJogador === pergunta.resposta) {
    acertos++;
    const bonus = Math.round(tempoNoMomento * BONUS_TEMPO);
    const ganho = PONTOS_BASE + bonus;
    pontos += ganho;
    atualizarPlacar();
    mostrarFeedback('acerto', `✅ Acertou! +${ganho} pontos`, pergunta.explicacao);
  }
  // --- RESPOSTA ERRADA ---
  else {
    vidas--;
    erros++;
    atualizarPlacar();
    mostrarFeedback(
      'erro',
      '❌ Errou!',
      `A afirmação era ${pergunta.resposta ? 'VERDADEIRA' : 'FALSA'}. ${pergunta.explicacao}`
    );
  }

  avancarOuFinalizar();
}

/** Avança para a próxima pergunta ou finaliza se acabaram as vidas */
function avancarOuFinalizar() {
  if (vidas <= 0) {
    setTimeout(() => {
      finalizarJogo();
    }, PAUSA_FEEDBACK);
    return;
  }

  indiceAtual++;
  setTimeout(() => {
    carregarPergunta();
  }, PAUSA_FEEDBACK);
}

/** Finaliza o jogo e mostra a tela final */
function finalizarJogo() {
  jogoAtivo = false;
  pararTimer();
  feedback.classList.add('oculto');

  elPontosFinais.textContent = pontos;

  // Define medalha e título conforme desempenho
  const totalRespondidas = acertos + erros;
  const pct = totalRespondidas > 0 ? (acertos / totalRespondidas) * 100 : 0;

  let medalha, titulo;
  if (vidas > 0 && acertos === TOTAL_PERGUNTAS) {
    medalha = '🥇';
    titulo = 'Lenda da Geografia!';
  } else if (pct >= 80) {
    medalha = '🏆';
    titulo = 'Mestre do Planeta!';
  } else if (pct >= 60) {
    medalha = '🥈';
    titulo = 'Bom explorador!';
  } else if (pct >= 40) {
    medalha = '🥉';
    titulo = 'Continue estudando!';
  } else {
    medalha = '🧭';
    titulo = 'Aprendiz de geógrafo';
  }

  elMedalha.textContent = medalha;
  elTituloFinal.textContent = titulo;

  const motivoFim = vidas <= 0
    ? 'Você ficou sem vidas.'
    : 'Você completou todos os desafios!';

  elResumoFinal.innerHTML =
    `${motivoFim}<br>` +
    `Acertos: <strong>${acertos}</strong> • Erros: <strong>${erros}</strong>`;

  mostrarTela(telaFim);
}

// ---------- EVENTOS ----------

botaoIniciar.addEventListener('click', iniciarJogo);
botaoReiniciar.addEventListener('click', iniciarJogo);

botaoV.addEventListener('click', () => responder(true));
botaoF.addEventListener('click', () => responder(false));

// Atalhos de teclado: V = Verdadeiro, F = Falso
document.addEventListener('keydown', (e) => {
  if (!jogoAtivo || respostaTravada) return;
  const tecla = e.key.toLowerCase();
  if (tecla === 'v') {
    responder(true);
  } else if (tecla === 'f') {
    responder(false);
  }
});

// Garante que o jogo comece na tela inicial
mostrarTela(telaInicio);