// FerramentasSala13.js
import { Ferramenta } from "./Basicas.js";

// ---------------------------------------------
// Lanterna com bateria (energia limitada)
export class Lanterna extends Ferramenta {
    #carga;

    constructor() {
        super("lanterna");
        this.#carga = 3; // 3 usos
    }

    usar() {
        if (this.#carga <= 0) {
            console.log("A lanterna está sem bateria.");
            return false;
        }
        this.#carga--;
        console.log("Você acende a lanterna. Carga restante: " + this.#carga);
        return true;
    }
}

// ---------------------------------------------
// Chave de manutenção (descartável: 1 uso)
export class ChaveManutencao extends Ferramenta {
    #usos;

    constructor() {
        super("chave_manutencao");
        this.#usos = 1;
    }

    usar() {
        if (this.#usos <= 0) {
            console.log("A chave de manutenção já está gasta e não funciona mais.");
            return false;
        }
        this.#usos--;
        console.log("Você usa a chave de manutenção.");
        return true;
    }
}

// ---------------------------------------------
// Cartão de acesso (2 usos)
export class CartaoAcesso extends Ferramenta {
    #usos;

    constructor() {
        super("cartao_acesso");
        this.#usos = 2;
    }

    usar() {
        if (this.#usos <= 0) {
            console.log("O cartão de acesso não é mais reconhecido pelo sistema.");
            return false;
        }
        this.#usos--;
        console.log("Você passa o cartão de acesso.");
        return true;
    }
}

// ---------------------------------------------
// Fusível reserva (1 uso) - opcional para restaurar energia
export class FusivelReserva extends Ferramenta {
    #usos;

    constructor() {
        super("fusivel_reserva");
        this.#usos = 1;
    }

    usar() {
        if (this.#usos <= 0) {
            console.log("O fusível reserva já foi utilizado.");
            return false;
        }
        this.#usos--;
        console.log("Você encaixa o fusível reserva.");
        return true;
    }
}
// ---------------------------------------------
