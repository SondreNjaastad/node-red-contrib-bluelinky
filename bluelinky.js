const BlueLinky = require('bluelinky');

const client = new BlueLinky({
    username: '',
    password: '',
    region: '',
    pin: '',
    deviceUuid: ''
});

module.exports = function(RED) {
    function GetVehicles(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async function(msg) {
            try{
                await client.enterPin();
                let cars = await client.getVehicles();
                let status = await cars[0].status(false);
                console.log(status);
                node.send({
                    payload: status
                });
            } catch (err){
                node.send({
                    payload: err
                })
            }
        });
    }
    RED.nodes.registerType("get-vehicles",GetVehicles);
}