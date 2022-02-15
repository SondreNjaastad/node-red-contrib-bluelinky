# node-red-contrib-bluelinky
A node-red flow for controlling Hyundai BlueLink vehicles powered by [bluelinky](https://github.com/Hacksore/bluelinky)

[![npm](https://img.shields.io/npm/v/node-red-contrib-bluelinky.svg)](https://www.npmjs.com/package/node-red-contrib-bluelinky)
[![Discord](https://img.shields.io/discord/652755205041029120)](https://discord.gg/HwnG8sY)

![Sample](https://i.imgur.com/eUhFjxq.png)

## Install
```sh
npm install node-red-contrib-bluelinky
```

## Documentation
There are no offical docs for this project but checkout out the [bluelinky-docs](https://hacksore.github.io/bluelinky-docs/) for more info.


Important information for login problems:
- If you experience login problems, please logout from the app on your phone and login again. You might need to ' upgrade ' your account to a generic Kia/Hyundai account, or create a new password or PIN.
- After you migrated your Bluelink account to a generic Hyundai account, or your UVO account to a generic Kia account, make sure that both accounts have the same credentials (userid and password) to avoid confusion in logging in.

## Supported Features
- Lock
- Unlock
- Start (with climate control)
- Stop
- Status

## What to do when bluelinky is updated
node-red-contrib-bluelinky will install the latest bluelinky package when it is installed. So how to update the bluelinky package when no new version of node-red-contrib-bluelinky is available?
- Export the flows that contain the bluelinky nodes (or export all of them)
- Delete these flows
- Delete the configuration node
- Remove the palette node-red-contrib-bluelinky
- Restart node-red
- Install the palette node-red-contrib-bluelinky, it will then install latest version of bluelinky as well
- Import the exported flows
- Redeploy the imported flows
