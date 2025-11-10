Segredos da Sala 13 é um jogo de aventura em texto desenvolvido em JavaScript, aplicando os princípios da Programação Orientada a Objetos (POO).

O jogador assume o papel de um zelador do IFRS e deve explorar salas, coletar ferramentas e resolver enigmas para descobrir o Dossiê Confidencial e desvendar o mistério do desaparecimento de um professor antes que os dados sejam apagados.

🎮 Como jogar
1️⃣ Requisitos

Node.js instalado (versão 18 ou superior)

2️⃣ Execução
cd ~/Projetos/RPG
node index.js

3️⃣ Comandos disponíveis
Comando	Função
pega <ferramenta>	Coleta uma ferramenta da sala
usa <ferramenta> <objeto>	Usa uma ferramenta em um objeto
sai <sala>	Move o jogador para outra sala
inventario	Exibe os itens na mochila
fim	Encerra o jogo
🗺️ Estrutura do jogo

O mapa é composto por 6 salas interligadas, sendo 4 obrigatórias para vencer o jogo:

Sala de Entrada → Corredor Principal → Sala de Manutenção → Sala dos Professores → Sala do Servidor
                                             ↘
                                         Sala de Arquivos (opcional)

🧠 Tecnologias e conceitos aplicados

JavaScript (ES6 Modules)

Programação Orientada a Objetos (POO)

Herança (Sala, Ferramenta, Objeto)

Encapsulamento (#atributos privados)

Polimorfismo (sobrescrita do método usa() em cada sala)

Estruturas de dados (Map, Array)

Entrada de comandos via prompt-sync

🏆 Objetivo do jogo

Explorar as salas, coletar e usar ferramentas corretamente para realizar o upload do Dossiê Confidencial antes que o sistema de segurança apague os dados.
O uso incorreto das ferramentas pode causar uma derrota.

📘 Enredo

Após o misterioso desaparecimento do professor do IFRS, você — um novo zelador da escola — é chamado para organizar a antiga Sala 13, um ambiente lacrado há anos.
Ao entrar, descobre bilhetes, computadores antigos e um sistema de segurança que se ativa automaticamente.
Agora, você tem apenas uma madrugada para descobrir onde está o Dossiê Confidencial e provar a corrupção na escola antes que todas as evidências sejam apagadas.

Estrutura de classes

O jogo foi modelado com base em conceitos de POO.
As principais classes são:

Engine → controla o fluxo principal do jogo.

Mochila → armazena as ferramentas do jogador.

Sala (superclasse) → representa um ambiente.

SalaEntrada

CorredorPrincipal

SalaManutencao

SalaProfessores

SalaServidor

SalaArquivos

Ferramenta (superclasse) → base para todos os itens utilizáveis.

Lanterna, ChaveManutencao, CartaoAcesso, FusivelReserva

Objeto (superclasse) → base para todos os objetos interativos.

PainelEnergia, ArmarioTrancado, CaixaDeFusiveis, TerminalServidor, PainelSensivel, DossieConfidencial

