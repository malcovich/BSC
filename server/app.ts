import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as cheerio from 'cheerio';

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

app.get('/scrape', function(req, res){
  // The URL we will scrape from - in our example Anchorman 2.

  
})

mongoose.Promise = global.Promise;
const mongodb = mongoose.connect(mongodbURI);

mongodb
  .then((db) => {
    console.log('Connected to MongoDB on', db.host + ':' + db.port);

    setRoutes(app);

    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => {
        console.log('Angular Full Stack listening on port ' + app.get('port'));
      });
    }

  })
  .catch((err) => {
    console.error(err);
});

export { app };
