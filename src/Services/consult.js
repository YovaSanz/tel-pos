const { ipcMain } = require('electron');
const pool = require('./connection');


ipcMain.handle('search-user', async (event, usuario) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT id_usuario, Nombrecompleto, Telefono, user, fechaderegistro, nivel_usuario FROM usuarios WHERE user = ? AND password = ?', [usuario.user, usuario.password]);
    if (rows[0]) {
      rows[0].caja = null;
      return rows[0]; // Retorna el primer registro encontrado
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

//guardar usuarios 
ipcMain.handle('save-user', async (event, usuario) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const queryInsert = await conn.query('INSERT INTO usuarios (Nombrecompleto,Telefono,user,password,fechaderegistro,nivel_usuario) VALUES (?,?,?,?,?,?)',
      [usuario.Nombrecompleto, usuario.Telefono, usuario.user, usuario.password, usuario.fechaderegistro, usuario.nivel_usuario]);
    if (queryInsert) {
      const querySelect = await conn.query('SELECT * FROM usuarios WHERE id_usuario = ? ', [queryInsert.insertId]);

      return querySelect; // Retorna el usuario de la BD
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});



//Guarda el distribuidor pero solo devuelve un mensaje
ipcMain.handle('save-dis', async (event, distribuidor) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const queryInsert = await conn.query('INSERT INTO distribuidor (nombre, direccion,telefono,codigo,nombreem,direcem,teleem,celulares,fundas,bocinas,audifonos,micas,cargadores,otros) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [distribuidor.nombre, distribuidor.direccion, distribuidor.telefono, distribuidor.codigo, distribuidor.nombreem, distribuidor.direcem, distribuidor.teleem, distribuidor.celulares, distribuidor.fundas, distribuidor.bocinas, distribuidor.audifonos, distribuidor.micas, distribuidor.cargadores, distribuidor.otros]);
    if (queryInsert) {
      const querySelect = await conn.query('SELECT * FROM distribuidor WHERE id_dis = ? ', [queryInsert.insertId]);

      return querySelect; // Retorna el usuario de la BD
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});


//guardar productos 

ipcMain.handle('save-pro', async (event, productos) => {
  let conn;

  productos.descuento = 0;

  try {
    conn = await pool.getConnection();
    const queryInsert = await conn.query('INSERT INTO productos (distribuidor,articulos,garantia,codigo,modelo,marca,stock,descuento,preciocompra,precioventa,descripcion) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [productos.distribuidor, productos.articulos, productos.garantia, productos.codigo, productos.modelo, productos.marca, productos.stock, productos.descuento, productos.preciocompra, productos.precioventa, productos.descripcion]);
    if (queryInsert) {
      const querySelect = await conn.query('SELECT * FROM productos WHERE id_product = ? ', [queryInsert.insertId]);

      return querySelect; // Retorna el usuario de la BD
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

ipcMain.handle('stock-pro', async (event, productos) => {
  let conn;

  productos.descuento = 0;

  try {
    conn = await pool.getConnection();
    const queryInsert = await conn.query('UPDATE productos SET stock = ? WHERE id_product = ?',
      [productos.stock, productos.id_product]);
    if (queryInsert) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

ipcMain.handle('update-pro', async (event, productos) => {
  let conn;

  productos.descuento = 0;

  try {
    conn = await pool.getConnection();
    const queryInsert = await conn.query('UPDATE productos SET distribuidor = ?, articulos = ?, garantia = ?, codigo = ?, modelo = ?, marca = ?, stock = ?, descuento = ?, preciocompra = ?, precioventa = ?,  descripcion = ? WHERE id_product = ?',
      [productos.distribuidor, productos.articulos, productos.garantia, productos.codigo, productos.modelo, productos.marca, productos.stock, productos.descuento, productos.preciocompra, productos.precioventa, productos.descripcion, productos.id_product]);
    if (queryInsert) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

//selected en ventadecredito
ipcMain.handle('search-product', async (event, product) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM productos WHERE codigo = ?', [product.codigo]);
    if (rows) {
      return rows[0]; // Retorna el primer registro encontrado
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

ipcMain.handle('delete-product', async (event, proId) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM productos WHERE id_product = ?', [proId]);
    return true; // La eliminación fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la eliminación
  } finally {
    if (conn) conn.release();
  }
});

ipcMain.handle('save-sale', async (event, infoSale) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const queryVenta = await conn.query('INSERT INTO venta (id_usuario,usuario,total,fecha,hora) VALUES (?,?,?,cast(sysdate() as date),cast(sysdate() as time))',
      [parseInt(infoSale.usuario.id_usuario), infoSale.usuario.Nombrecompleto, infoSale.total]);

    if (queryVenta) {
      infoSale.products.forEach(async p => {
        if (p.imei) {
          const queryclienteCompra = await conn.query('INSERT INTO cliente_compra(id_cliente, nombre, apellidos, direccion, tel) VALUES (?,?,?,?,?)',
            [p.cliente.id_cli, p.cliente.nombre, p.cliente.apellidos, p.cliente.direccion, p.cliente.tel]);

          if (queryclienteCompra) {
            const queryVentaCelular = await conn.query('INSERT INTO venta_celular(id_venta, id_product, id_cliente_compra, precioventa, preciocompra, descuento, imei, descripcion) VALUES (?,?,?,?,?,?,?,?)',
              [queryVenta.insertId, p.id, queryclienteCompra.insertId, p.precio, p.preciocompra, p.descuento, p.imei, p.descripcion]);
          }

          const queryUpdateStock = await conn.query('UPDATE productos SET stock=stock-1 WHERE id_product=?', [p.id]);

        } else {
          const queryDetalleVenta = await conn.query('INSERT INTO detalle_venta(id_venta, id_product, precioventa, preciocompra, descuento, cantidad, descripcion) VALUES (?,?,?,?,?,?,?)',
            [queryVenta.insertId, p.id, p.precio, p.preciocompra, p.descuento, parseInt(p.cantidad), p.descripcion]);
          const queryUpdateStock = await conn.query('UPDATE productos SET stock=stock-? WHERE id_product=?', [p.cantidad, p.id]);
        }

      });



      const infoVenta = await conn.query('SELECT * FROM venta WHERE id_venta = ?', [queryVenta.insertId]);
      const infoDetalle = await conn.query('SELECT * FROM detalle_venta WHERE id_venta = ?', [queryVenta.insertId]);
      const infoCelular = await conn.query('SELECT * FROM venta_celular WHERE id_venta = ?', [queryVenta.insertId]);
      //const infoProducto = await conn.query('SELECT * FROM productos WHERE id_product = ?', [infoDetalle.id_product]);

      console.log(infoVenta, infoDetalle, infoCelular);

      return [infoVenta, infoDetalle, infoCelular]; // Retorna las tablas 'venta', 'detalle_venta', 'enta_celular' y el queryVenta
      //return queryVenta;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

//guardar clientes, estos se almacenaran en ventadacredito y apartado

ipcMain.handle('save-cli', async (event, clientes) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const queryInsert = await conn.query('INSERT INTO clientes (nombre,apellidos,direccion,tel) VALUES (?,?,?,?)',
      [clientes.nombre, clientes.apellidos, clientes.direccion, clientes.tel]);
    if (queryInsert) {
      const querySelect = await conn.query('SELECT * FROM clientes WHERE id_cli = ? ', [queryInsert.insertId]);

      return querySelect; // Retorna el usuario de la BD
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});


ipcMain.handle('delete-cli', async (event, cliId) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM clientes WHERE id_cli = ?', [cliId]);
    return true; // La eliminación fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la eliminación
  } finally {
    if (conn) conn.release();
  }
});


ipcMain.handle('update-cli', async (event, cliente) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('UPDATE clientes SET nombre = ?, apellidos = ? ,direccion = ?, tel = ?  WHERE id_cli = ?', [cliente.nombre, cliente.apellidos, cliente.direccion, cliente.tel, cliente.id_cli]);
    return true; // La actualización fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la actualización
  } finally {
    if (conn) conn.release();
  }
});

//listado y mandar a llamar los distribuidores de productos
ipcMain.handle('pull-dis', async (event, usuario) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM distribuidor');
    if (rows) {
      return rows; // Retorna el primer registro encontrado
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});


//selected en ventadecredito
ipcMain.handle('pull-cli', async (event, usuario) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM clientes');
    if (rows) {
      return rows; // Retorna el primer registro encontrado
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

//llamado de los productos a las ventas
ipcMain.handle('pull-pro', async (event, usuario) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM productos');
    if (rows) {
      return rows; // Retorna el primer registro encontrado
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

//listar usuarios
ipcMain.handle('pull-user', async (event, usuario) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM usuarios');
    if (rows) {
      return rows; // Retorna el primer registro encontrado
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

//eliminar usuarios

ipcMain.handle('delete-user', async (event, userId) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM usuarios WHERE id_usuario = ?', [userId]);
    return true; // La eliminación fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la eliminación
  } finally {
    if (conn) conn.release();
  }
});

//actualizar


ipcMain.handle('update-user', async (event, userId, newData) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('UPDATE usuarios SET  Nombrecompleto = ?, Telefono = ? ,user = ?, password = ? ,fechaderegistro = ? ,nivel_usuario = ? WHERE id_usuario = ?', [newData.Nombrecompleto, newData.Telefono, newData.user, newData.password, newData.fechaderegistro, newData.nivel_usuario, userId]);
    return true; // La actualización fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la actualización
  } finally {
    if (conn) conn.release();
  }
});

ipcMain.handle('get-user-data', async (event, userId) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const [userData] = await conn.query('SELECT Nombrecompleto, Telefono ,user, password , fechaderegistro ,nivel_usuario FROM usuarios WHERE id_usuario = ?', [userId]);
    return userData; // Devuelve los datos del usuario
  } catch (error) {
    console.error(error);
    return null; // Ocurrió un error al obtener los datos del usuario
  } finally {
    if (conn) conn.release();
  }
});


//REPARACIONES 

//GUARDAR
ipcMain.handle('save-repara', async (event, reparaciones) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const queryInsert = await conn.query('INSERT INTO reparaciones (nombre,contacto,correo,motivo,marcaomodelo,coddesblo,accesorio,imei,recibido,estado,costoestimado,falla,presupuesto,fecha,hora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [reparaciones.nombre, reparaciones.contacto, reparaciones.correo, reparaciones.motivo, reparaciones.marcaomodelo,
      reparaciones.coddesblo, reparaciones.accesorio, reparaciones.imei, reparaciones.recibido, reparaciones.estado, reparaciones.costoestimado,
      reparaciones.falla, reparaciones.presupuesto, reparaciones.fecha, reparaciones.hora]);
    if (queryInsert) {
      const querySelect = await conn.query('SELECT * FROM reparaciones WHERE id_repa = ? ', [queryInsert.insertId]);

      return querySelect; // Retorna el usuario de la BD
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

//listar usuarios
ipcMain.handle('pull-repa', async (event, usuario) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM reparaciones');
    if (rows) {
      return rows; // Retorna el primer registro encontrado
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});

//eliminar reparaciones

ipcMain.handle('delete-repa', async (event, repaId) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM reparaciones WHERE id_repa = ?', [repaId]);
    return true; // La eliminación fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la eliminación
  } finally {
    if (conn) conn.release();
  }
});

//actualizar

ipcMain.handle('update-repa', async (event, repaId, newData) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('UPDATE reparaciones SET  nombre = ?, contacto = ? ,correo = ?, motivo = ? ,marcaomodelo = ? ,coddesblo = ? ,accesorio = ? ,imei = ? ,recibido = ? ,estado = ? ,costoestimado = ? ,falla = ? ,presupuesto = ? ,fecha = ? ,hora = ? WHERE id_repa = ?', [newData.nombre, newData.contacto, newData.correo, newData.motivo, newData.marcaomodelo, newData.coddesblo, newData.accesorio, newData.imei, newData.recibido, newData.estado, newData.costoestimado, newData.falla, newData.presupuesto, newData.fecha, newData.hora, repaId]);
    return true; // La actualización fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la actualización
  } finally {
    if (conn) conn.release();
  }
});

ipcMain.handle('get-repa-data', async (event, repaId) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const [userData] = await conn.query('SELECT nombre,contacto,correo,motivo,marcaomodelo,coddesblo,accesorio,imei,recibido,estado,costoestimado,falla,presupuesto,fecha,hora FROM reparaciones WHERE id_repa = ?', [repaId]);
    return userData; // Devuelve los datos del usuario
  } catch (error) {
    console.error(error);
    return null; // Ocurrió un error al obtener los datos del usuario
  } finally {
    if (conn) conn.release();
  }
});


//intento 
ipcMain.handle('save-int', async (event, prueba) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const queryInsert = await conn.query('INSERT INTO prueba (che,xd) VALUES (?,?)',
      [prueba.che, prueba.xd]);
    if (queryInsert) {
      const querySelect = await conn.query('SELECT * FROM prueba WHERE id_prueba = ? ', [queryInsert.insertId]);

      return querySelect; // Retorna el usuario de la BD
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});


//eliminar distribuidores

ipcMain.handle('delete-dis', async (event, disId) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM distribuidor WHERE id_dis = ?', [disId]);
    return true; // La eliminación fue exitosa
  } catch (error) {
    //console.error(error);
    return false; // Ocurrió un error durante la eliminación
  } finally {
    if (conn) conn.release();
  }
});

//actualizar

ipcMain.handle('update-dis', async (event, disId, newData) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query('UPDATE distribuidor SET nombre = ? , direccion = ?,telefono = ?,codigo = ?,nombreem = ?,direcem = ?,teleem = ?,celulares = ?,fundas = ?,bocinas = ?,audifonos = ?,micas = ?,cargadores = ?,otros = ?  WHERE id_dis = ?',
      [newData.nombre, newData.direccion, newData.telefono, newData.codigo, newData.nombreem, newData.direcem, newData.teleem, newData.celulares, newData.fundas, newData.bocinas, newData.audifonos, newData.micas, newData.cargadores, newData.otros, disId]);
    return true; // La actualización fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la actualización
  } finally {
    if (conn) conn.release();
  }
});

ipcMain.handle('get-dis-data', async (event, disId) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const [userData] = await conn.query('SELECT nombre, direccion,telefono,codigo,nombreem,direcem,teleem,celulares,fundas,bocinas,audifonos,micas,cargadores,otros FROM distribuidor  WHERE id_dis = ?', [disId]);
    return userData; // Devuelve los datos del usuario
  } catch (error) {
    console.error(error);
    return null; // Ocurrió un error al obtener los datos del usuario
  } finally {
    if (conn) conn.release();
  }
});



/*===============================================*/
/*================= Credito =====================*/
/*===============================================*/

//intento 
ipcMain.handle('save-credit', async (event, infoCredit) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const queryClient = await conn.query('SELECT * FROM clientes WHERE id_cli = ?', [infoCredit.cliente.id_cli])
    const queryclienteCompra = await conn.query('INSERT INTO cliente_compra(id_cliente, nombre, apellidos, direccion, tel) VALUES (?,?,?,?,?)',
      [queryClient[0].id_cli, queryClient[0].nombre, queryClient[0].apellidos, queryClient[0].direccion, queryClient[0].tel]);

    const queryCredit = await conn.query('INSERT INTO credit (id_cliente_compra, meses, intereses, pago_al_mes, abono_inicial, total, estado) VALUES (?,?,?,?,?,?,?)',
      [queryclienteCompra.insertId, infoCredit.meses, infoCredit.interes, infoCredit.abono, infoCredit.abono, infoCredit.total, 'ADEUDO']);

    if (queryCredit) {

      infoCredit.products.forEach(async p => {
        if (p.imei) {

          await conn.query('INSERT INTO detalle_credit(id_credit, id_product, cantidad, preciocompra, precioventa, descuento, descripcion, imei) VALUES (?,?,?,?,?,?,?,?)',
            [queryCredit.insertId, p.id, p.cantidad, p.preciocompra, p.precio, p.descuento, p.descripcion, p.imei]);

          await conn.query('UPDATE productos SET stock=stock-1 WHERE id_product=?', [p.id]);


        } else {

          await conn.query('INSERT INTO detalle_credit(id_credit, id_product, cantidad, preciocompra, precioventa, descuento, descripcion) VALUES (?,?,?,?,?,?,?)',
            [queryCredit.insertId, p.id, p.cantidad, p.preciocompra, p.precio, p.descuento, p.descripcion]);

          await conn.query('UPDATE productos SET stock=stock-? WHERE id_product=?', [p.cantidad, p.id]);
        }

      });

      return true
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }

});




