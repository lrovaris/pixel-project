rm -v build.tar.gz

tar --exclude='./node_modules' --exclude='./deploy.sh' --exclude='./uploads/images' -zcvf build.tar.gz ./*

sshpass -p "r0jebErto" scp build.tar.gz root@161.35.10.72:~/

sshpass -p "r0jebErto" ssh root@161.35.10.72 'tar -zxvf ~/build.tar.gz'

sshpass -p "r0jebErto" ssh root@161.35.10.72 'rm -v ~/build.tar.gz'
