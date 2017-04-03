eroroChat
===================


http://eelee.herokuapp.com/


ディレクトリ構成

    "# eroroChat" 
    .
    ├── chat.js
    ├── DB.sql
    ├── doc
    │   ├── command01.sh
    │   └── command02.sh
    ├── index.html
    ├── package.json
    ├── Procfile
    └── README.md



アプリ設定を表示  
`heroku config --app <アプリ名>`  
`heroku config --app secret-gorge-46628`  

MySQLのリモートホストに接続するコマンド  
`mysql -h <ホスト名> -u <ユーザ名> -p`  
`mysql -h us-cdbr-iron-east-03.cleardb.net -u bac9292c240c4a -p`  

sqlファイルを実行するコマンド  
`source <sqlファイルパス>`  
`source ./DB.sql`  

herokuのリモートレポジトリを追加するコマンド  
`heroku git:remote -a <herokuアプリ名>`  
`heroku git:remote -a secret-gorge-46628`  

ログをリアルタイムで表示  
`heroku logs --tail --app <herokuアプリ名>`  
`heroku logs --tail --app secret-gorge-46628`  

