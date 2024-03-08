function cargarProductos() {
  var array = ["Barniz", "Melamina", "Herrajes"];
  array.sort();
  addOptions("producto", array);
  $("#manoobra").val(0);
  $("#instalacion").val(0);
}
window.onload = cargarProductos;

function addOptions(domElement, array) {
  var selector = document.getElementsByName(domElement)[0];
  for (var producto in array) {
    var opcion = document.createElement("option");
    opcion.text = array[producto];
    // Añadimos un value a los option para hacer mas facil escoger los pueblos
    opcion.value = array[producto].toLowerCase()
    selector.add(opcion);
  }
}


$(document).on('click', '.borrar', function(event) {
  event.preventDefault();
  $(this).closest('tr').remove();
  calcular();
});

function cargarMateriales() {
  // Objeto de provincias con pueblos
  var listaProductos = {
    barniz: ["kit fondo", "kit retardador", "kit uresayer"],
    melamina: ["blanco 122x244", "arauco 122x244", "vesto 250x180"],
    herrajes: ["bisagra libro 3x3", "brida", "cerradura"]
  }

  var productos = document.getElementById('producto')
  var materiales = document.getElementById('material')
  var productoSeleccionado = productos.value

  // Se limpian los pueblos
  materiales.innerHTML = '<option value="">Selecciona un material...</option>'

  if (productoSeleccionado !== '') {
    // Se seleccionan los pueblos y se ordenan
    productoSeleccionado = listaProductos[productoSeleccionado]
    productoSeleccionado.sort()

    // Insertamos los pueblos
    productoSeleccionado.forEach(function(material) {
      let opcion = document.createElement('option')
      opcion.value = material
      opcion.text = material
      materiales.add(opcion)
    });
  }

}

function guardar() {

  var _prod = document.getElementById("producto").value;
  var _mat = document.getElementById("material").value;
  var _can = document.getElementById("cantidad").value;
  var _pro;
  var _pre;
  var _uni;
  var _tot;

  if (_mat == "kit fondo" || _mat == "kit retardador" || _mat == "kit uresayer") {
    _pro = "sayer";
    _uni = "litro";
    if(_mat == "kit uresayer"){
    	_pre = 460;
    }
    else{
    	_pre = 430;
    }
    _tot = _can * _pre;
  }
  
  if (_mat == "blanco 122x244" || _mat == "arauco 122x244" || _mat == "vesto 250x180") {
    _pro = "arauco";
    _uni = "hoja";
    if(_mat == "blanco 122x244"){
    	_pre = 560;
    }
    else if(_mat == "arauco 122x244"){
    	_pre = 770;
    }
    else{
    	_pre = 1200;
    }
    _tot = _can * _pre;
  }
  
  if (_mat == "bisagra libro 3x3" || _mat == "brida" || _mat == "cerradura") {
    _pro = "bruken";
    _uni = "pieza";
    if(_mat == "bisagra libro 3x3"){
    	_pre = 12;
    }
    else if(_mat == "brida"){
    	_pre = 7.50;
    }
    else{
    	_pre = 431;
    }
    _tot = _can * _pre;
  }

  var fila = "<tr id='registros'><td>" + _prod + "</td><td>" + _mat + "</td><td>" + _pro + "</td><td>" + _pre + "</td><td>" + _uni + "</td><td>" + _can + "</td><td class = totalCol>" + _tot + "</td><td><input type='button' class='borrar' value='Eliminar'/></td></tr>";

  var btn = document.createElement("TR");
  btn.innerHTML = fila;
  document.getElementById("tablita").appendChild(btn);

  calcular();
}

function calcular() {
  var sum = 0;
  $('.totalCol').each(function() {
    sum += parseFloat($(this).text().replace(/,/g, ''), 10);
  });
  var calcMano = parseFloat(document.getElementById("manoobra").value);
  var calcInst = parseFloat(document.getElementById("instalacion").value);
  if(calcMano == null){
  	calcMano = 0;
  }
  if(calcInst == null){
  	calcInst = 0;
  }
  document.getElementById("subtotal").innerHTML = sum + calcMano + calcInst;
  totalote();
}

function utilidad(){
var subtot = parseFloat($("#subtotal").html());
var utilidad = parseFloat($("#utilidad").val());

var uti1 = 100-utilidad;
var uti2 = uti1/100;
var total = (subtot / uti2);

document.getElementById("totalote").innerHTML = total;
}

function todos() {
  guardar();
  totalote();
}

function totalote(){
	var subt = parseFloat($("#subtotal").html());
  var totaloteSuma = subt * 1.60;
  document.getElementById("totalote").innerHTML = totaloteSuma;
}

function manoObra(){
	var subtotalmano = parseFloat($("#subtotal").html());
  var manoobra = parseFloat($("#manoobra").val());
  var subManoObra = subtotalmano + manoobra;
  document.getElementById("subtotal").innerHTML = subManoObra;
  totalote();
}

function instalacion(){
	var subtotalinsta = parseFloat($("#subtotal").html());
  var instala = parseFloat($("#manoobra").val());
  var subInsta = subtotalinsta + instala;
  document.getElementById("subtotal").innerHTML = subInsta;
  totalote();
}


