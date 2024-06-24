import UdpProxy from 'udp-proxy'
import TcpProxy from 'node-tcp-proxy'
import config from './config.js'

TcpProxy.createProxy(config.TcpPort, config.GameIP, config.TcpPort, {
  hostname: config.LocalIP
})

console.log(
  `[TCP] ${config.LocalIP}:${config.TcpPort} -> ${config.GameIP}:${config.TcpPort} Proxy Baslatiliyor`
)

const udpServer = UdpProxy.createServer({
  address: config.GameIP,
  port: config.UdpPort,
  ipv6: false,
  localaddress: config.LocalIP,
  localport: config.UdpPort,
  localipv6: false,
  proxyaddress: '',
  timeOutTime: 10000
})

console.log(
  `[UDP] ${config.LocalIP}:${config.UdpPort} -> ${config.GameIP}:${config.UdpPort} Proxy Baslatiliyor`
)

udpServer.on('bound', details => {
  console.log(
    `[UDP] ${details.peer.address}:${details.peer.port} (${details.peer.size}b) -> PROXY -> ${details.target.address}:${details.target.port} Proxy Baglanti Kuruyor..`
  )
})

udpServer.on('[UDP] Hata', error => console.log(error))

udpServer.on('message', (message, sender) => {
  console.log(
    `[UDP] ${sender.address}:${sender.port} (${Buffer.byteLength(message)}b) Baglanamadi..`
  )

  if (config.ShowMessageContent)
    console.log(
      `HEX:    ${message
        .toString('hex')
        .match(/.{1,2}/g)
        .join(' ')
        .match(/.{1,32}/g)
        .join('\n\t')}`
    )
})

udpServer.on('proxyMsg', (message, sender, peer) => {
  console.log(
    `[UDP] ${peer.address}:${peer.port} (${Buffer.byteLength(message)}b)`
  )

  if (config.ShowMessageContent)
    console.log(
      `HEX:    ${message
        .toString('hex')
        .match(/.{1,2}/g)
        .join(' ')
        .match(/.{1,32}/g)
        .join('\n\t')}`
    )
})

udpServer.on('proxyClose', peer => {
  console.log(`[UDP] ${peer.address}:${peer.port} Baglanti Kesildi..`)
})

udpServer.on('proxyError', err => {
  console.log('[UDP] Proxy Baglanti Kuramiyor' + err)
})
