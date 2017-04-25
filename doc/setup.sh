#!/bin/sh

echo "セットアップを開始します"

echo -n herokuのアカウントは登録済ですか? [yes/no]
read answer
if [ "$answer" != "yes" ]; then
	echo "中止しました"
	exit;
fi

echo -n herokuのアカウントにクレジットカード情報を登録していますか? [yes/no]
read answer
if [ "$answer" != "yes" ]; then
	echo "中止しました"
	exit;
fi

echo -n eroroChatプロジェクトディレクトリ直下にいますか? [yes/no]
read answer
if [ "$answer" != "yes" ]; then
	echo "中止しました"
	exit;
fi

echo "herokuにログインします"
heroku login
echo "ログインしました"

echo "herokuアプリを作成します"
echo -n アプリ名を入力してください（半角英数字） :
read app_name
heroku create $app_name
echo "アプリを作成しました"

echo "アプリにclearDB MySQLアドオンを追加します"
heroku addons:create cleardb:ignite 
echo "アドオンを追加しました"

echo "DBに接続してテーブルを作成します"
#mysql -h us-cdbr-iron-east-03.cleardb.net -u bac9292c240c4a -p
db_config=`heroku config --app $app_name | grep CLEARDB_DATABASE_URL`
#ホスト名
db_host=`echo ${db_config} | sed -e "s/^.*\@\(.*\)\/.*$/\1/"`
#ユーザ名
db_user_name=`echo ${db_config} | sed -e "s/^.*\/\/\(.*\):.*$/\1/"`
#パスワード
db_password=`echo ${db_config} | sed -e "s/^.*:\(.*\)\@.*$/\1/"`
#DB名
db_name=`echo ${db_config} | sed -e "s/^.*\@.*\/\(.*\)?.*$/\1/"`
mysql -h $db_host -u $db_user_name -p << END_OF_INPUT
echo ${db_password}
use ${db_name};
source ./doc/DB.sql;
quit;
END_OF_INPUT

