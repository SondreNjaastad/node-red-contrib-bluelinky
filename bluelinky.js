const BlueLinky = require('bluelinky');

let client;
let clientReady = false;

module.exports = function (RED) {
  function GetVehicleStatus(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    const node = this;

    node.on('input', async function (msg) {
      try {
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const status = await car.status(config.refresh);
        node.send({
          payload: {
            status,
          },
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function Unlock(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    const node = this;
    node.on('input', async function (msg) {
      try {
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.unlock();
        node.send({
          payload: result,
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function Location(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    const node = this;
    node.on('input', async function (msg) {
      try {
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        await car.status(true);
        node.send({
          payload: car.location,
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function Odometer(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    const node = this;
    node.on('input', async function (msg) {
      try {
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        await car.status(true);
        node.send({
          payload: car.odometer,
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function Start(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    const node = this;
    node.on('input', async function (msg) {
      try {
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.start(msg.payload);
        node.send({
          payload: result,
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function Stop(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    const node = this;
    node.on('input', async function (msg) {
      try {
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.stop(msg.payload);
        node.send({
          payload: result,
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function Lock(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    const node = this;
    node.on('input', async function (msg) {
      try {
        let car = await client.getVehicle(this.bluelinkyConfig.vin);
        let result = await car.lock();
        node.send({
          payload: result,
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function BluelinkyNode(config) {
    RED.nodes.createNode(this, config);
    this.username = config.username;
    this.password = config.password;
    this.region = config.region;
    this.pin = config.pin;
    this.vin = config.vin;

    client = new BlueLinky({
      username: this.username,
      password: this.password,
      region: this.region,
      pin: this.pin,
    });

    client.on('ready', () => {
      // we have logged in and have access to API now
      // how do we make sure nodes wait until the client is ready?
      clientReady = true;
      console.log('client ready');
    });
  }

  RED.nodes.registerType('bluelinky', BluelinkyNode);
  RED.nodes.registerType('car-status', GetVehicleStatus);
  RED.nodes.registerType('unlock-car', Unlock);
  RED.nodes.registerType('lock-car', Lock);
  RED.nodes.registerType('car-odometer', Odometer);
  RED.nodes.registerType('car-location', Location);
  RED.nodes.registerType('start-car', Start);
  RED.nodes.registerType('stop-car', Stop);
};
