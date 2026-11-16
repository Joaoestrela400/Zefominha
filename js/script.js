/* =========================================================
   SCRIPT.JS - Zé Fominha
   Interatividade do site: menu, tema claro/escuro,
   carrossel de pratos e ano do rodapé.

   DICA: se algo não funcionar, aperte F12 e abra a aba
   "Console". Os erros aparecem lá em vermelho.
   ========================================================= */

console.log("script.js carregado com sucesso!");


/* 1. Seleciona os elementos do HTML */
const botaoMenu = document.querySelector("#btn-menu");
const menu = document.querySelector(".main-nav");
const botaoTema = document.querySelector("#btn-tema");

/* Contador de cliques no menu */
let cliques = 0;


/* ---------------------------------------------------------
   2) MENU HAMBÚRGUER (celular)
   O "if" garante que o código só roda se os elementos
   existem. Como este script é usado em várias páginas,
   isso evita erros que travariam o resto do arquivo.
   --------------------------------------------------------- */
if (botaoMenu && menu) {

    /* Função reutilizável para fechar o menu */
    const fecharMenu = () => {
        menu.classList.remove("active");
        botaoMenu.textContent = "☰ Menu";
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    };

    /* Abre e fecha o menu */
    botaoMenu.addEventListener("click", () => {

        // Liga/desliga a classe "active"
        menu.classList.toggle("active");

        // Verifica se o menu está aberto
        const menuAberto = menu.classList.contains("active");

        // Altera o texto do botão
        botaoMenu.textContent = menuAberto ? "✕ Fechar" : "☰ Menu";

        // Atualiza os atributos de acessibilidade
        botaoMenu.setAttribute("aria-expanded", String(menuAberto));
        botaoMenu.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");

        // Conta os cliques
        cliques++;
        console.log("Cliques no menu:", cliques);
    });

    /* Fecha o menu ao clicar em um link */
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });
}


/* ---------------------------------------------------------
   3) TEMA CLARO / ESCURO
   O tema escolhido fica salvo no navegador (localStorage),
   então continua o mesmo quando a pessoa troca de página
   ou volta ao site depois.
   --------------------------------------------------------- */
if (botaoTema) {

    /* Aplica o tema na tela: classe no body, ícone e aria-label */
    const aplicarTema = (escuro) => {
        document.body.classList.toggle("escuro", escuro);
        botaoTema.textContent = escuro ? "☀️" : "🌙";
        botaoTema.setAttribute(
            "aria-label",
            escuro ? "Ativar modo claro" : "Ativar modo escuro"
        );
    };

    /* Ao abrir a página, recupera o tema salvo.
       O try/catch evita erro caso o navegador bloqueie o localStorage. */
    try {
        aplicarTema(localStorage.getItem("tema") === "escuro");
    } catch (erro) {
        console.warn("Não foi possível ler o tema salvo:", erro);
    }

    /* Alterna ao clicar */
    botaoTema.addEventListener("click", () => {

        const modoEscuro = !document.body.classList.contains("escuro");

        aplicarTema(modoEscuro);

        try {
            localStorage.setItem("tema", modoEscuro ? "escuro" : "claro");
        } catch (erro) {
            console.warn("Não foi possível salvar o tema:", erro);
        }
    });
}


/* ---------------------------------------------------------
   4) CARROSSEL DE PRATOS (página inicial)
   Os ids e classes ainda se chamam "course-*" para
   combinar com o HTML e o CSS.
   --------------------------------------------------------- */
const courseList = document.getElementById("course-list"); // lista de cards
const btnNext = document.getElementById("btn-next");       // seta da direita
const btnPrev = document.getElementById("btn-prev");       // seta da esquerda

/* Só roda nas páginas que têm o carrossel (a index) */
if (courseList && btnNext && btnPrev) {

    /* Quanto rolar: a largura de UM card + o espaço entre eles */
    const tamanhoDoPasso = () => {
        const card = courseList.querySelector(".course-card");
        return card.offsetWidth + 16; // 16 = "gap" definido no CSS
    };

    /* Seta da DIREITA */
    btnNext.addEventListener("click", () => {

        // scrollLeft = quanto já rolou | clientWidth = largura visível
        // scrollWidth = largura total (inclusive o que está escondido)
        const chegouNoFim =
            courseList.scrollLeft + courseList.clientWidth >= courseList.scrollWidth - 10;

        if (chegouNoFim) {
            // Chegou ao fim? Volta para o começo.
            courseList.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            // Senão, anda um card para a direita.
            courseList.scrollBy({ left: tamanhoDoPasso(), behavior: "smooth" });
        }
    });

    /* Seta da ESQUERDA (número negativo = rola para a esquerda) */
    btnPrev.addEventListener("click", () => {
        courseList.scrollBy({ left: -tamanhoDoPasso(), behavior: "smooth" });
    });
}


/* ---------------------------------------------------------
   5) ANO AUTOMÁTICO NO RODAPÉ
   --------------------------------------------------------- */
const ano = document.getElementById("ano");

if (ano) {
    // new Date() pega a data de hoje; getFullYear() devolve só o ano.
    ano.textContent = new Date().getFullYear();
}