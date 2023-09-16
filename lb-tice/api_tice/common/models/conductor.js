'use strict';

module.exports = function(Conductor) {

        //conductores por genero
        Conductor.countByGenero = (cb) => {
            var ds = Conductor.dataSource
            var sql = `
            select genero, count(*) cantidad
            from conductor
            group by genero;
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
