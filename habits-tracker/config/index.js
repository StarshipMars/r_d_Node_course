import { config as load } from 'dotenv';
load();

let offset_list = {};

const generateOffsetList = ()=>{
    for(let i = 0; i <= 29; i++){
        offset_list[`${i}_DAY_OFFSET`] = Date.now() + 24 * 60 * 60 * (+process.env[`${i}_DAY_OFFSET`]);
    }
    return offset_list;
}

export {generateOffsetList};