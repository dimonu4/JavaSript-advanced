const express = require('express');
const fs = require('fs');
const app = express();

/**
 * Активируем мидлвары
 */
app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./public')); // запросы в корень нашего сайт отдают содержимое public

/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

// Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // добавляем новый товар
      cart.contents.push(req.body);
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
           fs.readFile('./server/db/stats.json','utf-8',(err, data)=>{
             if(err){
              res.send(JSON.stringify({result: 0, text: err}));
             }else{
               const doc = JSON.parse(data);
               const stat = {proccess:'adding commudity', itemid:req.body.id_product, date:new Date()};
               doc.push(stat);
               fs.writeFile('./server/db/stats.json',JSON.stringify(doc), (err)=>{
                 if(err){
                   res.send(err);
                 }
               })

             }
           })
        }
      })
    }
  });
});

// Изменяем количество товара
app.put('/api/cart/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));

    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      // изменяем количество
      find.quantity += req.body.quantity;
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          fs.readFile('./server/db/stats.json','utf-8',(err, data)=>{
            if(err){
             res.send(JSON.stringify({result: 0, text: err}));
            }else{
              const doc = JSON.parse(data);
              const stat = {proccess:'changing quantity commudity', itemid:[+req.params.id,req.body.quantity], date:new Date()};
              doc.push(stat);
              fs.writeFile('./server/db/stats.json',JSON.stringify(doc), (err)=>{
                if(err){
                  res.send(err);
                }
              })

            }
          })
        }
      })
    }
  });
});

// Удаление товара из корзины
app.delete('/api/cart/:id',(req,res)=>{
  fs.readFile('./server/db/userCart.json', 'utf-8', (err,data)=>{
    if(err){
      res.sendStatus(404, JSON.stringify({result:0, text:err}));
    }
    //Парсим текущую корзину
    const cart = JSON.parse(data);
    //Ищем идекс товара
    const findIndex= cart.contents.findIndex(el=>el.id_product=== +req.params.id);
    // Удаляем товар
    cart.contents.splice(findIndex,1);
    // Записываем результат
    fs.writeFile('./server/db/userCart.json',JSON.stringify(cart), (err)=>{
      if(err){
      res.send('{"result":0}');
      }else{
        res.send('{"result":1}');
        fs.readFile('./server/db/stats.json','utf-8',(err, data)=>{
          if(err){
           res.send(JSON.stringify({result: 0, text: err}));
          }else{
            const doc = JSON.parse(data);
            const stat = {proccess:'removing commudity', itemid:+req.params.id, date:new Date()};
            doc.push(stat);
            fs.writeFile('./server/db/stats.json',JSON.stringify(doc), (err)=>{
              if(err){
                res.send(err);
              }
            })

          }
        })
      }
    })
  })
});

/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 3000;
const port = 8888; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
