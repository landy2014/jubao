# 发布到阿里云服务器，采用rsync同步方式
rsync -rvz --delete --exclude-from './exclude.list' ./backend/ root@47.90.92.158:/var/www/backend/