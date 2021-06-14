const add=(cart,req)=>{
  cart.push(req.body);
  return JSON.stringify(cart);
}

const edit=(cart,req)=>{
  let find = cart.find(el=> el.id=== +req.params.id);
  find.quantity+= req.body.quantity;
  return JSON.stringify(cart);
}
const remove=(cart,req)=>{
  let find = cart.find(el=> el.id=== +req.params.id);
  let index= cart.indexOf(find);
  cart.splice(index,1);
  return JSON.stringify(cart);
}

module.exports={
    add,
    edit,
    remove
}