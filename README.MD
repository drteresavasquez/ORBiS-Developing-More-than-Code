# Orbis: Developing More Than Code

A great portion of the population believes that knowledge alone is central to success. Over years of research and failures of my own, I have learned that social/emotional/belonging skills are not only the keys to success, they are also the keys, when combined with knowledge, to SUSTAINABLE success.

Orbis helps to facilitate the social/emotional/belonging process by combining all four aspects in a natural, fun way so that learners can focus on skill building and admins can learn more about their learners in the process.

![alt text](https://i0.wp.com/www.drteresavasquez.com/wp-content/uploads/2017/06/Slide03.jpg "Get Your ORBiS ON!")

[Watch a Walk Through of This App](https://youtu.be/EgoEj7eA8Ak)

[See it in Action!](https://drteresavasquez.github.io/FRONT-END-CAPSTONE-ORBIS)

[Get More Details](https://docs.google.com/document/d/1YzUXYjXBc-FAL8U81qMkV7vlJBCFTZ9R31iSgyB_2ao/edit?usp=sharing)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

```
git clone https://github.com/drteresavasquez/ORBiS-Developing-More-than-Code.git
cd lib
npm install
GRUNT
cd app
mkdir creds
cd creds
touch fb.creds.js
```
### Add Firebase Creds

Visit [Google's Firebase](https://firebase.google.com) and create a database by following [Google's Instructions](https://firebase.google.com/docs/database/web/start)

Add your configuration to fb.creds.js

Your creds should look like this

```
app.constant("FBCreds", {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN.firebaseapp.com",
    databaseURL: "https://YOUR_DOMAIN.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET.appspot.com",
    messagingSenderId: "YOUR_ID"
});
```

## Built With

* Angular JS
* Angular Charts.js
* Javascript/JQuery
* GitHub API
* HTML/CSS
* Bootstrap
* Firebase
* SASS

## Authors

* **Dr. Teresa Vasquez** - *Initial work* - [Dr. T](https://github.com/drteresavasquez)

## Acknowledgments

* Shout out to Nashville Software School and their awesome learning environment!
* Special thanks to Casey Reed, Jisie David, and Brenda Long
