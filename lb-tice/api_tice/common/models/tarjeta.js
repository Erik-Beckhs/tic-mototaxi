'use strict';

module.exports = function(Tarjeta) {
    Tarjeta.countTarjetaMes = (cb) => {
        var ds = Tarjeta.dataSource
        var sql = `
        
        SELECT
            m.nombre_mes AS mes,
            COALESCE(COUNT(t.id), 0) AS cantidad
         FROM
            (SELECT 1 AS nombre_mes
             UNION SELECT 2
             UNION SELECT 3
             UNION SELECT 4
             UNION SELECT 5
             UNION SELECT 6
             UNION SELECT 7
             UNION SELECT 8
             UNION SELECT 9
             UNION SELECT 10
             UNION SELECT 11
             UNION SELECT 12) AS m
         LEFT JOIN
            tarjeta t
         ON
            m.nombre_mes = MONTH(t.fecha_inicio)
         WHERE
            YEAR(t.fecha_inicio) = YEAR(NOW()) OR t.fecha_inicio IS NULL
         GROUP BY
            m.nombre_mes
         ORDER BY
            m.nombre_mes
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


