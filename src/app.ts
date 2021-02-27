import { Route } from 'core/interfaces';
import express from 'express';
import mongoose from 'mongoose';

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
      this.connectToDatabase();
    });
  }

  private connectToDatabase(){
   try {
     const connection  = process.env.MONGO_URI;
     if(!connection)
     {
       console.log('Connection string is invalid');
       return;
     }
      mongoose.connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
      console.log('Database connected');
    } catch (error) {
      console.log('Database error');
    }
  }
}

export default App;