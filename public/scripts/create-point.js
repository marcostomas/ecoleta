/* Busca o campo Estado dentro do documento HTML, através pelo atributo name, daquele elemento
   
    document.querySelector("uf") 

*/


function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")  

    /* Promessa */
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    /* Outra possibilidade, caso haja apenas um valor/ valor simples seria: .then( res => res.json() ) */
    .then( states  => {

        // Similar ao foreach do C#
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCitites(event){
    const citySelect =  document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities  => {
        // Similar ao foreach do C# 
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

/* Busca pela tag select, que tem atributo name como uf */
document
    .querySelector("select[name=uf]")
    /* 
        Caso haja algum evento, este método fará algo, que no caso é passado por parâmetro 
        () => {} //Cria uma função anônima, ou seja, sem nome [Isto é uma Arrow Function]
    */ 
   
    /* 
        Ao retirar os () de getCitites, eu digo ao JS, que ele não deve executar, e sim aguardar a mudança
        Isso se chama, passar por referência
    */ 
    .addEventListener("change", getCitites) 

// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    
    const itemLi = event.target

    /*  
        Adicionar ou remover uma class (CSS), no JS
        
        Adicionar → .add()
        Remover → .remove()
        Adicionar e Remover → .toggle()
    */
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id


    /*
        • Verificar se existem itens selecionados, //1
        se sim,pegar os itens selecionados.

        • Se estiver selecionado, remover da seleção. //2

        • Se não estiver, adicionar à seleção //3

        • Atualizar o campo escondido com os itens atualizados //4
    */

    const alreadySelected = selectedItems.findIndex( item => { //1
        const itemFound = item == itemId  //Retorna True ou False 
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => { //2
            const itemIsDifferent = item != itemId //Retorna False
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{ //3
        //Coloca novos itens no Array e retorna o comprimento do Array
        selectedItems.push(itemId) 
    }

    collectedItems.value = selectedItems
}