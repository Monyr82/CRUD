const nombre = document.querySelector ('#nombre');
const telefono = document.querySelector ('#telefono');
const btn = document.querySelector ('#btn');
const btn2 = document.querySelector ('#btn2');
const  tableBody = document.querySelector ('#tableBody');
const  formulario = document.querySelector ('#formulario');
let referencia = "";

// Los eventos 
btn.addEventListener('click', enviar);
btn2.addEventListener('click', actualizar2);
document.addEventListener('DOMContentLoaded', pintar);

//para cuando se cargue la pagina ejecute la funcion, cada vez va a llamar
//la funcion pintar y va a iterar sobre lo que haya e imprimir en la tabla

// Las funciones que utilizaremos
function enviar (){//primero evalua al objeto persona y luego valida si en en la base de datos hay informacion para no sobreescribirla

     
    let objPersona = {
        nombre: nombre.value,
        telefono: telefono.value,
        id: Date.now(),
    }
       
    let arreglo= JSON.parse(localStorage.getItem('DB'));
    if(arreglo===null){
        arreglo = [];
        arreglo.push(objPersona);
        localStorage.setItem("DB", JSON.stringify(arreglo)); 

           }else{
        arreglo.push(objPersona);
        localStorage.setItem("DB", JSON.stringify(arreglo));

        
        formulario.reset();
        pintar();
    }
       //Los objetos son los que contienen objetos strings numeros etc y por medio de los arreglos vamos a guardar en localstorage
    //tonces declaramos el arreglo vacio para iniciar let arreglo = [];

};

function pintar(){
    let datos = JSON.parse(localStorage.getItem("DB"));
    
     tableBody.innerHTML=''
       datos.forEach(element => {
        tableBody.innerHTML= tableBody.innerHTML +
        `
            <tr class='tr' key={element.id}>   
            <td>${element.nombre}</td>
            <td>${element.telefono}</td>
            <td><button onclick='eliminar(event)'>eliminar</button><button onclick='actualizar(event)'>actualizar</button></td>
            <td style='display none'>${element.id}</td>
            </tr>
        `
    })
}

function eliminar(e){
        //console.log('index')
        
        let datos=JSON.parse(localStorage.getItem('DB'));
        let index=datos.findIndex((element)=>{    return element.id == e.target.parentNode.parentNode.getAttribute("key")  });
       //console.log(index)

       datos.splice(index,1);
       localStorage.setItem('DB', JSON.stringify(datos));

       pintar();
      
    }
function actualizar(e){
//console.log('si funciona')

//console.log(buscarElemento) no me funciono
        let datos= JSON.parse(localStorage.getItem('DB'));
        let index=datos.findIndex((element)=>{ return element.id == e.target.parentNode.parentNode.childNodes[7].innerHTML });
        //console.log(index)//si da menos 1 quiere decir que no lo encontro
        console.log(e.target.parentNode.parentNode.childNodes[7].innerHTML)//para probar que index datos si me busca el indicador del elemento que queremos actualizar
          //parent node va bajando padre, hijo y otro nivel     e.target es donde le dimos click
        nombre.value= datos[index].nombre;
        telefono.value=datos[index].telefono;

        btn.style.display='none'
        btn2.style.display='block'; //que se vea

        referencia=datos[index].id; //guardando el id del objeto que queremos actualizar

}

    
function actualizar2 (e){
//console.log('referencia') no funciona
    
let objPersona = {
    nombre: nombre.value,
    telefono: telefono.value,
    id: referencia
};

let datos= JSON.parse(localStorage.getItem('DB')); //trae info que esta en base de datos
let index = datos.findIndex((element)=>{
    return element.id == e.target.parentNode.parentNode.getAttribute("key")
  });
 //hay que encontrar el indice
//console.log(index) no funciona

datos.splice(index,1, objPersona); //busca index eliminando una posicion, y le enviamos la nueva informacion objPersona
localStorage.setItem('DB', JSON.stringify(datos)); //sobrescribe la info nueva

pintar();


btn.style.display='block'
btn2.style.display='none'

formulario.reset();

    
}
        
        


