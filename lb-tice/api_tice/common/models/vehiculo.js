const axios = require('axios');
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

        ////
        Vehiculo.getExternalData = async (dato, cb) => {
            const res = await axios.post('https://services.policia.bo/v1/vehiculo',dato,{
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaXNzIjoiYnhBRmlzVEJzcmM5NXdLWFdJcDNISHFIQmtTOTExZ2EifQ.QwdVtQlfwIGPYnul_rHdwlJNCrIWPhtBGghWml1gYXQ`
              }
            });
            return res.data;
        }
    
        Vehiculo.remoteMethod(
            'getExternalData',
            {
                http: { verb: 'post', path:'/getExternalData'},
                //accepts: { arg: 'idConductor', type: 'string' },
                accepts: [{ arg: 'dato', type: "any", http: { source: "body" } }],
                returns: { arg: 'data', type: 'any', root: true },
                description:"Devuelve el vehiculo desde el servicio de itv"
            }
        )
};
