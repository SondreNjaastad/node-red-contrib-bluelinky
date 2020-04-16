const BlueLinky = require('bluelinky');

let client;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = function(RED) {
    function GetVehicleStatus(config) {
        RED.nodes.createNode(this,config);
        this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
        var node = this;
        node.on('input', async function(msg) {
            try{
                await client.enterPin();
                let car = await client.getVehicle(this.bluelinkyConfig.vin);
                let status = await car.status(true);
                node.send({
                    payload: {
                        status,
                        odometer: car.odometer,
                        location: car.location
                    }
                });
            } catch (err){
                node.send({
                    payload: err
                })
            }
        });
    }

    function Unlock(config) {
        RED.nodes.createNode(this,config);
        this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
        var node = this;
        node.on('input', async function(msg) {
            try{
                await client.enterPin();
                await client.getVehicles();
                let car = await client.getVehicle(this.bluelinkyConfig.vin);
                let result = await car.unlock();
                node.send({
                    payload: result
                });
            } catch (err){
                node.send({
                    payload: err
                })
            }
        });
    }

    function Location(config) {
        RED.nodes.createNode(this,config);
        this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
        var node = this;
        node.on('input', async function(msg) {
            try{
                await client.enterPin();
                await client.getVehicles();
                let car = await client.getVehicle(this.bluelinkyConfig.vin);
                await car.status(true);
                node.send({
                    payload: car.location
                });
            } catch (err){
                node.send({
                    payload: err
                })
            }
        });
    }

    function Odometer(config) {
        RED.nodes.createNode(this,config);
        this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
        var node = this;
        node.on('input', async function(msg) {
            try{
                await client.enterPin();
                await client.getVehicles();
                let car = await client.getVehicle(this.bluelinkyConfig.vin);
                await car.status(true);
                node.send({
                    payload: car.odometer
                });
            } catch (err){
                node.send({
                    payload: err
                })
            }
        });
    }

    function Start(config) {
        RED.nodes.createNode(this,config);
        this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
        var node = this;
        node.on('input', async function(msg) {
            try{
                await client.enterPin();
                let car = await client.getVehicle(this.bluelinkyConfig.vin);
                let result = await car.start(msg.payload);
                node.send({
                    payload: result
                });
            } catch (err){
                node.send({
                    payload: err
                })
            }
        });
    }

    function Stop(config) {
        RED.nodes.createNode(this,config);
        this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
        var node = this;
        node.on('input', async function(msg) {
            try{
                await client.enterPin();
                let car = await client.getVehicle(this.bluelinkyConfig.vin);
                let result = await car.stop(msg.payload);
                node.send({
                    payload: result
                });
            } catch (err){
                node.send({
                    payload: err
                })
            }
        });
    }

    function Lock(config) {
        RED.nodes.createNode(this,config);
        this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
        var node = this;
        node.on('input', async function(msg) {
            try{
                await client.enterPin();
                let car = await client.getVehicle(this.bluelinkyConfig.vin);
                let result = await car.lock();
                node.send({
                    payload: result
                });
            } catch (err){
                node.send({
                    payload: err
                })
            }
        });
    }

    function BluelinkyNode(n) {
        RED.nodes.createNode(this,n);
        this.username = n.username;
        this.password = n.password;
        this.region = n.region;
        this.pin = n.pin;
        this.deviceUuid = uuidv4();
        this.vin = n.vin;

        client = new BlueLinky({
            username: this.username,
            password: this.password,
            region: this.region,
            pin: this.pin,
            deviceUuid: this.deviceUuid,
        });
    }

    RED.nodes.registerType("bluelinky", BluelinkyNode);
    RED.nodes.registerType("car-status", GetVehicleStatus);
    RED.nodes.registerType("unlock-car", Unlock);
    RED.nodes.registerType("lock-car", Lock);
    RED.nodes.registerType("car-odometer", Odometer);
    RED.nodes.registerType("car-location", Location);
    RED.nodes.registerType("start-car", Start);
    RED.nodes.registerType("stop-car", Stop);
}