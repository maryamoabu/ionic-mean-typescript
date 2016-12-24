/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 22-12-2016
*/

/// <reference path="./@types/index.d.ts" />

import * as express from 'express';
import * as http  from "http";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';

import { api }  from "./modules/api";
import { DataBase }  from "./modules/database";

const log = (req,res,next) => {
    console.log("Query route path-> ", req.route.path);
    console.log("Query route params-> ", req.params);
    console.log("Query route methode-> ", req.route.methods);
  	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  	next();
}

export class Server{

  private app:express.Application;
  private server:http.Server;
  private root:string;
  private port:number|string|boolean;
  private db: boolean;


  constructor(){
    this.app = express();
    this.server = http.createServer(this.app);
    this.config()
    this.middleware()
    this.dbConnect()
  }

  private config():void{
    this.db = false;
    this.root = path.join(__dirname, '../www')
    this.port = this.normalizePort(process.env.PORT || 8080);
    this.app.use(express.static(this.root))
  }

  private middleware(){
    this.app
      // use bodyParser middleware to decode json parameters
      .use(bodyParser.json())
      .use(bodyParser.json({type: 'application/vnd.api+json'}))
      // use bodyParser middleware to decode urlencoded parameters
      .use(bodyParser.urlencoded({extended: false}))
      .use(cors())
  }

  private dbConnect(){
      // Load DB connection
      DataBase.connect()
        .then(result =>{
          // Load all route
          console.log(result)
          this.route_server()
          this.route_api()
        })
        .catch(err => {
          // DB connection Error => load only server route
          console.log(err)
          this.route_server()
          return err
        })
        .then(err => {
          // Then catch 404 & db error connection
          this.app.use((req, res)=>{
            let message = (err)? [{error: 'Page not found'}, {err}] : [{error: 'Page not found'}]
            res.status(404).json(message);
          })
        })
  }

  private route_server():void{
    // Index Server
    this.app.get('/', log, (req, res)=>{
      res.status(200);
      res.json([{api: 'Hello!'}]);
     })
  }

  private route_api():void{
    // REST API Endpoints
    this.app
      .get('/todos', log, api.getItems)
    	.get('/todos/:id', log, api.getItem)
      .post('/todos', log, api.addItem )
    	.put('/todos/:id', log, api.updateItem )
    	.delete('/todos/:id', log, api.deleteItem )
  }

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch(error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  bootstrap():void{
    this.server.on('error', this.onError);
    this.server.listen(this.port, ()=>{
    	console.log("Listnening on port " + this.port)
    });
  }

}