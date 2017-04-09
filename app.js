/**
* アプリ全体の設定やらいろいろ
*
* Created by aska-fun
* Created on 2017/04/01
* Updated by 
* Updated on 
**/

/*
 * モジュール
 */
//expressモジュールをロードし、インスタンス化してappに代入
var express		= require('express'			);
var app			= express();
var http		= require('http').Server(app);
var bodyParser	= require('body-parser'										);
var session		= require('express-session'									);
//var passport	= require('passport');

/**
 * Viewディレクトリを設定
 **/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/**
 * ミドルウェア
 * まだよくわかっていない
 * 要勉強
 **/
// if access with name of filename, then responses the files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
	secret				: 'keyboard cat',
	resave				: false,
	saveUninitialized	: true
}));
//app.use(passport.initialize());

/**
 * 共通処理を呼び出し
 **/
var CommonConst					= require('./bin/CommonConst.js'							);
var DbConnection				= require('./bin/DbConnection.js'							);

console.log('▲▲▲' + DbConnection);

/**
 * コントローラ
 **/
//メニュー画面
ChatController					= require("./routes/ChatController.js"					)(app, http, CommonConst, DbConnection);
//ユーザ管理
UserSignUpController			= require("./routes/UserSignUpController.js"			)(app, CommonConst, DbConnection);
UserLogInController				= require("./routes/UserLogInController.js"				)(app, CommonConst, DbConnection);


//接続待ち状態になる
var PORT		= process.env.PORT || 8080;
http.listen(PORT, function() {
	console.log('接続開始：', PORT);
});
