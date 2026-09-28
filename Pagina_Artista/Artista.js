const btnSeguir = document.querySelector(".btn-seguir");

btnSeguir.addEventListener("click", () => {
    btnSeguir.classList.toggle("seguindo");

    if (btnSeguir.classList.contains("seguindo")) {
        btnSeguir.textContent = "Seguindo";
    } else {
        btnSeguir.textContent = "Seguir";
    }
});

btnSeguir.addEventListener("mouseenter", () => {
    if (btnSeguir.classList.contains("seguindo")) {
        btnSeguir.textContent = "Deixar de seguir";
    }
});

btnSeguir.addEventListener("mouseleave", () => {
    if (btnSeguir.classList.contains("seguindo")) {
        btnSeguir.textContent = "Seguindo";
    }
});