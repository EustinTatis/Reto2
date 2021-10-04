function traerInformacion() {
    $.ajax({
      url: "https://g14c871725d0174-bdgastos1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/",
      type: "GET",
      dataType: "json",
  
      error: function (xhr, status) {
        alert("ha sucedido un problema, " + xhr.status);
      },
      complete: function (xhr, status) {
        alert("Petición realizada, " + xhr.status);
      },
      success: function (response) {
        var misItems = response.items;
  
        for (i = 0; i < misItems.length; i++) {
          $("#miResultado").append("<tr>");
          $("#miResultado").append("<td>" + misItems[i].id + "</td>");
          $("#miResultado").append("<td>" + misItems[i].messagetext + "</td>");
          $("#miResultado").append('<td><button onclick="borrar('+misItems[i].id +')">Borrar</button></td>');
          $("#miResultado").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id +')">Cargar</button></td>');
          $("#miResultado").append("</tr>");
        }
      },
    });
  }
  
  function guardar() {
    let elemento = {
      id: $("#id").val(),
      messagetext: $("#mensajes").val(),
    };
  
    let dataToSend = JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
      dataType: "json",
      data: elemento,
      url: "https://g14c871725d0174-bdgastos1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/",
      type: "POST",
  
      success: function (response) {
        console.log(response);
      },

      complete : function(xhr, status) {
        alert('Registro guardado correctamente, '+xhr.status);
        limpiarFormulario();
      },
  
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  }

  function borrar(idElemento) {
    var elemento = {
      id: idElemento,
    };
  
    var dataToSend = JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
      dataType: "json",
      data: dataToSend,
      url: "https://g14c871725d0174-bdgastos1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/",
      type: "DELETE",
      contentType: "application/json",
      success: function (response) {
        console.log(response);
      },
      complete: function (xhr, status) {
        alert("Información eliminada correctamente, "+xhr.status);
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error en la eliminación");
      },
    });
  }
  
  function obtenerItemEspecifico(idItem) {
    $.ajax({
      dataType: "json",
      url:
        "https://g14c871725d0174-bdgastos1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/" +
        idItem,
      type: "GET",
      success: function (response) {
        console.log(response);
        var item = response.items[0];
  
        $("#id").val(item.id);
        $("#mensajes").val(item.messagetext);

      },
  
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  }
  
  function actualizar() {
    var elemento = {
      id: $("#id").val(),
      messagetext: $("#mensajes").val(),
    };
  
    var dataToSend = JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
      dataType: "json",
      data: dataToSend,
      contentType: "application/json",
      url: "https://g14c871725d0174-bdgastos1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/",
      type: "PUT",
  
      success: function (response) {
        console.log(response);
      },

      complete : function(xhr, status) {
        alert('Registro actualizado correctamente, '+xhr.status);
        limpiarFormulario();
      },
  
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  }

  function limpiarFormulario(){
    $("#id").val("");
    $("#mensajes").val("");
}