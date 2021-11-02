$(document).ready(function() {
    $('.btnMenu').click(function(e) {
        e.preventDefault();
        if ($('nav').hasClass('viewMenu')) {
            $('nav').removeClass('viewMenu');
        } else {
            $('nav').addClass('viewMenu');
        }
    });

    $('nav ul li').click(function() {
        $('nav ul li ul').slideUp();
        $(this).children('ul').slideToggle();
    });
    // Modal Agregar
    $('.add_product').click(function(e) {
        e.preventDefault();
        var producto = $(this).attr('product');
        var action = 'infoProducto';
        $.ajax({
            url: 'modal.php',
            type: 'POST',
            async: true,
            data: { action: action, producto: producto },

            success: function(response) {
                if (response != 0) {
                    var info = JSON.parse(response);
                    //  $('#producto_id').val(info.codproducto);
                    //  $('.nameProducto').html(info.descripcion);

                    $('.bodyModal').html('<form action="" method="post" name="form_add_product" id="form_add_product" onsubmit="event.preventDefault(); sendDataProduct();">' +
                        '<h1>Agregar Producto</h1><br>' +
                        '<h2 class="nameProducto">' + info.descripcion + '</h2>' +
                        '<br>' +
                        '<hr>' +
                        '<input type="number" name="cantidad" id="txtCantidad" placeholder="Cantidad del Producto" required><br>' +
                        '<input type="number" name="precio" id="txtPrecio" placeholder="Precio del Producto" required>' +
                        '<input type="hidden" name="producto_id" id="producto_id" value="' + info.codproducto + '" required><br>' +
                        '<input type="hidden" name="action" value="addProduct" required>' +
                        '<div class="alert alertAddProduct"></div>' +
                        '<button type="submit" class="btn_new">Agregar</button>' +
                        '<a href="#" class="btn_ok closeModal" onclick="closeModal();">Cerrar</a>' +

                        '</form>');
                }
            },
            error: function(error) {
                console.log(error);
            }
        });

        $('.modal').fadeIn();

    });
    // modal Eliminar producto
    $('.del_product').click(function(e) {
        e.preventDefault();
        var producto = $(this).attr('product');
        var action = 'infoProducto';
        $.ajax({
            url: 'modal.php',
            type: 'POST',
            async: true,
            data: { action: action, producto: producto },

            success: function(response) {
                if (response != 0) {
                    var info = JSON.parse(response);

                    //  $('.nameProducto').html(info.descripcion);

                    $('.bodyModal').html('<form action="" method="post" name="form_del_product" id="form_del_product" onsubmit="event.preventDefault(); delProduct();">' +
                        '<h2 style="color: red; font-size: 18px;">¿Estás seguro de eliminar el Producto</h2>' +
                        '<h2 class="nameProducto">' + info.descripcion + '</h2>' +
                        '<hr>' +
                        '<input type="hidden" name="producto_id" id="producto_id" value="' + info.codproducto + '" required><br>' +
                        '<input type="hidden" name="action" value="delProduct" required>' +
                        '<div class="alert alertAddProduct"></div>' +
                        '<input type="submit"  value="Aceptar" class="ok"><br>' +
                        '<a href="#" style="text-align: center;" class="btn_cancelar" onclick="closeModal();">Cerrar</a>' +
                        '</form>');
                }
            },
            error: function(error) {
                console.log('error');
            }
        });

        $('.modal').fadeIn();

    });

    $('#search_proveedor').change(function(e) {
        e.preventDefault();
        var sistema = getUrl();
        location.href = sistema + 'buscar_productos.php?proveedor=' + $(this).val();

    });

    // activa campos para registrar Cliente
    $('.btn_new_cliente').click(function(e) {
        e.preventDefault();
        $('#nom_cliente').removeAttr('disabled');
        $('#tel_cliente').removeAttr('disabled');
        $('#dir_cliente').removeAttr('disabled');

        $('#div_registro_cliente').slideDown();

    });

    // buscar Cliente
    $('#cc_cliente').keyup(function(e) {
        e.preventDefault();
        var cl = $(this).val();
        var action = 'searchCliente';
        $.ajax({
            url: 'modal.php',
            type: "POST",
            async: true,
            data: { action: action, cliente: cl },
            success: function(response) {
                if (response == 0) {
                    $('#idcliente').val('');
                    $('#nom_cliente').val('');
                    $('#tel_cliente').val('');
                    $('#dir_cliente').val('');
                    // mostar boton agregar
                    $('.btn_new_cliente').slideDown();
                } else {
                    var data = $.parseJSON(response);
                    $('#idcliente').val(data.idcliente);
                    $('#nom_cliente').val(data.nombre);
                    $('#tel_cliente').val(data.telefono);
                    $('#dir_cliente').val(data.direccion);
                    // ocultar boton Agregar
                    $('.btn_new_cliente').slideUp();

                    // Bloque campos
                    $('#nom_cliente').attr('disabled', 'disabled');
                    $('#tel_cliente').attr('disabled', 'disabled');
                    $('#dir_cliente').attr('disabled', 'disabled');
                    // ocultar boto Guardar
                    $('#div_registro_cliente').slideUp();
                }
            },
            error: function(error) {

            }
        });

    });

    // Cambiar contraseña
    $('.newPass').keyup(function() {
        validaPass();
    });

    // cambiar contraseña
    $('#frmChangePass').submit(function(e) {
        e.preventDefault();
        var passActual = $('#actual').val();
        var passNuevo = $('#nueva').val();
        var passconfir = $('#confirmar').val();
        var action = "changePasword";
        if (passNuevo != passconfir) {
            $('.alertChangePass').html('<p style="color:red;">Las contraseñas no Coinciden</p>');
            $('.alertChangePass').slideDown();
            return false;
        }
        if (passNuevo.length < 5) {
            $('.alertChangePass').html('<p style="color:orangered;">Las contraseñas deben contener como mínimo 5 caracteres');
            $('.alertChangePass').slideDown();
            return false;
        }
        $.ajax({
            url: 'modal.php',
            type: 'POST',
            async: true,
            data: { action: action, passActual: passActual, passNuevo: passNuevo },
            success: function(response) {
                if (response != 'error') {
                    var info = JSON.parse(response);
                    if (info.cod == '00') {
                        $('.alertChangePass').html('<p style="color:green;">' + info.msg + '</p>');
                        $('#frmChangePass')[0].reset();
                    } else {
                        $('.alertChangePass').html('<p style="color:green;">' + info.msg + '</p>');
                    }
                    $('.alertChangePass').slideDown();
                }
            },
            error: function(error) {}
        });
    });

    $(".confirmar").submit(function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.submit();
            }
        })
    })


}); // fin ready

