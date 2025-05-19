let arguments = process.argv[2];
let toArray = JSON.parse(arguments);

function countNumbers(array){
    let total = 0;
    function helper(arr){
        for (let i = 0; i < arr.length; i++){
            if(typeof arr[i] === 'number'){
             total += arr[i];
            }
            if(Array.isArray(arr[i])){
               helper(arr[i])
            }
        }
        return total;
    }
    return helper(array);
}

console.log(`Total sum: ${countNumbers(toArray)}`);