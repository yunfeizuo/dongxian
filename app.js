var express = require('express');
var logger = require('morgan');
var path = require('path');
var xmlparser = require('express-xml-bodyparser');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('GET request to homepage');
});

app.get('/weixin', function(req, res) {
  var signature = req.param('signature');
  var timestamp = req.param('timestamp');
  var nonce = req.param('nonce');
  var echostr = req.param('echostr');

  //if (checkSignature(signature, timestamp, nonce)) {
  res.send(echostr);   // 确认来源是微信，并把echostr返回给微信服务器。
  // } else {
  //     res.json(200, { code : -1, msg : 'You aren't wechat server !'});
  // }
});

app.post('/weixin', xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
  console.log('Weixin pushed message: ' + req.body);
  var msg =
      '<xml>\
        <ToUserName>{0}</ToUserName>\
        <FromUserName>{1}</FromUserName>\
        <CreateTime>{2}</CreateTime>\
        <MsgType>text</MsgType>\
        <Content><![CDATA[您好!]]></Content>\
      </xml>';
  msg = msg.replace('{0}', req.body.xml.fromusername);
  msg = msg.replace('{1}', req.body.xml.tousername);
  msg = msg.replace('{2}', new Date().getTime());
  res.header("Content-Type", 'application/xml');
  res.send(msg);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = app;
