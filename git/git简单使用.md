# git 简单使用(廖雪峰 git教程)

## git 安装

```
$ git config --global user.name "Your Name"

$ git config --global user.email "email@example.com"
```

## 创建版本库

```
// 创建目录
mkdir learngit
cd learngit

// 把这个目录变成Git可以管理的仓库
git init 

// 把文件添加到仓库
git add readme.txt

//把文件提交到仓库
git commit -m "readme"
```

## 版本回退

```
// 显示从最近到最远的提交日志
git log
// 嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline
git log --pretty=oneline

// 当前版本 HEAD ，上一版本 HEAD^, 上上版本 HEAD^^ (后者 HEAD~2)
git reset --hard HEAD^

// 使用 commit id
git reset --hard 3628164

// 记录你的每一次命令
git reflog

```

## 工作区和暂存区

第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。


```
// 查看状态
git status


```

## 撤销修改

```
// 文件回到最近一次git commit或git add时的状态
git checkout -- readme.txt

```
命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

```
// git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本
git reset HEAD readme.txt
```



场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。


## 删除文件

```

// 版本库中删除该文件
git rm test.txt

// 把误删的文件恢复到最新版本
git checkout -- test.txt

```

命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。

## 远程库（github）

第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

```
ssh-keygen -t rsa -C "youremail@example.com"

 ```

第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：

然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容.


为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。


### 添加远程库

登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库

在Repository name填入learngit，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库

```
git remote add origin git@github.com:yourname/learngit.git

// 第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令

git push -u origin master

git push origin master
```

### 从远程库克隆

首先，登陆GitHub，创建一个新的仓库，名字叫gitskills

```

git clone git@github.com:yourname/gitskills.git
```

你也许还注意到，GitHub给出的地址不止一个，还可以用https://github.com/michaelliao/gitskills.git这样的地址。实际上，Git支持多种协议，默认的git://使用ssh，但也可以使用https等其他协议。

使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。


## 分支管理

### 创建与合并分支

```
// 创建dev分支，然后切换到dev分支
git checkout -b dev

// 等同于
git branch dev
git checkout dev

// 查看当前分支
git branch

// 切换到主分支
git checkout master

// 把 dev 分支的工作成果合并到 master 分支上
git merge dev

// 删除dev分支
git branch -d dev

```

### 解决冲突



### 分支管理策略






