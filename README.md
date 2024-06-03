# SageSupport

## About <a name = "about"></a>

SageSupport is built using FHIR HLV7 on the GenHealth API to provide clinical decision support for medical practitioners. SageSupport can send a patient’s entire medical history to GenHealth's API, which can generate treatment plans for preventative care or active treatment. The user/practitioner can then select, modify, or discard treatments per their prerogative. <br>

By using GenHealth, we can cover all patient history quickly, and mitigate human error in personal bias for treatment. <br>

For the purposes of this demo project, we use synthetic patient data. <br>

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Running on SMART Launcher

1. Open [Smart launcher](https://launch.smarthealthit.org/) 

2. Select the Launcher type as BackEnd Service, like the picture below, and going into Client Registration & Validation page to config your own client ID and Scope(the only allowed scope is system/*.read) like the second picture.

3. Copy the Server's FHIR Base URL in the second image

### Running on Localhost

### Backend setup
SageSupport requires a Java 8 backend to process data from GenHealth.

In a terminal, access the backend folder

```
cd backend/
```
Maven set up

```
mvn clean
mvn package
```

Maven will compile a .jar database snapshot in a target folder
```
cd target
```
Run backend
```
 java -jar back-end-0.1.jar 
```

### Frontend setup

In a new terminal, access the frontend folder
```
cd frontend/
```

npm set up
```
npm install
npm start
```



## Stack <a name = "built_using"></a>

- [GenHealth](https://genhealth.ai/) - Treatment API
- [Smart Launcher](https://launch.smarthealthit.org/) - FHIR data source
- [React](https://react.dev/) - Front end framework
- [Java Springboot](https://spring.io/) - Back end framework

## Authors <a name = "authors"></a>


- [@Mingkun Li](https://github.com/Mingkli) - UI
- [@Treffery Webb](https://github.com/tweeeb) - Front End Developer 
- [@Zihao Zhu](https://github.com/ShukoAzusa) - Front End Developer 
- [@Chi Jian](https://github.com/jianchidundundun) - Back End Developer 



