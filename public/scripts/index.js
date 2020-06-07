// Devolve uma lista de elementos .querySlectorAll()
// Devolve um único elemento
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {

    modal.classList.remove("hide")
})

close.addEventListener("clcick", () => {
    modal.classList.add("hide")
})