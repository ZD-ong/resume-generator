# resume-generator

此版本为第一个版本，功能都已经实现（注册登录、换肤、分享链接、打印PDF），但是在引入 vue-router 时出现问题，决定重写。
算是搭了个架子，还没有写好看的样式
![预览](https://i.loli.net/2018/05/28/5b0bad2cc2383.png)

## resume-generator2.0
[代码链接](https://github.com/ZD-ong/resume2.0)
此版本 ResumePreview 严重依赖 ResumeEditor，ResumePreview 不能从其他的地方读入 resume 数据，在登录后获取用户简历时出现问题。决定引入 vuex 做全局数据源，再次重写。。。
样式都已经写好了。。。说多了都是泪。。。

预览如图：
![](https://i.loli.net/2018/05/28/5b0bae60067d8.png)
![](https://i.loli.net/2018/05/28/5b0bae60110bd.png)
![](https://i.loli.net/2018/05/28/5b0baeae9e93e.png)
![](https://i.loli.net/2018/05/28/5b0baeaea701f.png)

### resume-generator3.0
[代码链接](https://github.com/ZD-ong/resume-generator3.0)
不断的遇到新的问题啊。。。说啥也不重写了，吸取前两版的教训，使用 vue-router 和 vuex ，问题还是出在数据上，一定解决！
