## CS5224 Group Project

This repository provides codes for our Final Project.

You can go to the demo 👇 by clicking the link below. 

## [YANA - You Are Not Alone](https://yana.sora.so/) 

## About Us

- Yang Bowen (A0228604H)
- Li Huimin (A0224834E)
- Shen Siyuan (A0112489B)
- Xiao Yikai (A0212237R)

## Executive summary

Recently, online activities have become popular, as the COVID-19 pandemic made it impossible for people to get together or make new friends in person. Therefore, the main ways people communicate and engage with others are likely to be changed under this special circumstance. Voice chat, among them, has started to gain momentum and is becoming one of the most popular communication methods. 

Thus, in this project, we propose to develop this cloud-based SaaS YANA (abbreviated for “You Are Not Alone”) to offer a platform for users to find like-minded people through live voice chats. This service will feature various virtual chatting “rooms” with conversations on diverse topics. Users can create, search for and join in rooms with the help of topic tags. Upon entering an interested room, user can participate in the respective digital activity, ranging from a podcast by someone famous to a discussion within a large group. In this case, people can easily find their potential roommates, playmates, lunchmates or even soulmates here in YANA.

## Business Case Identification

Problem Statement 1: A student who is taking an online course comes up with a nice topic and would like to invite some classmates to build a team and work on it together as the course group project. However, sending teammates finding posts on personal social media or in course group chat and then messaging one by one for further details can take much time and effort. 

Proposed Solution: YANA can propose a well solution for this case. The student only needs to create a chat room and tags it with the course code and the topic name so that other students interested in the project can find and join the room. Also, the students can further add tags showing his preferred skill or time availability of his target teammates, so as to let others search for or filter out information more efficiently. After creating the chat room and waiting for new-joint members to meet the group size, the student can describe his detailed idea and receive feedback immediately from others. As YANA is a live voice chat service, long dialogues among a group of people can proceed smoothly with no wait time and no effort is wasted for typing or reading.

Problem Statement 2: A person has just finished a novel or a manga and cannot wait to share his review or discuss the contents with peers. He has no idea which friend to turn to and also no patience to wait for others to comment on his published review on the book rating website. 

Proposed Solution: YANA can be a good choice for this scenario. The person just takes the action of searching on YANA for the book name. Rooms full of peers in the same situation can be found, where people are free to share feelings and views over a common topic. 

Thus, YANA aims to offer a platform to efficiently find like-minded people through live voice chats. The target client users are listed as follows:

1. People who cannot get together in person with acquaintances.
2. People who are too shy to make friends in physical life.
3. People who are keen to find potential roommates, playmates, lunchmates or even soulmates.
4. People with less knowledge of electronic devices or keyboards (like the children and the elders).
5. People who prefer fast pace information exchange.

## Business Model

Like most of the social networking applications, YANA is free to use. Everyone on the Internet who has registered an account in YANA can connect to our network freely. All the users will be able to use our free-tier services. For example, they can create rooms and have a text or voice chat with their friends or join in other hosts’ live casting. However, for the free-tier users, the services that they can use are limited. If the users would like to enjoy more privileged services in YANA, they can opt for the paid service or in-app purchases. We have offered below several different types of paid services to the individual users:

1. The users can choose to become a VIP user in YANA.
2. The users can purchase virtual gifts and tip the room hosts in YANA. 
3. There are some paid rooms which are hosted for dedicated purposes such as online tutoring, career advising, etc.
4. YANA also offers boosting services to all the hosts.

Besides gaining revenues from individual customers, we are also targeting at business customers:

1. YANA will offer advertising spaces (on home page) for different types of companies to rent.
2. YANA will collaborate with advertising firms to do target advertising.
3. The companies can also start their own room to do live casting and attract different customers to purchase their products.

## SaaS Architecture & Implementation

![Architecture](https://user-images.githubusercontent.com/62169579/114296237-c693f500-9adc-11eb-97a1-0ad02640dfb6.jpg)

**YANA Front-End:**

**React.js** is used to develop the front-end web UI. 

**AWS Amplify** is used as Saas service assisting users to build mobile or web applications, it is used to deploy the front-end web UI. 

**Amazon Route 53** which is a scalable and highly available Domain Name Service, we can create a domain for the AWS amplify webApp

**Amazon EC2**, **EC2 Auto Scaling** and **Elastic Load Balancing** are used to set-up our front-end server to host our web interface. Then we use our personal domain and set the DNS to be our front-end server IP address.

**YANA Back-End:**

**Flask** which is a micro web framework written in Python and it is used to develop the YANA web back-end service. 

**Node.js** is used to develop the web back-end server. 

**MongoDB** is a document-based database, data is stored in JSON and XML documents and it is used to store YANA website various data such as user accounts, profiles and chat rooms information. 

**AWS S3 bucket** is also used to store user-upload resources, such as images for user profile etc. Given that free data transfer amount is limited per month, proper compression is necessary

**Amazon EC2**, **EC2 Auto Scaling** and **Elastic Load Balancing** are also used to set-up and host our back-end web server and back-end voice server

## Economic Factors

It’s very cost-saving to host YANA on the cloud especially for start-up companies who don't have too much initial capital. It requires no upfront costs, instead we will only make regular payments which makes it an operating expense. It is more affordable when compared with on-premise IT infrastructure, we can save a lot of money in terms of procurement costs, maintenance costs, security costs, storage cost and scalability costs. What’s more, we can easily predict the cost for hosting YANA such as software licenses, supports and daily backups in order to achieve more economic benefits.

While defining the pricing models for YANA, we used several models for different services offered in YANA. 

**- Tiered pricing model**

Free Tier (free): Enjoy basic services in YANA

VIP Tier ($5/month): Enjoy exclusive logo, can host room with no time limit

Enterprise User ($10/month): Can host room to do advertising

**- Usage based pricing model**

Virtual Gift ($8 each): Everyone can purchase to tip the host

Target advertising ($20 each): We will collaberate with ad firms to do target advertising
