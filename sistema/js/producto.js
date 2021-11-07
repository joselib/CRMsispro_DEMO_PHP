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

    $('#search_proveedor').change(function(e) {
        e.preventDefault();
        var sistema = getUrl();
        location.href = sistema + 'buscar_productos.php?proveedor=' + $(this).val();

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
//alerta de cierre de ventana window

window.onbeforeunload = function(event) {
    var message = 'Important: Please click on \'Save\' button to leave this page.';
    if (typeof event == 'undefined') {
        event = window.event;
    }
    if (event) {
        event.returnValue = message;
    }
    return message;
};

$(function() {
    $("a").not('#lnkLogOut').click(function() {
        window.onbeforeunload = null;
    });
    $(".btn").click(function() {
        window.onbeforeunload = null;
    });
});