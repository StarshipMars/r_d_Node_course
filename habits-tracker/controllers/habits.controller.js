import * as helpers from '../helpers/index.js';
import { addHabit , 
         createTable , 
         doneHabit , 
         statsInfo, 
         deleteHabit,
         updateHabit
        } from '../services/habits.service.js';
const { hint , writeResult } = helpers;

export async function commandParser(data){
    const response = data.toString().trim().toLowerCase();
    const command = response.split(' ').filter((item)=> !!item).join(' ');
    const splittedCommand = command.split(' ');

    if(response === "-help" || response === "- help"){
        hint(3);
    }
    else if(command.match(/add -{2}name ("|')?[\w+,\s]{1,}("|')? -{2}freq ("|')?\w+("|')?/g)){
       const habit = splittedCommand.slice(2, -2).join(' ').replace(/"|'/g, '');
       const frequency = splittedCommand[splittedCommand.length - 1].replace(/"|'/g, '');
       const mes = await addHabit(habit, frequency);
       writeResult(mes);
    }
    else if(response === "list"){
      const tableData = await createTable();
      for (let data in tableData){
       console.log(`${data.toUpperCase()}:  `);
       console.table(tableData[data]);
      }
      writeResult();
    }
    else if(command.match(/done -{2}id <[\w+,\s]{1,}>/g)){
      const id = splittedCommand.slice(2).join(' ').replace(/<|>/g, '');
      const mes = await doneHabit(id.toLowerCase());
      writeResult(mes);
    }
    else if(response === 'stats'){
      const info = await statsInfo();
      writeResult('\n' + info);
    }
    else if(command.match(/delete -{2}id <[\w+,\s]{1,}>/g)){
      const id = splittedCommand.slice(2).join(' ').replace(/<|>/g, '');
      const msg = await deleteHabit(id);
      writeResult(msg);
    }
    else if(command.match(/update -{2}id <[\w+,\s]{1,}> -{2}name ("|')?[\w+,\s]{1,}("|')? -{2}freq ("|')?\w+("|')?/g)){
       const id = splittedCommand[2].replace(/<|>/g, '').toLowerCase();
       const name = splittedCommand[4].replace(/"|'/g, '');
       const freq = splittedCommand[splittedCommand.length - 1].replace(/"|'/g, '').toLowerCase();
       const msg = await updateHabit(id, name[0].toUpperCase()+name.slice(1), freq);
       writeResult(msg);
    }else{
      writeResult('Most likely, the wrong command was entered. Use -help (- help) for more details.\n');
    }
}