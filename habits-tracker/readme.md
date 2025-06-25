# Node.js console app — Controller / Service / Model

> Node.js , без Express + `database.json` як база даних 
> Додаток складається з **Model → Service → Controller**.


* npm install                    # немає залежностей, але створює lock-файл

* npm run start:tracker          # node index.js


Команди для взаємодії з консолью:
*  add --name "<the_name_of_habit>" --freq "<daily|weekly|monthly>" — команди для додавання звички;
*  list — перегляд всіх звичок в таблічному форматі;
*  done --id <habit_identifier> - відмічає, що звичку виконано сьогодні;
*  stats — друкує для кожної звички відсоток виконання за останні 7(30) днів;
*  delete --id <habit_identifier> — видаляє звичку;
*  update --id <habit_identifier> --name "<the_name_of_habit>" --freq "<daily|weekly|monthly>" - вносить зміни у назву, або регулярність;
*  - help (-help) - виводить весь перелік існуючих команд;