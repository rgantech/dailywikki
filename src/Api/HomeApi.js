const today = new Date();
const month = ("0" + Math.floor(today.getMonth()+1)).slice(-2);
const date = ("0" + Math.floor(today.getDate())).slice(-2) 
export const forHomeurl = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${today.getFullYear()}/${month}/${date}`