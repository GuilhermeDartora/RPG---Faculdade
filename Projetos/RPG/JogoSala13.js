// JogoSala13.js
import { Engine } from "./Basicas.js";
import {
  SalaEntrada,
  CorredorPrincipal,
  SalaProfessores,
  SalaServidor,
  SalaManutencao,
  SalaArquivos
} from "./SalasSala13.js";

// Classe principal do jogo: controla a criação do cenário e a progressão
export class JogoSala13 extends Engine {
  constructor() {
    super(); // chama o construtor da Engine (cria mochila e inicializa o jogo)
  }

  // Cria e conecta todas as salas do jogo
  criaCenario() {
    // Instancia todas as salas
    const entrada = new SalaEntrada(this);
    const corredor = new CorredorPrincipal(this);
    const manutencao = new SalaManutencao(this);
    const professores = new SalaProfessores(this);
    const servidor = new SalaServidor(this);
    const arquivos = new SalaArquivos(this);

    // ==============================
    // LIGAÇÕES ENTRE AS SALAS
    // ==============================

    // Sala de Entrada ↔ Corredor Principal
    entrada.portas.set(corredor.nome, corredor);
    corredor.portas.set(entrada.nome, entrada);

    // Corredor Principal ↔ Sala de Manutenção
    corredor.portas.set(manutencao.nome, manutencao);
    manutencao.portas.set(corredor.nome, corredor);

    // Sala de Manutenção ↔ Sala dos Professores
    manutencao.portas.set(professores.nome, professores);
    professores.portas.set(manutencao.nome, manutencao);

    // Sala dos Professores ↔ Sala do Servidor
    professores.portas.set(servidor.nome, servidor);
    servidor.portas.set(professores.nome, professores);

    // Sala de Arquivos ↔ Sala do Servidor (rota opcional)
    arquivos.portas.set(servidor.nome, servidor);
    servidor.portas.set(arquivos.nome, arquivos);

    // Sala de Manutenção ↔ Sala de Arquivos (rota alternativa)
    manutencao.portas.set(arquivos.nome, arquivos);
    arquivos.portas.set(manutencao.nome, manutencao);

    // ==============================
    // SALA INICIAL DO JOGADOR
    // ==============================
    this.salaCorrente = entrada;

    // ==============================
    // MENSAGEM INICIAL DO JOGO
    // ==============================
    console.log(`
================================================================================
🧩  SEGREDOS DA SALA 13 — RPG DE MISTÉRIO  🧩
================================================================================
Você é o novo zelador do IFRS e precisa desvendar o desaparecimento do professor
antes que os dados do dossiê sejam apagados.

Seu objetivo:
  → Descobrir o Dossiê Confidencial e realizar o upload no terminal do servidor.

Progresso:
  1. Explore as salas e colete ferramentas.
  2. Use os objetos certos para liberar novas áreas.
  3. Instale o fusível na Sala de Manutenção para restaurar a energia.
  4. Encontre o cartão de acesso na Sala dos Professores.
  5. Use o cartão no terminal do servidor para vencer o jogo.

Comandos disponíveis:
  - pega <ferramenta>       → coleta um item da sala
  - usa <ferramenta> <obj>  → usa uma ferramenta em um objeto
  - sai <sala>              → vai para outra sala
  - inventario              → mostra os itens da mochila
  - fim                     → encerra o jogo

Boa sorte, zelador! A verdade está escondida na Sala 13...
================================================================================
`);
  }
}
