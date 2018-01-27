import pushMessage from './notifier';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
app.use( bodyParser.json() );
app.use( morgan( ':remote-addr - :remote-user :method :url :status' ) );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const previousPlayers = [];

app.post( '/notification', req => {
    console.log( 'new token: ' +  req.body.token );
    previousPlayers.push( req.body.token );
} );

app.get( '/help', () => {
    setTimeout( () => pushMessage( previousPlayers ), 30000 );
} );

app.get('/', (req, res) => res.send('Hello World!'));


app.listen( 3000, () => console.log( 'Example app listening on port 3000!' ) );
