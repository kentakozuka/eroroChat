0.
herokuのアカウントを作成する

1.
command01.shを実行
$ bash command01.sh

2.
package.json内のname項目をherokuアプリ名に変更

3.
command01.shを実行
$ bash command01.sh


MySQLのリモートホストに接続するコマンド
mysql -h <ホスト名> -u <ユーザ名> -p
mysql -h us-cdbr-iron-east-03.cleardb.net -u bac9292c240c4a -p

herokuのリモートレポジトリを追加するコマンド
heroku git:remote -a <herokuアプリ名>
heroku git:remote -a secret-gorge-46628

アプリ設定を表示
heroku config --app secret-gorge-46628


ログをリアルタイムで表示
heroku logs --tail --app secret-gorge-46628

"# eroroChat" 
