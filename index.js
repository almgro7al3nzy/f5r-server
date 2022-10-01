// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);

const http = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

const app = express();
app.use(cors());
// parse application / x-www-form-urlencoded
// {extended: true}: دعم الكائن المتداخل
// يُرجع البرامج الوسيطة التي تقوم فقط بتحليل النصوص المشفرة بعنوان url و
// سيحتوي هذا الكائن على أزواج مفتاح - قيمة ، حيث يمكن أن تكون القيمة a
// سلسلة أو مصفوفة (عندما يكون التمديد خطأ) ، أو أي نوع (عندما يكون التمديد صحيحًا)
app.use(bodyParser.urlencoded({ extended: true }));

// هذه البرامج الوسيطة المرتجعة التي تحلل json فقط وتنظر فقط في الطلبات التي يكون فيها نوع المحتوى
// header يطابق خيار النوع.
// عند استخدام req.body -> هذا باستخدام أداة تحليل الجسم لأنه سيتم تحليله
// جسم الطلب للشكل الذي نريده
app.use(bodyParser.json());

const PORT = 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
// في اللحظة التي يتصل فيها أحد عميلك بخادم socket.io ، سيحصل على معرف المقبس
  // دعونا نطبع هذا.
  console.log(`Connection : SocketId = ${socket.id}`);
// نظرًا لأننا سنستخدم اسم المستخدم من خلال اتصال مقبس كامل ، فلنجعله عالميًا.
  var userName = "";

  socket.on("subscribe", function (data) {
    console.log("subscribe trigged");
    const room_data = JSON.parse(data);
    userName = room_data.userName;
    const roomName = room_data.roomName;

    socket.join(`${roomName}`);
    console.log(`Username : ${userName} joined Room Name : ${roomName}`);
// دع المستخدم الآخر يتلقى إشعارًا بأن المستخدم دخل الغرفة ؛
    // يمكن استخدامه للإشارة إلى أن الشخص قد قرأ الرسائل. (مثل تحويل "غير المقروء" إلى "قراءة")

// TODO: تحتاج إلى الاختيار
    //io.to : User who has joined can get a event;
    //socket.broadcast.to : all the users except the user who has joined will get the message
    // socket.broadcast.to(`${roomName}`).emit('newUserToChatRoom',userName);
    io.to(`${roomName}`).emit("newUserToChatRoom", userName);
  });

  socket.on("unsubscribe", function (data) {
    console.log("unsubscribe trigged");
    const room_data = JSON.parse(data);
    const userName = room_data.userName;
    const roomName = room_data.roomName;

    console.log(`Username : ${userName} leaved Room Name : ${roomName}`);
    socket.broadcast.to(`${roomName}`).emit("userLeftChatRoom", userName);
    socket.leave(`${roomName}`);
  });

  socket.on("newMessage", function (data) {
    console.log("newMessage triggered");

    const messageData = JSON.parse(data);
    const messageContent = messageData.messageContent;
    const roomName = messageData.roomName;

    console.log(`[Room Number ${roomName}] ${userName} : ${messageContent}`);
    //فقط قم بتمرير البيانات التي تم تمريرها من مأخذ توصيل الكاتب
    const chatData = {
      userName: userName,
      messageContent: messageContent,
      roomName: roomName,
    };
    socket.broadcast
      .to(`${roomName}`)
      .emit("updateChat", JSON.stringify(chatData)); // يلزم تحليلها في كائن Kotlin في Kotlin
  });

  // socket.on('typing',function(roomNumber){ //Only roomNumber is needed here
  //     console.log('typing triggered')
  //     socket.broadcast.to(`${roomNumber}`).emit('typing')
  // })

  // socket.on('stopTyping',function(roomNumber){ //Only roomNumber is needed here
  //     console.log('stopTyping triggered')
  //     socket.broadcast.to(`${roomNumber}`).emit('stopTyping')
  // })

  socket.on("disconnect", function () {
    console.log("One of sockets disconnected from our server.");
  });
});
    // نقوم بتخزين اسم المستخدم في جلسة المقبس لهذا العميل
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    //صدى عالميًا (جميع العملاء) قام الشخص بالاتصال به
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // عندما يرسل العميل "كتابة" ، نقوم ببثها للآخرين
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // عندما يرسل العميل عبارة "توقف عن الكتابة" ، نقوم ببثها للآخرين
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // عندما يقطع المستخدم .. تنفيذ هذا
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // صدى عالميًا أن هذا العميل قد غادر
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
