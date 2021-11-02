
<?php
include("../conexion.php");
session_start();
//print_r($_POST);
if (!empty($_POST)) {
  // Extraer datos del producto
  if ($_POST['action'] == 'infoProducto') {
      $data = "";
    $producto_id = $_POST['producto'];
    $query = mysqli_query($conexion, "SELECT codproducto, descripcion, precio, existencia FROM producto WHERE codproducto = $producto_id");

    $result = mysqli_num_rows($query);
    if ($result > 0) {
      $data = mysqli_fetch_assoc($query);
      echo json_encode($data,JSON_UNESCAPED_UNICODE);
      exit;
    }else {
      $data = 0;
    }
  }
// Eliminar Producto
  if ($_POST['action'] == 'delProduct') {
    if (empty($_POST['producto_id']) || !is_numeric($_POST['producto_id'])) {
      echo "error";
    }else {

    $idproducto = $_REQUEST['producto_id'];
    $query_delete = mysqli_query($conexion, "UPDATE producto SET estado = 0 WHERE codproducto = $idproducto");
    mysqli_close($conexion);

  }
 echo "error";
 exit;
}
// Buscar Cliente
if ($_POST['action'] == 'searchCliente') {
  if (!empty($_POST['cliente'])) {
    $cc = $_POST['cliente'];

    $query = mysqli_query($conexion, "SELECT * FROM cliente WHERE cc LIKE '$cc'");
    mysqli_close($conexion);
    $result = mysqli_num_rows($query);
    $data = '';
    if ($result > 0) {
      $data = mysqli_fetch_assoc($query);
    }else {
      $data = 0;
    }
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
  }
  exit;
}


    // Cambiar contraseña
    if ($_POST['action'] == 'changePasword') {
      if (!empty($_POST['passActual']) && !empty($_POST['passNuevo'])) {
        $password = md5($_POST['passActual']);
        $newPass = md5($_POST['passNuevo']);
        $idUser = $_SESSION['idUser'];
        $code = '';
        $msg = '';
        $arrayData = array();
        $query_user = mysqli_query($conexion, "SELECT * FROM usuario WHERE clave = '$password' AND idusuario = $idUser");
        $result = mysqli_num_rows($query_user);
        if ($result > 0) {
          $query_update = mysqli_query($conexion, "UPDATE usuario SET clave = '$newPass' where idusuario = $idUser");
          mysqli_close($conexion);
          if ($query_update) {
            $code = '00';
            $msg = "su contraseña se ha actualizado con exito";
            header("Refresh:1; URL=salir.php");
          }else {
            $code = '2';
            $msg = "No es posible actualizar su contraseña";
          }
        }else {
          $code = '1';
          $msg = "La contraseña actual es incorrecta";
        }
        $arrayData = array('cod' => $code, 'msg' => $msg);
        echo json_encode($arrayData,JSON_UNESCAPED_UNICODE);
      }else {
        echo "error";
      }
      exit;
      }



}
exit;
 ?>
