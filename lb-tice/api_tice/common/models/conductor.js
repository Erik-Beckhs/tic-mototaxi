'use strict';

module.exports = function(Conductor) {

    // Conductor.ListadoDeConductores = (cb) => {
    //     var ds = Conductor.dataSource
    //     var sql = `
    //     SELECT con.id id, concat(con.nombres, ' ',con.apellidos) nombre, con.ci ci, asoc.nombre sindicato, ve.placa placa, ve.tipo tipo, con.fecha_registro, con.expedicion, con.fotografia 
    //     FROM conductor con
    //     left join asociacion asoc on con.id_asociacion = asoc.id left join vehiculo ve on ve.id_conductor = con.id;
    //     `;

    //     ds.connector.query(sql, (err, instance) => {
    //         if (err) console.error(err);
    //         //pubsub.publish('/Pedidoreporte/GET', instance);
    //         cb(err, instance);
    //     })
    // }
    
    // Conductor.remoteMethod(
    //     'ListadoDeConductores',
    //     {
    //         http: { verb: 'get' },
    //         accepts: [
    //         ],
    //         returns: { arg: 'data', type: ['any'], root: true }
    //     }
    // )
    //devuelve ultimo id para asignar codigo a conductor
    Conductor.ultimoID = (cb) => {
        var ds = Conductor.dataSource
        var sql = `
        SELECT id FROM conductor order by id desc limit 1;
        `;

        ds.connector.query(sql, (err, instance) => {
            if (err) console.error(err);
            //pubsub.publish('/Pedidoreporte/GET', instance);
            cb(err, instance);
        })
    }
    
    Conductor.remoteMethod(
        'ultimoID',
        {
            http: { verb: 'get' },
            accepts: [
            ],
            returns: { arg: 'data', type: ['any'], root: true }
        }
    )

        //devuelve ultimo id para asignar codigo a conductor
        Conductor.countByGenero = (cb) => {
            var ds = Conductor.dataSource
            var sql = `
            select genero, count(*) cantidad
            from conductor
            group by genero;;
            `;
    
            ds.connector.query(sql, (err, instance) => {
                if (err) console.error(err);
                //pubsub.publish('/Pedidoreporte/GET', instance);
                cb(err, instance);
            })
        }
        
        Conductor.remoteMethod(
            'countByGenero',
            {
                http: { verb: 'get' },
                accepts: [
                ],
                description:'Cantidad de conductores por género',
                returns: { arg: 'data', type: ['any'], root: true }
            }
        ) 
};
