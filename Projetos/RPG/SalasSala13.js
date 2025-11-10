// SalasSala13.js
import { validate } from "bycontract";
import { Sala, Engine, Ferramenta } from "./Basicas.js";
import {
  Lanterna,
  ChaveManutencao,
  CartaoAcesso,
  FusivelReserva
} from "./FerramentasSala13.js";
import {
  PainelEnergia,
  ArmarioTrancado,
  QuadroAvisos,
  TerminalServidor,
  PainelSensivel,
  CaixaDeFusiveis,
  DossieConfidencial
} from "./ObjetosSala13.js";

// ================================================================
// 🏠 SALA DE ENTRADA
// ================================================================
export class SalaEntrada extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("Sala_de_Entrada", engine);

    const painel = new PainelEnergia();
    const lanterna = new Lanterna();

    this.objetos.set(painel.nome, painel);
    this.ferramentas.set(lanterna.nome, lanterna);
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    if (!ferramenta || !objeto) {
      console.log("Não é possível realizar essa ação.");
      return false;
    }

    // Usa lanterna no painel de energia -> revela o código
    if (nomeFerramenta === "lanterna" && nomeObjeto === "painel_energia") {
      console.log("A lanterna ilumina o painel e revela um código: 3124.");
      console.log("O código foi adicionado à sua mochila.");
      const codigo = new Ferramenta("codigo");
      this.engine.mochila.guarda(codigo);
      return true;
    }

    return objeto.usar(ferramenta);
  }
}

// ================================================================
// 🛣️ CORREDOR PRINCIPAL
// ================================================================
export class CorredorPrincipal extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("Corredor_Principal", engine);

    const armario = new ArmarioTrancado();
    const chave = new ChaveManutencao();

    this.objetos.set(armario.nome, armario);
    this.ferramentas.set(chave.nome, chave);
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    if (!ferramenta || !objeto) {
      console.log("Não há interação possível.");
      return false;
    }

    return objeto.usar(ferramenta);
  }
}

// ================================================================
// ⚙️ SALA DE MANUTENÇÃO
// ================================================================
export class SalaManutencao extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("Sala_de_Manutencao", engine);

    const caixa = new CaixaDeFusiveis();
    this.objetos.set(caixa.nome, caixa);
    this.energiaRestaurada = false;
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    if (!ferramenta && nomeFerramenta !== "codigo") {
      console.log("Você não tem essa ferramenta.");
      return false;
    }

    if (!objeto) {
      console.log("Esse objeto não está nesta sala.");
      return false;
    }

    // Usa o código para destrancar a caixa
    if (nomeFerramenta === "codigo" && nomeObjeto === "caixa_de_fusiveis") {
      console.log("Você usa o código do painel para destrancar a caixa de fusíveis.");
      console.log("Dentro dela há um fusível reserva.");
      const fusivel = new FusivelReserva();
      this.engine.mochila.guarda(fusivel);
      return true;
    }

    // Instala o fusível reserva e restaura energia
    if (nomeFerramenta === "fusivel_reserva" && nomeObjeto === "caixa_de_fusiveis") {
      console.log("Você instala o fusível reserva e a energia é restaurada!");
      console.log("Agora é possível acessar a Sala dos Professores.");
      this.energiaRestaurada = true;
      return true;
    }

    return objeto.usar(ferramenta);
  }
}

// ================================================================
// 🧑‍🏫 SALA DOS PROFESSORES
// ================================================================
export class SalaProfessores extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("Sala_dos_Professores", engine);

    const quadro = new QuadroAvisos();
    this.objetos.set(quadro.nome, quadro);

    const cartao = new CartaoAcesso();
    this.ferramentas.set(cartao.nome, cartao);
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    // Bloqueia o progresso se a energia ainda não tiver sido restaurada
    if (!this.engine.salaCorrente.engine.salaManutencao?.energiaRestaurada) {
      console.log("As luzes estão apagadas... não consigo encontrar nada útil aqui.");
      return false;
    }

    if (!ferramenta || !objeto) {
      console.log("Não há nada para fazer aqui com isso.");
      return false;
    }

    return objeto.usar(ferramenta);
  }
}

// ================================================================
// 🖥️ SALA DO SERVIDOR
// ================================================================
export class SalaServidor extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("Sala_do_Servidor", engine);

    const terminal = new TerminalServidor();
    const painel = new PainelSensivel();

    this.objetos.set(terminal.nome, terminal);
    this.objetos.set(painel.nome, painel);
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    if (!ferramenta || !objeto) {
      console.log("Não é possível usar isso aqui.");
      return false;
    }

    const usou = objeto.usar(ferramenta);
    if (!usou) return false;

    // Vitória: usa cartão no terminal
    if (objeto instanceof TerminalServidor) {
      console.log("Upload realizado com sucesso! O dossiê foi enviado. Você venceu o jogo!");
      this.engine.indicaFimDeJogo();
    }

    // Derrota: usa cartão no painel sensível
    if (objeto instanceof PainelSensivel) {
      console.log("Sobrecarga! O servidor explodiu e os dados foram perdidos. Você falhou!");
      this.engine.indicaFimDeJogo();
    }

    return usou;
  }
}

// ================================================================
// 📂 SALA DE ARQUIVOS (opcional)
// ================================================================
export class SalaArquivos extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("Sala_de_Arquivos", engine);

    const dossie = new DossieConfidencial();
    this.objetos.set(dossie.nome, dossie);
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    if (!objeto) {
      console.log("Esse objeto não está nesta sala.");
      return false;
    }

    const resultado = objeto.usar(ferramenta);

    if (objeto instanceof DossieConfidencial && resultado) {
      console.log("Você analisou o dossiê. Agora deve enviá-lo no servidor.");
    }

    return resultado;
  }
}
