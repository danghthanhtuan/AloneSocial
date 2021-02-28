import { Route } from '@core/interfaces';
import { Logger } from '@core/utils';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import { errorMiddleware } from '@core/middleware';


class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.production = process.env.NODE_ENV == 'production' ? true : false;

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
      this.connectToDatabase();
    });
  }

  private initializeMiddleware(){
    if(this.production){
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan('combined'));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    }else{
      this.app.use(morgan('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(errorMiddleware);
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
  }

  private connectToDatabase(){
     const connection  = process.env.MONGO_URI;
     if(!connection)
     {
      Logger.error('Connection string is invalid');     
       return;
     }
      mongoose.connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).catch((reason)=>{
      Logger.error(reason);
    });
    Logger.info('Database connected');
  }
}

export default App;