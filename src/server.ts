import express, { Request, Response } from 'express';

const port = process.env.PORT || 5000;

const app = express();

app.get('/',(req: Request, res: Response)=>{
   res.send('api...');
});

app.listen(port,() =>{
    console.log(`sever is listening on port ${port}`);  
});