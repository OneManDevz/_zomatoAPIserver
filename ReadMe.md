# \_zomatoFetch

This app contains a script, which loads restaurants IDs from database.
Then it makes a fetch calls to `https://developers.zomato.com/api/v2.1/dailymenu?res_id=`, and pust restaurant id (fetched from DB) into the url.
If everything was successfull then script formats response and saves it into database, creates a new collection with name `menu_ruzinov`+moment().format("MMM Do YY").

# \_zomatoAPIserver

This server application retrieves data from database and makes them accessible for the mobile app.

# \_zomatoMobileApp

Third part of 3part zomato application.
This is an mobile app sending request to the first (`\_zomatoApiServer`) app and retrieving data to show for user.

# How to run

My .apk work only for few restaurants in Bratislava.

- download .apk file
- make sure to have checked the setting for unknown sources
- install .apk
- run
- click the button
- wait few seconds

# How to modify

- `\_zomatoFetch\App.js`

  - url: change url variable to yours (`mongodb://localhost:27017`)

  ```
  const url = 'mongodb://localhost:27017';
  ```

  - restaurant collection name: change to your collection name (`restauracie_ruzinov`) - This is a collection of restaurant's names and their IDs

  ```
  const array = db.collection("restauracie_ruzinov").find({}).sort(mysort).toArray();
  ```

  - menu collection name: change to your collection name (`menu_ruzinov_`) - This is a collection of restaurant's names and their menus - displayed to the client

  ```
  let r = await db.collection("menu_ruzinov_"+datetime)
  ```

  - api key: `your api key` to your key

  ```
  "User-Key": "your api key"
  ```

- `\_zomatoAPIServer`

  - url: change url var to yours in `config\db.js`

  ```
  module.exports ={ url: "mongodb://localhost:27017/zomato" }
  ```

  - menu collection name in `models\menuModel.js` (`menu_ruzinov_` to what you set up few lines above)

  ```
      collection: 'menu_ruzinov_' + moment().format("MMM Do YY")

  ```

- `\_zomatoMobileApp`
  - api url: in `App.js`
  ```
  const menuURL= "your api url"
  ```
