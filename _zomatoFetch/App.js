const fetch = require('node-fetch');
const moment = require('moment');

const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'zomato';

var restaurantsArray = [];

async function Main() {
  let promise = await GetRestaurantIds();

  await FetchAndSave(promise);
  process.exit(-1);
}

async function GetRestaurantIds() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    var mysort = { name: 1 };
    const array = db
      .collection('restauracie_ruzinov')
      .find({})
      .sort(mysort)
      .toArray();
    return array;
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
}

async function FetchAndSave(array) {
  var menu_array = [];
  var datetime = moment().format('MMM Do YY');

  for (let restaurant of array) {
    let res = null;
    try {
      res = await fetch(
        'https://developers.zomato.com/api/v2.1/dailymenu?res_id=' +
          restaurant.res_id,
        {
          headers: {
            Accept: 'application/json',
            'User-Key': 'your api key'
          }
        }
      );
      res = await res.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    menu_array.push({
      'dish': {
        'dish_id': '111',
        'name': '------------',
        'price': '',
        'restaurant': restaurant.name
      }
    });
    for (let menu of res.daily_menus[0].daily_menu.dishes) {
      menu_array.push(menu);
    }
    restaurantsArray = menu_array;
  }

  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    for (let menu in restaurantsArray) {
      let r = await db
        .collection('menu_ruzinov_' + datetime)
        .insertOne(restaurantsArray[menu].dish);
    }
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
}

Main();
