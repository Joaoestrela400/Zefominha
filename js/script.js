
/* 1. Seleciona os elementos do HTML */
const botaoMenu = document.querySelector("#btn-menu");
const menu = document.querySelector(".main-nav");
const botaoTema = document.querySelector("#btn-tema");

/* 2. Contador de cliques */
let cliques = 0;

/* 3. Abre e fecha o menu com arrow function */
botaoMenu.addEventListener("click", () => {

    // Alterna a classe active
    menu.classList.toggle("active");

    // Verifica se o menu está aberto
    const menuAberto = menu.classList.contains("active");

    // Altera o texto do botão
    botaoMenu.textContent = menuAberto
        ? "✕ Fechar"
        : "☰ Menu";

    // Atualiza os atributos de acessibilidade
    botaoMenu.setAttribute(
        "aria-expanded",
        String(menuAberto)
    );

    botaoMenu.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );

    // Conta os cliques
    cliques++;

    console.log("Cliques no menu:", cliques);
});

/* 4. Fecha o menu ao clicar em um link */
const linksMenu = menu.querySelectorAll("a");

linksMenu.forEach((link) => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

        botaoMenu.textContent = "☰ Menu";

        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");

    });

});

/* 5. Alterna entre modo claro e escuro */
botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("escuro");

    const modoEscuro =
        document.body.classList.contains("escuro");

    botaoTema.textContent = modoEscuro ? "☀️" : "🌙";

    botaoTema.setAttribute(
        "aria-label",
        modoEscuro ? "Ativar modo claro" : "Ativar modo escuro"
    );

});
