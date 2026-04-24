import request from "./request";

interface ResponseData{
  code:number;
  message:string;
  data:string;
}

function get(url:string,params?:any):Promise<ResponseData>{
  return request.get(url,{params})
}

function post(url:string,data?:any):Promise<ResponseData>{
  return request.post(url,data)
}

export {get,post}