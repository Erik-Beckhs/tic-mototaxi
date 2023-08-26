'use strict';

module.exports = function(Userdata) {
    Userdata.getUserCustom = (id, cb) => {
        var ds = Userdata.dataSource
        var sql = `
        SELECT ud.id, ud.nombres, ud.apellidos, ud.grado, ud.state, u.username, u.email, ud.id_user
        FROM user_data ud inner join user u on u.id = ud.id_user
        WHERE id_user = '${id}'
        `;

        ds.connector.query(sql, (err, instance) => {
            if (err) console.error(err);
            cb(err, instance);
        })
    }
    
    Userdata.remoteMethod(
        'getUserCustom',
        {
            http: { verb: 'get' },
            accepts: { arg: 'id', type: 'number' },
            description:'Devuelve la data del usuario, dado el id_user',
            returns: { arg: 'data', type: ['any'], root: true }
        }
    )

    //devuelve el listado personalizado de usuarios
    Userdata.users_list = (cb) => {
        var ds = Userdata.dataSource
        var sql = `
        select ud.id, ud.nombres, ud.apellidos, ud.grado, ud.state estado, u.username, u.email, ud.rol, ud.id_user
        from user_data ud left join user u on ud.id_user = u.id;
        `;

        ds.connector.query(sql, (err, instance) => {
            if (err) console.error(err);
            cb(err, instance);
        })
    }
    
    Userdata.remoteMethod(
        'users_list',
        {
            http: { verb: 'get' },
            accepts: [
            ],
            description:'Devuelve el listado de usuarios customizado',
            returns: { arg: 'data', type: ['any'], root: true }
        }
    )

    //elimina el registro en la tablas de usuario user_data y user
    Userdata.deleteUser = (id, cb) => {
        var ds = Userdata.dataSource
        var sql = `
        delete from user where id = ${id};
        `;

        ds.connector.query(sql, (err, instance) => {
            if (err) console.error(err);
            cb(err, instance);
        })
    }
    
    Userdata.remoteMethod(
        'deleteUser',
        {
            http: { verb: 'delete' },
            accepts: { arg: 'id', type: 'number' },
            description:'Elimina el registro de usuario en las tablas user y user_data',
            returns: { arg: 'data', type: ['any'], root: true }
        }
    )
};
