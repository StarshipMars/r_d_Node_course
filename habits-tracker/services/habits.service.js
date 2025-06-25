import {
         saveHabit, 
         createHabitsList, 
         noteHabitAsDone, 
         getStats, 
         habitDeletion,
         updateHabitParams
        } from '../models/habits.model.js';

export async function addHabit(habitName, frequency){
  return await saveHabit(habitName, frequency);
}

export async function createTable(){
 const list = await createHabitsList();
 return list;
}

export async function doneHabit(habitId){
  try{
   return await noteHabitAsDone(habitId);
  }catch(err){
    return err?.message || 'Something went wrong, try it again!\n';;
  }
}

export async function statsInfo(){
  try{
   return await getStats();
  }catch(err){
    return err?.message || 'Something went wrong, try it again!\n';;
  }
}

export async function deleteHabit(id){
  try{
   return await habitDeletion(id);
  }catch(err){
    return err?.message || 'Something went wrong, try it again!\n';;
  }
}

export async function updateHabit(id, habitName, freq){
  try{
   return await updateHabitParams(id, habitName, freq);
  }catch(err){
    return err?.message || 'Something went wrong, try it again!\n';;
  }
}