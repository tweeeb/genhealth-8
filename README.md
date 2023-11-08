<p align="center">
  <a href="" rel="noopener">
 <img width=500px height=150px src="images/title.png" alt="Project logo"></a>
</p>

<h3 align="center">Team Eight SageSupport</h3>





## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

# We have already deploy our project on cloud server,please visit this link:https://comp3820.azurewebsites.net/

## 🧐 About <a name = "about"></a>

Our project is to obtain data in FHIR format through the Smart system, and establish a connection with GenHealth's API for predicting the patient's future condition through the parsed patient data. We generate the patient's clinical medical advice through GenHealth's API and directly push the patient's clinical medical advice to the front end. Let the doctor choose whether to save the current clinical medical advice for this patient. <br>
Our project: https://comp3820.azurewebsites.net/

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

1. Open [Smart launcher](https://launch.smarthealthit.org/) 

2. Select the Launcher type as BackEnd Service, like the picture below, and going into Client Registration & Validation page to config your own client ID and Scope(the only allowed scope is system/*.read) like the second picture.
3. Copy the Server's FHIR Base URL in the second image
<p align="center">
 <img width=400px height=200ox src="images/launchType.png" alt="Project logo" >
 <p>
 <p align="center">
  <img width=400px height=200ox src="images/secondlaunch.png" alt="Project logo">
<p>

### Go to the backend resource folder
```
cd backend/back-end-project/src/main/resources/ 
```

### Config the application file
 By replacing the FHIRUrl with the new Server's FHIR Base URL and replace this mongidb with your production url<br>
you can use our test database with this original url
```
vim application.yml
```
```
server:
  port: 18000
logging:
  file:
    name: temp/genhealthApi.log
  level:
    root: info
    org:
      springframework:
        web: debug
spring:
  data:
    mongodb:
      uri: "mongodb+srv://comp3820:mFAR7f6UGzXFZUK0@cluster0.m5swobe.mongodb.net/comp3820?retryWrites=true&w=majority"
      # <ues your new mongodb url here or ues our test cloud database url>



FHIRUrl: "<your new Server's FHIR Base URL>"
DATACOUNT : 3000

```

### Running back end

#### environment : Java 8
<br>
go to back end folder

```
cd backend/back-end-project/
```

runnign mvn cleam
```
mvn clean
```

runnng mvn package

```
mvn package
```

go to target folder
```
cd target
```

start backend
```
 java -jar back-end-project-0.0.1-SNAPSHOT.jar 
```


### Running for front end

go to front end folder
```
cd frontend/
```

install
```
npm install
```

run

```
npm start
```


## 🚀 Deployment(Use Docker Compose) <a name = "deployment"></a>



1. go to front end folder


```
cd frontend/
```

2. running build command
```
npm run build
```
3. use the new build floder to replace the build in comp3802BuildFolder

4. use the new jar file in backend/back-end-project/target/back-end-project-0.0.1-SNAPSHOT.jar  to replace the old one in comp3802BuildFolder

5. go to the comp3802BuildFolder
```
cd comp3802BuildFolder/
```
6. run docker compose
```
docker compose up -d
```



## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [GenHealth](https://genhealth.ai/) - Treatment API
- [Smart Launcher](https://launch.smarthealthit.org/) - FHIR data source
- [React](https://react.dev/) - Front end framework
- [Java Springboot](https://spring.io/) - Back end framework

## ✍️ Authors <a name = "authors"></a>


- [@Mingkun Li](https://github.com/Mingkli) - UI
- [@Treffery Webb](https://github.com/tweeeb) - Front End Developer 
- [@Zihao Zhu](https://github.com/ShukoAzusa) - Front End Developer 
- [@Chi Jian](https://github.com/jianchidundundun) - Back End Developer 



