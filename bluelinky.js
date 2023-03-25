const BlueLinky = require('bluelinky');
const EventEmitter = require('events');

const State = new EventEmitter();
let client;

module.exports = function (RED) {
  function GetVehicleStatus(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const status = await car.status({
          refresh: config.dorefresh,
          parsed: config.parsed,
        });
        node.send({
          payload: status,
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function GetFullVehicleStatus(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const status = await car.fullStatus({
          refresh: config.dorefresh,
        });
        node.send({
          payload: status,
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
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        this.status(this.bluelinkyConfig.status);
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

  function StartCharge(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        this.status(this.bluelinkyConfig.status);
        const result = await car.startCharge();
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

  function StopCharge(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        this.status(this.bluelinkyConfig.status);
        const result = await car.stopCharge();
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
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        this.status(this.bluelinkyConfig.status);
        const result = await car.location();
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

  function Odometer(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;

    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.odometer();
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

  function Start(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
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
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
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
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.lock();
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

  function SetChargeTargets(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.setChargeTargets(msg.payload);
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

  function GetChargeTargets(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const limits = await car.getChargeTargets();
        node.send({
          payload: limits,
        });
      } catch (err) {
        node.send({
          payload: err,
        });
      }
    });
  }

  function SetNavigation(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;
    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.setNavigation(msg.payload);
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

  function GetMonthlyReport(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;

    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.monthlyReport();
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

  function GetTripInfo(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;

    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.tripInfo(msg.payload);
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

  function GetDriveHistory(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.status(this.bluelinkyConfig.status);
    this.connected = false;
    const node = this;

    State.on('changed', (statusObject) => {
      this.status(statusObject);
      if (statusObject.text === 'Ready') {
        this.connected = true;
      }
    });
    node.on('input', async function (msg) {
      try {
        if (!this.connected) {
          return null;
        }
        await client.getVehicles();
        const car = await client.getVehicle(this.bluelinkyConfig.vin);
        const result = await car.driveHistory(msg.payload);
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

  function Login(config) {
    RED.nodes.createNode(this, config);
    this.bluelinkyConfig = RED.nodes.getNode(config.bluelinky);
    this.on('input', async function (msg) {
      State.emit('changed', { fill: 'grey', shape: 'ring', text: 'Logging in...' });
      client.login();
    });
  }

  function BluelinkyNode(config) {
    RED.nodes.createNode(this, config);
    this.username = config.username;
    this.password = config.password;
    this.region = config.region;
    this.pin = config.pin;
    this.vin = config.vin;
    this.brand = config.brand;
    this.language = config.language;
    this.status = { fill: 'grey', shape: 'ring', text: 'Logging in...' };
    State.emit('changed', this.status);

    client = new BlueLinky({
      username: this.username,
      password: this.password,
      region: this.region,
      pin: this.pin,
      brand: this.brand,
      language: this.language
    });

    client.on('ready', () => {
      // we have logged in and have access to API now
      // how do we make sure nodes wait until the client is ready?
      this.status = { fill: 'green', shape: 'ring', text: 'Ready' };
      State.emit('changed', this.status);
    });

    client.on('error', () => {
      this.status = { fill: 'red', shape: 'ring', text: 'Error' };
      State.emit('changed', this.status);
    });
  }

  RED.nodes.registerType('bluelinky', BluelinkyNode);
  RED.nodes.registerType('login', Login);
  RED.nodes.registerType('car-status', GetVehicleStatus);
  RED.nodes.registerType('car-fullstatus', GetFullVehicleStatus);
  RED.nodes.registerType('unlock-car', Unlock);
  RED.nodes.registerType('lock-car', Lock);
  RED.nodes.registerType('car-odometer', Odometer);
  RED.nodes.registerType('car-location', Location);
  RED.nodes.registerType('start-car', Start);
  RED.nodes.registerType('stop-car', Stop);
  RED.nodes.registerType('start-charge', StartCharge);
  RED.nodes.registerType('stop-charge', StopCharge);
  RED.nodes.registerType('set-chargetargets', SetChargeTargets);
  RED.nodes.registerType('get-chargetargets', GetChargeTargets);
  RED.nodes.registerType('set-navigation', SetNavigation);
  RED.nodes.registerType('get-monthlyreport', GetMonthlyReport);
  RED.nodes.registerType('get-tripinfo', GetTripInfo);
  RED.nodes.registerType('get-drivehistory', GetDriveHistory);
};
