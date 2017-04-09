/**
* ユーザログイン画面のコントローラ
*
* Created by Kozuka
* Created on 2017/03/24
* Updated by 
* Updated on 
**/
var UserSignUpController = function(app, CommonConst, DbConnection){

	//ユーザ登録画面にGETしたときの処理
	app.get('/user_sign_up', function(req, res, next) {
  		res.render(CommonConst.PAGE_ID_USER_SIGN_UP, {
    		title: '新規会員登録'
  		});
	});

	//登録ボタンをクリックしたときの処理
	app.post('/user_sign_up', function(req, res, next) {

		//フィールド
		var fields  = {
			user_name		: req.body.user_name
		,	user_password	: req.body.password
		,	email			: req.body.email
		};

		//クエリを作成
		var queryArray = [];
		queryArray.push('SELECT'						);
		queryArray.push('*'								);
		queryArray.push('FROM'							);
		queryArray.push(CommonConst.TABLE_NAME_USER		);
		queryArray.push('WHERE'							);
		queryArray.push('USER_NAME='						);
		queryArray.push('\'' + req.body.user_name + '\''	);
		queryArray.push('LIMIT 1'						);
		//クエリを結合
		var query = queryArray.join(' ');

		(function () {
			return new Promise(function(resolve, reject) {
				//クエリ実行
	    		DbConnection.query(query, function(err, rows, fields) {
	    		    if (err) {
	    		        console.log('error: ', err);
	    		        reject();
	    		    }
					resolve(rows);
	    		});
			});
		})()
		//セレクト結果を受け取る
		.then(function(result) {
			return new Promise(function(resolve, reject) {
				console.log(result);

				//ユーザ名重複チェック
				var userNameExists = result.length === 1;
				if (userNameExists) {
					reject();
				}

				//インサート
				connection.query(
						'INSERT INTO t_user SET ?'
					,	fields
					,	function (error, results, fields) {
							if (error) throw error;
								console.log(result.insertId);
						}
				);
				resolve();
			});
		})
		//インサート処理後
		.then(
			function() {
				res.redirect('/chat');
			}
		)
		//ユーザ重複の場合
		.catch(
			function() {
				res.render(CommonConst.PAGE_ID_USER_SIGN_UP, {
					title: '新規会員登録',
					userNameExists: '既に登録されているユーザ名です'
				});
			}
		)
	});

};
module.exports = UserSignUpController;