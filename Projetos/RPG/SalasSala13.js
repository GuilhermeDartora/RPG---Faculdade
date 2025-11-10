// SalasSala13.js
import { validate } from "bycontract";
import { Sala, Engine, Ferramenta, Objeto } from "./Basicas.js";
import { Lanterna, ChaveManutencao, CartaoAcesso, FusivelReserva } from "./FerramentasSala13.js";
import {
    PainelEnergia,
    ArmarioTrancado,
    QuadroAvisos,
    TerminalServidor,
    PainelSensivel,
    CaixaDeFusiveis,
    DossieConfidencial
} from "./ObjetosSala13.js";

// ---------------------------------------------
export class SalaEntrada extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("Sala_de_Entrada", engine);

        let painel = new PainelEnergia();
        this.objetos.set(painel.nome, painel);

        let lanterna = new Lanterna();
        this.ferramentas.set(lanterna.nome, lanterna);
    }

    usa(ferramenta, objeto) {
        validate(arguments, ["String", "String"]);
        if (!this.engine.mochila.tem(ferramenta)) {
            console.log("Você não tem essa ferramenta.");
            return false;
        }
        if (!this.objetos.has(objeto)) {
            console.log("Esse objeto não está nesta sala.");
            return false;
        }
        let obj = this.objetos.get(objeto);
        return obj.usar(this.engine.mochila.pega(ferramenta));
    }
}
// ---------------------------------------------
export class CorredorPrincipal extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("Corredor_Principal", engine);

        let armario = new ArmarioTrancado();
        this.objetos.set(armario.nome, armario);

        let chave = new ChaveManutencao();
        this.ferramentas.set(chave.nome, chave);
    }

    usa(ferramenta, objeto) {
        validate(arguments, ["String", "String"]);
        if (!this.engine.mochila.tem(ferramenta)) {
            console.log("Você não tem essa ferramenta.");
            return false;
        }
        if (!this.objetos.has(objeto)) {
            console.log("Esse objeto não está nesta sala.");
            return false;
        }
        let obj = this.objetos.get(objeto);
        let usou = obj.usar(this.engine.mochila.pega(ferramenta));
        return usou;
    }
}
// ---------------------------------------------
export class SalaProfessores extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("Sala_dos_Professores", engine);

        let quadro = new QuadroAvisos();
        this.objetos.set(quadro.nome, quadro);

        let cartao = new CartaoAcesso();
        this.ferramentas.set(cartao.nome, cartao);
    }

    usa(ferramenta, objeto) {
        validate(arguments, ["String", "String"]);
        // Na Fase 1, nenhum uso especial
        return false;
    }
}
// ---------------------------------------------
export class SalaServidor extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("Sala_do_Servidor", engine);

        let terminal = new TerminalServidor();
        this.objetos.set(terminal.nome, terminal);

        let painel = new PainelSensivel();
        this.objetos.set(painel.nome, painel);
    }

    usa(ferramenta, objeto) {
        validate(arguments, ["String", "String"]);
        if (!this.engine.mochila.tem(ferramenta)) {
            console.log("Você não tem essa ferramenta.");
            return false;
        }
        if (!this.objetos.has(objeto)) {
            console.log("Esse objeto não está nesta sala.");
            return false;
        }
        let obj = this.objetos.get(objeto);
        let usou = obj.usar(this.engine.mochila.pega(ferramenta));
        if (!usou) return false;

        // Vitória: cartão usado no terminal
        if (obj instanceof TerminalServidor) {
            console.log("Upload realizado. Você salvou o dossiê e venceu o jogo!");
            this.engine.indicaFimDeJogo();
        }

        // Derrota: cartão usado no painel sensível
        if (obj instanceof PainelSensivel) {
            console.log("Sobrecarga! O sistema foi destruído. Você perdeu o jogo.");
            this.engine.indicaFimDeJogo();
        }

        return usou;
    }
}
// ---------------------------------------------
export class SalaManutencao extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("Sala_de_Manutencao", engine);

        let caixa = new CaixaDeFusiveis();
        this.objetos.set(caixa.nome, caixa);
    }

    usa(ferramenta, objeto) {
        validate(arguments, ["String", "String"]);
        if (!this.engine.mochila.tem(ferramenta)) {
            console.log("Você não tem essa ferramenta.");
            return false;
        }
        if (!this.objetos.has(objeto)) {
            console.log("Esse objeto não está nesta sala.");
            return false;
        }
        let obj = this.objetos.get(objeto);
        let usou = obj.usar(this.engine.mochila.pega(ferramenta));
        if (!usou) return false;

        if (obj instanceof CaixaDeFusiveis && obj.acaoOk) {
            let fusivel = new FusivelReserva();
            this.ferramentas.set(fusivel.nome, fusivel);
            console.log("Você encontrou um fusível reserva dentro da caixa.");
        }

        return usou;
    }
}
// ---------------------------------------------
export class SalaArquivos extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("Sala_de_Arquivos", engine);

        let dossie = new DossieConfidencial();
        this.objetos.set(dossie.nome, dossie);
    }

    usa(ferramenta, objeto) {
        validate(arguments, ["String", "String"]);
        // Pode, por exemplo, usar a lanterna no dossiê, mas na Fase 1 vamos simplificar
        if (!this.objetos.has(objeto)) {
            console.log("Esse objeto não está nesta sala.");
            return false;
        }
        let obj = this.objetos.get(objeto);
        let resultado = obj.usar(this.engine.mochila.pega(ferramenta));
        if (obj instanceof DossieConfidencial && resultado) {
            console.log("Você analisou o dossiê. Agora precisa enviá-lo pelo servidor.");
        }
        return resultado;
    }
}
// ---------------------------------------------
