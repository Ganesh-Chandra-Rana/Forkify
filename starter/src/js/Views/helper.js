import {async} from 'regenerator-runtime';
import { TIMEOUT_SEC } from '../config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  // modified getJSON and setJSON in one method.
  export const AJAX=async function(url,uploadData=undefined){
    try {
      const fetch_=uploadData?fetch(url,{
        method:'POST',
        headers:{
                  'Content-Type':'application/json',
        },
        body:JSON.stringify(uploadData)
       }):fetch(url);
       const res = await Promise.race( [fetch_,timeout(TIMEOUT_SEC)]);
       const data=await res.json();
       if(!res.ok) throw new Error(`${data.message} (${res.status})`);
       return data;
   } catch (error) {
        console.error(error);  
        throw error;
       
   }
  }
  
/*
export const getJSON=async function(url){
    try {
   const fetch_=fetch(url);
    const res = await Promise.race( [fetch_,timeout(TIMEOUT_SEC)]);
    const data=await res.json();
    if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
} catch (error) {
     console.error(error);  
     throw error;
    
}
};

export const sendJSON=async function(url,uploadData){
  try {
 const fetch_=fetch(url,{
  method:'POST',
  headers:{
            'Content-Type':'application/json',
  },
  body:JSON.stringify(uploadData)
 });
  const res = await Promise.race( [fetch_,timeout(TIMEOUT_SEC)]);
  const data=await res.json();
  if(!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
} catch (error) {
   console.error(error);  
   throw error;
  
}
};
*/