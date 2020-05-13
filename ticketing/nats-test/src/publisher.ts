import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

// after stan (client) successfully connects to the NATS streaming server,
// it is going to emit a 'connect' event, so we listen for it
stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    // we can only publish raw data/string to NATS SS
    const data = JSON.stringify({
        id: '108',
        title: 'concert',
        price: 20
    });

    stan.publish('ticket:created', data, () => {
        console.log('Event published');
    });
});