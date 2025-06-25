export function startTyping(){
  process.stdout.write('- > ');
};

export function indentDown(times){
  let indents = ``;
  for (let i=0; i < times; i++){
    indents += `\n`;
  }
  return indents;
};

export function hint(times){
  process.stdout.write(`
         You can use commands below ( use < -help > for list all ):

      *  add --name "<the name of habit>" --freq "<daily|weekly|monthly>" — command for adding habit;\n
      *  list — view all habits in table format;\n
      *  done --id <habit identifier> - notes that the habit was done today;${indentDown(times)}
      *  stats — prints the percentage of completion for each habit over the last 7(30) days;\n
      *  delete --id <habit identifier> — delete habit;\n
      *  update --id <habit identifier> --name "<the name of habit>" --freq "<daily|weekly|monthly>" - makes changes to the name or frequency;\n
      *  - help (-help) - view all possible commands;\n
  `);
  startTyping();
};

export function writeResult(result){
    process.stdout.write(result ? `${result}\n` : '\n');
    startTyping();
};

export function completedToday(timestamp){
  let startDay = new Date().setHours(0,0,0);
  let endDay = new Date().setHours(23,59,59);
  
  return startDay <= timestamp <= endDay;
}

export function completionPercentage(habit, markedDates){
  let start = new Date(Date.now() - (24 * 60 * 60 * 1000)).setHours(23,59,59);
  let sevenDaysAgo = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).setHours(0,0,0);
  let thirtyDaysAgo = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).setHours(0,0,0);

  let duringLastSevenDays = markedDates.slice(0, 8).filter((d) => d <= start && d >= sevenDaysAgo);
  let duringLastThirtyDays = markedDates.slice(0, 31).filter((d) => d <= start && d >= thirtyDaysAgo);;
  
  let str = '';
  [7, 30].forEach((duration)=>{
    const x = ( (duration === 7 ? duringLastSevenDays.length : duringLastThirtyDays.length) * 100) / duration;
    str += `${habit} -> Percentage of completion over the past ${duration} days - ${x.toFixed(2)}% \n\n`;
  })
  return str;
}