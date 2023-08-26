'use strict';

module.exports = function(Tarjeta) {
    Tarjeta.countTarjetaMes = (cb) => {
        var ds = Tarjeta.dataSource
        var sql = `
        SELECT monthname(fecha_inicio) mes, count(id) cantidad 
        FROM tarjeta 
        WHERE year(fecha_inicio) = year(now()) GROUP BY mes order by month(fecha_inicio); 
        `;

        ds.connector.query(sql, (err, instance) => {
            if (err) console.error(err);
            //pubsub.publish('/Pedidoreporte/GET', instance);
            cb(err, instance);
        })
    }
    
    Tarjeta.remoteMethod(
        'countTarjetaMes',
        {
            http: { verb: 'get' },
            accepts: [
            ],
            description:'Devuelve la cantidad de tarjetas registradas por mes de la gestion actual',
            returns: { arg: 'data', type: ['any'], root: true }
        }
    )
};


