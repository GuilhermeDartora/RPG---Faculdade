// ObjetosSala13.js
import { validate } from "bycontract";
import { Objeto, Ferramenta } from "./Basicas.js";
import { Lanterna, ChaveManutencao, CartaoAcesso, FusivelReserva } from "./FerramentasSala13.js";

// ---------------------------------------------
export class PainelEnergia extends Objeto {
    constructor() {
        super(
            "painel_energia",
            "Um painel de energia apagado, cheio de poeira.",
            "O painel agora exibe um código: 'A CHAVE ESTÁ NO CORREDOR'."
        );
    }

    usar(ferramenta) {
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof Lanterna) {
            if (!ferramenta.usar()) return false;
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}
// ---------------------------------------------
export class ArmarioTrancado extends Objeto {
    constructor() {
        super(
            "armario_trancado",
            "Um armário de metal trancado. Parece importante.",
            "O armário está aberto. Dentro havia um bilhete com pistas sobre a Sala dos Professores."
        );
    }

    usar(ferramenta) {
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof ChaveManutencao) {
            if (!ferramenta.usar()) return false;
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}
// ---------------------------------------------
export class QuadroAvisos extends Objeto {
    constructor() {
        super(
            "quadro_avisos",
            "Um quadro de avisos cheio de papéis antigos.",
            "Atrás de alguns papéis amassados, há um espaço onde o cartão de acesso foi encontrado."
        );
    }

    usar(ferramenta) {
        validate(ferramenta, Ferramenta);
        // Não reage a nenhuma ferramenta na Fase 1
        return false;
    }
}
// ---------------------------------------------
export class TerminalServidor extends Objeto {
    constructor() {
        super(
            "terminal_servidor",
            "Um terminal de dados aguardando autenticação.",
            "O terminal indica: 'Upload do dossiê concluído com sucesso.'"
        );
    }

    usar(ferramenta) {
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof CartaoAcesso) {
            if (!ferramenta.usar()) return false;
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}
// ---------------------------------------------
export class PainelSensivel extends Objeto {
    constructor() {
        super(
            "painel_sensivel",
            "Um painel de força com avisos de alta voltagem.",
            "O painel entrou em curto! As luzes piscam e o sistema parece instável."
        );
    }

    usar(ferramenta) {
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof CartaoAcesso) {
            if (!ferramenta.usar()) return false;
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}
// ---------------------------------------------
export class CaixaDeFusiveis extends Objeto {
    constructor() {
        super(
            "caixa_de_fusiveis",
            "Uma caixa metálica de fusíveis, fechada.",
            "A caixa está aberta. Um fusível reserva foi encontrado."
        );
    }

    usar(ferramenta) {
        validate(ferramenta, Ferramenta);
        if (ferramenta instanceof ChaveManutencao) {
            if (!ferramenta.usar()) return false;
            this.acaoOk = true;
            return true;
        }
        return false;
    }
}
// ---------------------------------------------
export class DossieConfidencial extends Objeto {
    constructor() {
        super(
            "dossie_confidencial",
            "Um conjunto de pastas antigas. Uma delas parece suspeita.",
            "Você encontrou o Dossiê Confidencial com provas de corrupção."
        );
    }

    usar(ferramenta) {
        validate(ferramenta, Ferramenta);
        // Não precisa de ferramenta para ativar na Fase 1
        this.acaoOk = true;
        return true;
    }
}
// ---------------------------------------------