ipcMain.handle('get-credits', async () => {
  let conn;

  try {
    conn = await pool.getConnection();

    const query = await conn.query(`
        SELECT
            cc.nombre AS NombreCliente,
            cc.apellidos AS ApellidosCliente,
            c.id_credit,
            c.meses,
            c.total,
            c.estado,
            c.pago_al_mes,
            dc.cantidad,
            dc.descripcion
        FROM
            credit c
        INNER JOIN
            cliente_compra cc ON c.id_cliente_compra = cc.id_cliente_compra
        LEFT JOIN
            detalle_credit dc ON c.id_credit = dc.id_credit
    `);

    // Estructurar los resultados en un arreglo
    const creditInfo = []; // Un arreglo para almacenar la información de crédito
    
    query.forEach(row => {
        const creditId = row.id_credit;
        const existingCredit = creditInfo.find(credit => credit.id_credit === creditId);
    
        // Si es la primera vez que encontramos este crédito, creamos un objeto para él
        if (!existingCredit) {
            const newCredit = {
                id_credit: row.id_credit,
                meses: row.meses,
                total: row.total,
                estado: row.estado,
                pago_al_mes: row.pago_al_mes,
                cliente: {
                    nombre: row.NombreCliente,
                    apellidos: row.ApellidosCliente
                },
                detalle_credit: [], // Un array para los detalles de crédito
            };
            creditInfo.push(newCredit);
        }
    
        // Agregamos los detalles de crédito si están presentes
        if (row.descripcion) {
            const detalle = {
                cantidad: row.cantidad,
                descripcion: row.descripcion,
            };
            creditInfo[creditInfo.length-1].detalle_credit.push(detalle);
        }
    });
    
    // Ahora creditInfo contiene la información de crédito con detalles en un arreglo
    
    return creditInfo;

  } catch (error) {
    console.error(error);
    return null; // Ocurrió un error al obtener los datos del usuario
  } finally {
    if (conn) conn.release();
  }
});



