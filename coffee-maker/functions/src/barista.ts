
export function recommend(brew?:string):string{
 let response:string = "";
 if(brew){
   response = "Your brew of type "+brew+" requires 4min of brewing :)"
 }
 else{
   throw new Error("Undefined Brew Type");
 }
  return response;
}
