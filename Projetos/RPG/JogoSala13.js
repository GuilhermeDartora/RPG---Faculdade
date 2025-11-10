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

// A classe principal do jogo, herda de Engine
export class JogoSala13 extends Engine {
  constructor() {
    super(); // chama o construtor da Engine (cria mochila e configurações iniciais)
  }

  // Monta todo o cenário e liga as salas
  criaCenario() {
    // Criação das salas
    const entrada = new SalaEntrada(this);
    const corredor = new CorredorPrincipal(this);
    const professores = new SalaProfessores(this);
    const servidor = new SalaServidor(this);
    const manutencao = new SalaManutencao(this);
    const arquivos = new SalaArquivos(this);

    // Conexões entre salas (portas)
    // Sala de Entrada ↔ Corredor Principal
    entrada.portas.set(corredor.nome, corredor);
    corredor.portas.set(entrada.nome, entrada);

    // Corredor Principal ↔ outras salas
    corredor.portas.set(professores.nome, professores);
    professores.portas.set(corredor.nome, corredor);

    corredor.portas.set(manutencao.nome, manutencao);
    manutencao.portas.set(corredor.nome, corredor);

    // Sala de Manutenção ↔ Sala de Arquivos
    manutencao.portas.set(arquivos.nome, arquivos);
    arquivos.portas.set(manutencao.nome, manutencao);

    // Sala dos Professores ↔ Sala do Servidor
    professores.portas.set(servidor.nome, servidor);
    servidor.portas.set(professores.nome, professores);

    // Sala de Arquivos ↔ Sala do Servidor
    arquivos.portas.set(servidor.nome, servidor);
    servidor.portas.set(arquivos.nome, arquivos);

    // Define a sala inicial do jogador
    this.salaCorrente = entrada;

    // Mensagem inicial do jogo
    console.log(`
================================================================================
🧩  SEGREDOS DA SALA 13 — RPG DE MISTÉRIO  🧩
================================================================================
Você é o novo zelador do IFRS e precisa desvendar o desaparecimento do professor
antes que os dados do dossiê sejam apagados.

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
