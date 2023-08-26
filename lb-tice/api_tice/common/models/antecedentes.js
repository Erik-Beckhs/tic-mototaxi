'use strict';

module.exports = function(Antecedentes) {
    Antecedentes.eliminaPorIdConductor = (objeto, cb) => {
        // console.log(idConductor);
        // return;
        var ds = Antecedentes.dataSource;
        var sql = `
        delete from antecedentes where id_conductor = ${objeto.idConductor};
        `;

        ds.connector.query(sql, (err, instance) => {
            if (err) console.error(err);
            //pubsub.publish('/Pedidoreporte/GET', instance);
            cb(err, instance);
        })
    }
    
    Antecedentes.remoteMethod(
        'eliminaPorIdConductor',
        {
            http: { verb: 'post', path:'/antecedenteConductor'},
            //accepts: { arg: 'idConductor', type: 'string' },
            accepts: [{ arg: 'objeto', type: "any", http: { source: "body" } }],
            returns: { arg: 'data', type: 'any', root: true },
            description:"Elimina los antecedentes correspondientes a un conductor"
        }
    )
};

