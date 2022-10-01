// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);

const http = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const basketball = io.of("/1");
const basketball = io.of("/2");
const basketball = io.of("/3");
const basketball = io.of("/4");
const basketball = io.of("/5");
const basketball = io.of("/6");
const basketball = io.of("/7");
const basketball = io.of("/8");
const basketball = io.of("/9");
const basketball = io.of("/10");
const basketball = io.of("/11");
const basketball = io.of("/12");
const basketball = io.of("/13");
const basketball = io.of("/14");
const basketball = io.of("/15");
const basketball = io.of("/16");
const basketball = io.of("/18");
const basketball = io.of("/19");
const basketball = io.of("/20");
const basketball = io.of("/21");
server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// التوجيه
app.use(express.static(path.join(__dirname, 'public')));

// غرفة الدردشة

let numUsers = 0;

io.on('connection', (socket) => {
	var addedUser = false;
	console.log('connect');

	// عندما يرسل العميل "رسالة جديدة" ، فإن هذا يستمع وينفذ
	socket.on('new message', (data) => {
		//نطلب من العميل تنفيذ "رسالة جديدة"
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});

	// عندما يصدر العميل "إضافة مستخدم" ، فإن هذا يستمع وينفذ
	socket.on('add user', (username) => {
		if (addedUser) return;

		// نقوم بتخزين اسم المستخدم في جلسة المقبس لهذا العميل
		socket.username = username;
		++numUsers;
		addedUser = true;
		socket.emit('login', {
			numUsers: numUsers
		});
		// صدى عالميًا (جميع العملاء) قام الشخص بالاتصال به
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

	//عندما يقطع المستخدم .. تنفيذ هذا
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

	socket.on('fromClient', () => {
		socket.broadcast.emit('fromClient', {
			username: socket.username
		});
		console.log('from client');

	});

	socket.on('clientMessage', () => {
		socket.broadcast.emit('clientMessage',{
		});
		console.log('connect');
	});


  // عندما يرسل العميل "رسالة جديدة" ، فإن هذا يستمع وينفذ
  socket.on('new message', (data) => {
    // نطلب من العميل تنفيذ "رسالة جديدة"
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // عندما يصدر العميل "إضافة مستخدم" ، فإن هذا يستمع وينفذ
  socket.on('add user', (username) => {
    if (addedUser) return;

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
