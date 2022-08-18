const bot = document.querySelectorAll("#caixa-pri a")



bot.forEach(item =>{
    item.addEventListener("click", onClick)
} )


function  onClick(event){

    event.preventDefault();
    const eleme = event.target;

    const id = eleme.getAttribute("href");

    const to = document.querySelector(id).offsetTop

    
    window.scroll({
        top: to - 50,
        behavior: "smooth"
    } )
}