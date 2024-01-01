# eventPro

This is an Event Management Platform which enables users' to perform CRUD operations wrt events and participate in them

## Tech Stack

NextJS, TypeScript, MongoDB, MailTrap(For Event Mailing), Docker and Azure[For Deployment (Azure Container Instances Used)]

## Instructions on how to set up the application

1) Clone into the repo after forking it (or directly cloning it. Your call)
2) Create a .env file in the evpr directory
3) In the .env file, following details need to be mentioned:
   i) TOKEN_SECRET (For JWT Tokens) [String]
   ii) MONGO_URL (For connecting to database. You can use the local mongo or the cloud one. Just add the appropriate URL) [String]
   iii) DOMAIN (Just specify where you plan to run this project. Default value can be "http://localhost:3000") [String]
   iv) MAIL_USER (This is your MailTrap Username) [String]
   v) MAIL_PASS (This is your MailTrap Password) [String]
   vi) MAIL_ID (The Email ID with which mail should be sent to users upon participation/non-participation of events) [String]
   vii)DEFAULT_EVENT_IMG (This is the default image which is to be used in case user doesn't provide any image url for their events) [String]
4) Type "npm install" in CLI to install all dependencies

## How to Run

1) In Dev Mode: Just type "npm run dev" in CLI
2) In Prod Mode: Use the Dockerfile to build an image(feel free to use any nameyou want). Then, run a container based on the image.
   
## Images

Home Page:

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/0af13715-ac57-4ac0-998e-90e1b14f935e)


Login Page:

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/db07d904-9b45-4897-b849-8362fb41710a)


Signup Page:

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/5ab97f0b-6de7-44b7-8017-a76bb50a339e)


User Dashboard: 

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/5bec907c-4201-4c5a-b872-20ae3f11027a)


All Events Page:

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/c3e7e9c2-09d3-4ec5-9cb0-ee54bae6c23e)


User Events Page:

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/33296704-376f-4a81-a260-3436bae23d93)


Create Events Form Page:

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/fdb9eb0b-7217-4273-b789-eaeef32acdbb)


Update Events Form Page:

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/b1e5527f-7d81-4e16-8c9d-8c67b273d62e)

Page to view single event:

![image](https://github.com/Abhinav5050649/eventPro/assets/89687523/fb875422-6ce9-4d30-a532-11edb5ce9dba)

