# nodejs-vanilla-ssh
simple node web app with ssh

SSH - secure shell.
Secure communication with another machine.

SSH workflow based on ssh key pair.
To setup SSH need to use git bash.
steps:
1. check for existing ssh keys
> ls -a -l ~/.ssh
2. create ssh key 
> ssh-keygen -t rsa -b 4096 -C "new comment"
3. register and run new private key file

for windows
> eval $(ssh-agent -s)

for Linux 
> eval "$(ssh-agent -s)"

if its running successfully you will see:
Agent pid 207 (where pid stands for "process id")

4. register file ssh-add "filepath"

for Windows and Linux
> ssh-add ~/.ssh/id_rsa

for Mac
> ssh-add -K ~/.ssh/id_rsa

5. go to https://github.com/settings/profile
select "SSH and GPG keys" => "new SSH key"
fill up "Title"
then at your terminal run
> cat ~/.ssh/id_rsa.pub
that will print your ssh key content copy and paste it to the github "Key"
and press "Set KEY"

6. test SSH connection
> ssh -T git@github.com
yes

7. use git set remote repo channel and push your code to the github
look for instructions at your github repo.

at Windows explorer address bar or through windows+R command
> %USERPROFILE%\ssh or  %USERPROFILE%\.ssh

# To find out which entry is for a known hostname in known_hosts
> ssh-keygen -H  -F "hostname or IP address"
# To delete a single entry from known_hosts
> ssh-keygen -R "hostname or IP address"
# remove ssh file with keys
> rm -rf ~/.ssh
