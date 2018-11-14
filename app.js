const express = require('express')
const app = express()
const port = 3000

let servers = []

// If server lastUpdate exceeds this limit, remove it from the list
const SERVER_LIFETIME = 10000;

// Find existing server based on GUID
getExisting = (guid) => {
    for (let i = 0; i < servers.length; i++) {
        if (servers[i].guid == guid) {
            return servers[i]
        }
    }

    return false
}

removeExisting = (guid) => {
    for (let i = 0; i < servers.length; i++) {
        if (servers[i].guid == guid) {
            servers.splice(i, 1);
            console.log('Removing existing server')
            return;
        }
    }
}

// Get first open server
getOpen = () => {
    for (let i = 0; i < servers.length; i++) {
        if (servers[i].state <= 1) {
            return servers[i]
        }
    }

    return {}
}

// Clear out servers which haven't been updated
clearOldServers = () => {
    let currentTime = (new Date()).getTime();
    for (let i = 0; i < servers.length; i++) {
        if (servers[i].lastUpdate < currentTime - SERVER_LIFETIME) {
            console.log('Server ' + servers[i].guid + ' no longer active, removing it');
            servers.splice(i, 1);
            i--;
        }
    }
}

//Create new server or update existing
app.get('/new', (req, res) => {
    let params = req.query
    if (params.guid && params.state && params.peers) {
        let existingServer = getExisting(params.guid)

        if (!existingServer) {
            // create new server
            let newServer = {
                guid: params.guid,
                state: params.state,
                peers: params.peers,
                id: servers.length,
                lastUpdate: (new Date()).getTime()
            }
            servers = [...servers, newServer]
            res.send(newServer);
        } else {
            // Update existing
            existingServer.state = params.state
            existingServer.peers = params.peers
            existingServer.lastUpdate = (new Date()).getTime()
            res.send(existingServer)
        }

    } else {
        res.send("{}")
    }
})

// Remove server
app.get('/delete', (req, res) => {
    removeExisting(req.query.guid)
    res.send({});
})

// Get all servers
app.get('/', (req, res) => {
    res.send(servers);
})

// get open server
app.get('/open', (req, res) => {
    res.send(getOpen());
})


setInterval(() => {
    clearOldServers();
}, 1000)

app.listen(port, () => console.log(`Master server listening on port ${port}!`))