ipcMain.handle('get-credit', async (event, credit) => {
  console.log('========================');
  let conn;

  try {
    conn = await pool.getConnection();

    const query = await conn.query(`
      SELECT
        cc.nombre AS NombreCliente,
        cc.apellidos AS ApellidosCliente,
        cc.direccion,
        cc.tel,
        c.id_credit,
        c.meses,
        c.total,
        c.estado,
        c.pago_al_mes,
        dc.id_product,
        dc.cantidad,
        dc.precioventa,
        dc.descuento,
        dc.descripcion,
        dc.imei,
        p.articulos,
        p.codigo,
        p.descripcion AS descripcion_producto,
        bc.id_bonos_credit,
        bc.pago,
        bc.fecha,
        bc.fecha_bono
      FROM
        credit c
      INNER JOIN
        cliente_compra cc ON c.id_cliente_compra = cc.id_cliente_compra
      LEFT JOIN
        detalle_credit dc ON c.id_credit = dc.id_credit
      LEFT JOIN
        productos p ON dc.id_product = p.id_product
      LEFT JOIN
        bonos_credit bc ON c.id_credit = bc.id_credit
      WHERE
        c.id_credit = ${credit}`);
    
    //const results = query[0]; // Los resultados de la consulta se encuentran en el primer elemento del array
    
    // Ahora vamos a estructurar los resultados en un arreglo
    
    const creditInfo = []; // Un arreglo para almacenar la información de crédito

    query.forEach(row => {
        const creditId = row.id_credit;
        const existingCredit = creditInfo.find(credit => credit.id_credit === creditId);
    
        // Si es la primera vez que encontramos este crédito, creamos un objeto para él
        if (!existingCredit) {
            const newCredit = {
                id_credit: row.id_credit,
                meses: row.meses,
                total: row.total,
                estado: row.estado,
                pago_al_mes: row.pago_al_mes,
                cliente: {
                    nombre: row.NombreCliente,
                    apellidos: row.ApellidosCliente,
                    direccion: row.direccion,
                    tel: row.tel
                },
                detalle_credit: [], // Un array para los detalles de crédito
                bonos_credit: [] // Un array para los bonos de crédito
            };
            creditInfo.push(newCredit);
        }

        // Agregamos los detalles de crédito si están presentes
        if (!(creditInfo[0].detalle_credit.find(detalle => detalle.id_product == row.id_product))) {
            const detalle = {
                id_product: row.id_product,
                cantidad: row.cantidad,
                precioventa: row.precioventa,
                descuento: row.descuento,
                descripcion: row.descripcion,
                imei: row.imei,
                articulos: row.articulos,
                codigo: row.codigo,
                descripcion_producto: row.descripcion_producto
            };
            creditInfo[creditInfo.length-1].detalle_credit.push(detalle);
        }
    

        // Agregamos los bonos de crédito si están presentes
        if (!(creditInfo[0].bonos_credit.find(bono => bono.id == row.id_bonos_credit))) {
            const bono = {
                id : row.id_bonos_credit,
                pago: row.pago,
                fecha: row.fecha,
                fecha_bono: row.fecha_bono
            };
            creditInfo[creditInfo.length-1].bonos_credit.push(bono);
        }
      });
    // Ahora creditInfo contiene la información de crédito con detalles y bonos anidados en un arreglo

    return creditInfo;

  } catch (error) {
    console.error(error);
    return null; // Ocurrió un error al obtener los datos del usuario
  } finally {
    if (conn) conn.release();
  }
});


