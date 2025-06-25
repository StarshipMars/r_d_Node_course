import { generateOffsetList } from './config/index.js';
generateOffsetList();
import * as helpers from './helpers/index.js';
import {commandParser} from './controllers/habits.controller.js'

const { hint } = helpers;


function commandsListener(){
  process.stdin.on('data', (data)=>{
     commandParser(data)
  });
};

hint(1);
commandsListener();


