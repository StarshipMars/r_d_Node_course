import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as helpers from '../helpers/index.js';

const {completedToday , completionPercentage} = helpers;

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB = join(__dirname, '..', 'database.json');

const read = async () => JSON.parse(await readFile(DB, 'utf8'));
const save = async (data) => writeFile(DB, JSON.stringify(data));

export const saveHabit = async (habitName, frequency) => {
    try{
      let db = await read();
      let habitsList = db[frequency];
      const name = `${habitName[0].toUpperCase()}${habitName.slice(1)}`;
        if(!habitsList[habitName]){
            db = {
            ...db,
            [frequency]:{
              ...habitsList,
              [name]:{
                habitName:name,
                id:habitName.toLowerCase(),
                markedDates:[]
               }
            }
            }
            await save(db);
        }
        return `\nHabit ${habitName} added to ${frequency} execution\n`;
    }catch(err){
        console.error(`${err}\n`);
        return 'Something went wrong, try it again!\n';
    }
};

export const createHabitsList = async ()=>{
  try{
    let db = await read();
    const frequencies = Object.keys(db);
    
    return frequencies.reduce((prevValue, curValue)=>{
      let habits = Object.keys(db[curValue] || []);
      const mappedHabits = habits.map((habit)=> {
        const { habitName, id } = db[curValue][habit];
        return {
            habitName,
            id
        };
      })
      
      for (let i = 0; i < mappedHabits.length; i++){
        if(!prevValue[curValue]){
          prevValue[curValue] = {};
        }
        prevValue[curValue][mappedHabits[i].habitName] = mappedHabits[i];
      } 
      return prevValue;
    }, {});
  }catch(err){
    console.error(`${err}\n`);
    return 'Something went wrong, try it again!\n';
  }
}

export const noteHabitAsDone = async (habitId)=>{
   try{
     let db = await read();
     const frequencies = Object.keys(db);
     const allHabitsIds = [];
     for(let i=0; i < frequencies.length; i++){
        const keys = Object.keys(db[frequencies[i]]);
        keys.forEach((key) => allHabitsIds.push(db[frequencies[i]][key].id));
     }
     if(allHabitsIds.indexOf(habitId) === -1){
       return `You don't have habit with id <${habitId}>\n`;
     }
      
     for(let i=0; i < frequencies.length; i++){
        const keys = Object.keys(db[frequencies[i]]);
        for(let j=0; j < keys.length; j++){
          if(db[frequencies[i]][keys[j]].id === habitId){
             const lastDate = db[frequencies[i]][keys[j]].markedDates[0];
             if(lastDate && completedToday(lastDate)){
               return `You have already completed ${habitId} today\n`;
             }
             db[frequencies[i]][keys[j]].markedDates.unshift(Date.now());
             await save(db);
             return `${habitId} done for today\n`;
          }
        }
     }
   }catch(err){
      console.error(`${err}\n`);
      throw err;
   }
}

export const getStats = async ()=>{
    try{
      let db = await read();
      const frequencies = Object.keys(db);
      let index = 0;
      let str = '';
      while(index < frequencies.length){
        const habits = Object.keys(db[frequencies[index]]);
        for(let j=0; j < habits.length; j++){
            str += `${completionPercentage(habits[j], db[frequencies[index]][habits[j]].markedDates)}`;
        }
        index++;
      }
      return str;
    }catch(err){
      console.error(err);
      throw err; 
    }
}

export const habitDeletion = async (id)=>{
    try{
      let db = await read();
      const frequencies = Object.keys(db);
      for(let i=0; i < frequencies.length; i++){
        const habits = Object.keys(db[frequencies[i]]);
        habits.forEach( async (h)=>{
          if(db[frequencies[i]][h].id === id){
            delete db[frequencies[i]][h];
            await save(db);
          }
        })
        return `Habit <${id.slice(0, 1).toUpperCase()}${id.slice(1)}> was deleted\n`;
      }
    }catch(error){
      console.error(err);
      throw err; 
    }
}

export const updateHabitParams = async(id, habitName, freq)=>{
   try{
      let db = await read();
      const frequencies = Object.keys(db);
      for(let i=0; i < frequencies.length; i++){
        const habits = Object.keys(db[frequencies[i]]);
        habits.forEach( async (h)=>{
          if(db[frequencies[i]][h].id === id){
            const habitParams = db[frequencies[i]][h];
            delete db[frequencies[i]][h];
            db[freq][habitName] = {...habitParams};
            await save(db);
          }
        })
        return `Habit <${id.slice(0, 1).toUpperCase()}${id.slice(1)}> was updated\n`;
      }
   }catch(err){
      console.error(err);
      throw err;
   }
}