ipcMain.handle('pago_mes', async (event, idBono) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query(`UPDATE bonos_credit SET fecha_bono = DATE_FORMAT(NOW(), '%Y-%m-%d %T') WHERE id_bonos_credit = ?`, [ idBono ]);
    return true; // La actualización fue exitosa
  } catch (error) {
    console.error(error);
    return false; // Ocurrió un error durante la actualización
  } finally {
    if (conn) conn.release();
  }
});

/*===============================================*/
/*================= Apartado =====================*/
/*===============================================*/

//intento 
ipcMain.handle('save-apartado', async (event, infoCredit) => {
  let conn;

  console.log('infoCredit :>> ', infoCredit);

  try {
    conn = await pool.getConnection();

    const queryClient = await conn.query('SELECT * FROM clientes WHERE id_cli = ?', [infoCredit.cliente.id_cli])
    const queryclienteCompra = await conn.query('INSERT INTO cliente_compra(id_cliente, nombre, apellidos, direccion, tel) VALUES (?,?,?,?,?)',
      [queryClient.id_cli, queryClient.nombre, queryClient.apellidos, queryClient.direccion, queryClient.tel]);

    const queryCredit = await conn.query('INSERT INTO credit (id_cliente_compra, meses, intereses, pago_al_mes, abono_inicial, total, estado) VALUES (?,?,?,?,?,?,?)',
      [queryclienteCompra.insertId, infoCredit.meses, infoCredit.interes, infoCredit.abono, infoCredit.abono, infoCredit.total, 'adeudo']);

    if (queryCredit) {

      infoCredit.products.forEach(async p => {
        if (p.imei) {

          await conn.query('INSERT INTO detalle_credit(id_credit, id_product, cantidad, preciocompra, precioventa, descuento, descripcion, imei) VALUES (?,?,?,?,?,?,?,?)',
            [queryCredit.insertId, p.id, p.cantidad, p.preciocompra, p.precio, p.descuento, p.descripcion, p.imei]);

          await conn.query('UPDATE productos SET stock=stock-1 WHERE id_product=?', [p.id]);


        } else {

          await conn.query('INSERT INTO detalle_credit(id_credit, id_product, cantidad, preciocompra, precioventa, descuento, descripcion) VALUES (?,?,?,?,?,?,?)',
            [queryCredit.insertId, p.id, p.cantidad, p.preciocompra, p.precio, p.descuento, p.descripcion]);

          await conn.query('UPDATE productos SET stock=stock-? WHERE id_product=?', [p.cantidad, p.id]);
        }

        return true;
      });

    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }

});


ipcMain.handle('get-apartados', async (event, credit) => {
  let conn;


  try {
    conn = await pool.getConnection();

    const credits = await conn.query(`SELECT
    cc.nombre AS NombreCliente,
    cc.apellidos AS ApellidosCliente,
    c.id_credit,
    c.meses,
    c.total,
    c.estado,
    dc.descripcion AS DescripcionDetalleCredit,
    bc.pago,
    bc.fecha,
    bc.fecha_abono
    FROM
        credit c
    INNER JOIN
        cliente_compra cc ON c.id_cliente_compra = cc.id_cliente_compra
    LEFT JOIN
        detalle_credit dc ON c.id_credit = dc.id_credit
    LEFT JOIN
        bonos_credit bc ON c.id_credit = bc.id_credit`);

    console.log('credits :>> ', credits);
    return credits; // Devuelve los datos del usuario
  } catch (error) {
    console.error(error);
    return null; // Ocurrió un error al obtener los datos del usuario
  } finally {
    if (conn) conn.release();
  }
});