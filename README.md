# 254 Scouting
A webapp used to help robotics teams scout potential alliance members at tournaments and other events. Uses a templating system to allow the team to create a template in advance, and then to use that template to scout all the teams at an event.

## Setup
1. Download/Install Mongo
* <code>git clone github.com/vidurm09/254scouting.git</code>
* <code>cd 254scouting</code>
* In config.js set <code>config.host.ip = "<i>Your IP</i>"</code>
* <code>cd web/js</code>
* In config.js set <code>serverURL: 'http://<i>Your IP</i>:80'</code>
* In config.js set <code>websockets: 'ws://<i>Your IP</i>:82'</code>
* <code>cd ../.. </code>
* <code>sudo node server.js</code>
