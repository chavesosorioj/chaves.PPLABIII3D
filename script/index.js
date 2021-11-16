import AnuncioAnimales from "./anuncio.js";

let idSeleccionado= "";

const listaAnuncios = JSON.parse(localStorage.getItem("animales")) || [];

console.log("estoydebajo de la lista");
console.log(listaAnuncios);

window.addEventListener("DOMContentLoaded",()=>{


    document.forms[0].addEventListener("submit", handlerAgregar);
    document.addEventListener("click",handlerClick);    

    if(listaAnuncios.length >0){
        handlerCargarLista(listaAnuncios);
        console.log("if lista anuncio");
    }
});

function handlerCargarLista(e){
    renderizarLista(crearTabla(listaAnuncios), document.getElementById("divTablaAnuncios"));
}

function renderizarLista(lista, contenedor){

    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild);
    }

    if(lista){
       contenedor.appendChild(lista); 
    }
}

function crearTabla(item){

    const tabla = document.createElement("table");
    tabla.appendChild(crearThead(item[0]));
    tabla.appendChild(crearTBody(item));

    return tabla;
}

function crearThead(item){
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");


    for(const key in item){
        if (key !== "id"){
        const th = document.createElement("th");
        th.textContent = key;
        tr.appendChild(th);  
        }    
    }
    thead.appendChild(tr);
    return thead;
}

function crearTBody(items){
    const tbody = document.createElement("tbody");
    items.forEach(item=>{
        const tr = document.createElement("tr");
        
        for(const key in item){
            if (key == "id"){
                tr.setAttribute("data-id",item[key]);
            }else{
                const td = document.createElement("td");
                td.textContent = item[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}

function handlerAgregar(e){
    e.preventDefault();
    const form = e.target; // referencia al objeto sobre el que lanzo el evento
    if(document.getElementById("btnGuardar").value =="Guardar"){
        console.log("estoy generando el formulario");
        const nuevoAnuncio = new AnuncioAnimales(
            Date.now(),
            form.titulo.value,
            form.descripcion.value,
            form.animal.value,
            form.precio.value,
            form.raza.value,
            form.fecha.value,
            form.vacuna.value
        )
            
            spinner();
            setTimeout(()=>{
                altaAnuncio(nuevoAnuncio);
                eliminarSpinner();
            },3000);

    } 
}

function handlerClick(e){
    if(e.target.matches("td")){
        let id = e.target.parentNode.dataset.id;
        idSeleccionado = id;
        cargarFormulario(idSeleccionado);

        console.log("estoy en el handler cargando el formulario");
    }
}

function spinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./imagenes/loading.gif");
    spinner.setAttribute("alt","spinner");
    document.getElementById("spinner").appendChild(spinner);
}
//chaves.PPLABIII3D
function eliminarSpinner(){
    document.getElementById("spinner").innerHTML="";
}

function altaAnuncio(a){
    listaAnuncios.push(a);
    almacenarDatos(listaAnuncios);
}


function almacenarDatos(data){
    localStorage.setItem("animales",JSON.stringify(data));
    handlerCargarLista();
}
function cargarFormulario(id){

    let anuncio = null;
    const form = document.forms[0];

    anuncio = listaAnuncios.filter(p => p.id == id)[0];

    form.id.value = anuncio.id;
    form.titulo.value = anuncio.titulo;
    form.descripcion.value = anuncio.descripcion;
    form.animal.value = anuncio.animal;
    form.precio.value = anuncio.precio;
    form.raza.value = anuncio.raza;
    form.fecha.value = anuncio.fecha;
    form.vacuna.value = anuncio.vacuna;
}