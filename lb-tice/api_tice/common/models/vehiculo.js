'use strict';

module.exports = function(Vehiculo) {
        //devuelve ultimo id para asignar codigo a conductor
        Vehiculo.ultimoID = (cb) => {
            var ds = Vehiculo.dataSource
            var sql = `
            SELECT id FROM vehiculo order by id desc limit 1;
            `;
    
            ds.connector.query(sql, (err, instance) => {
                if (err) console.error(err);
                //pubsub.publish('/Pedidoreporte/GET', instance);
                cb(err, instance);
            })
        }
        
        Vehiculo.remoteMethod(
            'ultimoID',
            {
                http: { verb: 'get' },
                accepts: [
                ],
                returns: { arg: 'data', type: ['any'], root: true },
                description : 'Devuelve el último id registrado'
            }
        )

        //devuelve la cantidad de vehiculos por tipo de servicio
        Vehiculo.cantTipoServ = (cb) => {
            var ds = Vehiculo.dataSource
            var sql = `
            select tipo, count(id) cantidad
            from vehiculo
            group by tipo;
            `;
    
            ds.connector.query(sql, (err, instance) => {
                if (err) console.error(err);
                //pubsub.publish('/Pedidoreporte/GET', instance);
                cb(err, instance);
            })
        }
        
        Vehiculo.remoteMethod(
            'cantTipoServ',
            {
                http: { verb: 'get' },
                accepts: [
                ],
                returns: { arg: 'data', type: ['any'], root: true },
                description : 'Devuelve la cantidad de vehiculos por tipo de servicio'
            }
        )
};
