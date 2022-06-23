const today = new Date();
const month = ("0" + Math.floor(today.getMonth()+1)).slice(-2) ;   
export const forHomeurl = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${today.getFullYear()}/${month}/${Math.floor(today.getDate())}`