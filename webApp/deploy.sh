rm -v build.tar.gz

ng build --prod --verbose

tar -zcvf build.tar.gz ./dist/webApp/*

sshpass -p "r0jebErto" scp build.tar.gz root@161.35.10.72:/var/www/system.navyduckgames.com/

sshpass -p "r0jebErto" ssh root@161.35.10.72 'tar -zxvf /var/www/system.navyduckgames.com/build.tar.gz'

sshpass -p "r0jebErto" ssh root@161.35.10.72 'rm -rf /var/www/system.navyduckgames.com/*'

sshpass -p "r0jebErto" ssh root@161.35.10.72 'mv ~/dist/webApp/* /var/www/system.navyduckgames.com/'
