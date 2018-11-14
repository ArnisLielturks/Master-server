# Master-server
NodeJS master server

##How to run it:
```
npm install

nodejs app.js
```

## Methods

### List servers

```
localhost:4000/
```

Response:
```
[
    {
        guid: "413410239874",
        state: "1",
        peers: "13",
        id: 1,
        lastUpdate: 1542200139951
    }
]
```


### Get first open server
```
localhost:4000/open
```

Response:
```
{
        guid: "413410239874",
        state: "1",
        peers: "13",
        id: 1,
        lastUpdate: 1542200139951
    }
```

### Create new server
If server list already contains a record with the same GUID, it will be updated
```
localhost:4000/new?guid=123&state=2&peers=3
```

### Delete existing server
Server with the same GUID will be deleted
```
localhost:4000/delete?guid=123
```