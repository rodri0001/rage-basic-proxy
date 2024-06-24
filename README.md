# ragemp-simple-proxy

Simple Proxy server for RAGE:Multiplayer. Creates UDP and TCP proxies for game and file servers of RAGE.

# Installation:

- Clone sources: `git clone https://github.com/rodri0001/rage-simple-proxy`
- Install **yarn** (if still not installed): `npm install --global yarn`
- Install dependencies: `yarn`
- Configure: [Configuration](#configuration)
- Run: `yarn start` or `yarn start:dev`

# Configuration:

### Client Configuration

In some cases `RAGE Server` also sends packet with `Real IP of Server` and if it doesn't match client closes the connection, to avoid this we can create recording in `hosts` file on client to connect to real server address but it will `redirect to Proxy IP`.

- Open `C:/Windows/System32/drivers/etc/hosts`
- Create new recording: `ProxyIP ServerIP` `(example: 127.0.0.1 server1.rodritest.com)`

### Proxy Configuration

Configuration file: `config.js`

- `LocalIP`: Local proxy server IP address, `0.0.0.0` - binds to all available IPs.
- `GameIP`: IP address of server do you want to connect to.
- `TcpPort`: TCP (files) port of server, by default in RageMP it's `UDP port + 1`
- `UdpPort`: UDP (game) port of server, by default in RageMP it's `22005`
- `ShowMessageContent`: Show `HEX` content of every message that seed/peer sends.
