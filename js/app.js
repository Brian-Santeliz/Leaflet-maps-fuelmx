
const ui = new UI();

document.addEventListener('DOMContentLoaded', e=>{
    ui.mostrarEstablecimientos()
})

const input = document.querySelector('#input');
input.addEventListener('input',(e)=>{
  if( e.target.value.length > 5){
      //que
      ui.obtenerDatosFiltrar(e.target.value)
  }else{
      ui.mostrarEstablecimientos()
  }
});