function validaPass() {
    var passNuevo = $('#nueva').val();
    var confirmarPass = $('#confirmar').val();
    if (passNuevo != confirmarPass) {
        $('.alertChangePass').html('<p style="color:red;">Las contraseñas no Coinciden</p>');
        $('.alertChangePass').slideDown();
        return false;
    }
    if (passNuevo.length < 5) {
        $('.alertChangePass').html('<p style="color:orangered;">Las contraseñas deben contener como mínimo 5 caracteres');
        $('.alertChangePass').slideDown();
        return false;
    }

    $('.alertChangePass').html('<p style="color:blue;">Las contraseñas Coinciden.</p>');
    $('.alertChangePass').slideDown();
}


// funcion para elimar producto
function delProduct() {
    var pr = $('#producto_id').val();
    $('.alertAddProduct').html('');
    $.ajax({
        url: 'modal.php',
        type: 'POST',
        async: true,
        data: $('#form_del_product').serialize(),
        success: function(response) {

            if (response == 'error') {
                $('.alertAddProduct').html('<p style="color : red;">Error al eliminar producto.</p>');

            } else {

                $('.row' + pr).remove();
                $('#form_del_product .ok').remove();
                $('.alertAddProduct').html('<p>Producto Eliminado Corectamente.</p>');

            }
        },
        error: function(error) {
            console.log(error);

        }
    });

}