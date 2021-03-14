# gene-tree
一个基于 `phylotree.js` 进行二次开发的基因可视化进化树，主要用于基因序列可视化分析等，目前该版本只是简单的示例，若用于生产环境中需进一步开发。。。

## 特征
+ 支持选择分支的几种机制，包括进化枝，到根的路径，单个分支，内部分支，叶子和布局后附近的分支。
+ 支持线性，径向，按比例缩放的分支，按尖端对齐和按比例缩放的尖端尺寸视图。
+ 可以限制查看器以适合给定的SVG框，也可以根据树的大小进行缩放。
+ 支持缩放比例、动画重生、阶梯化、进化支崩溃并躲藏起来探索大树
+ 部分支持自定义提示名称的显示方式
+ 根据分支属性（例如非线性标度）变换分支长度。
+ 支持左右对齐方式、默认升降序布局等功能。
+ 部分支持 Newick / PhyloXML / NexML / tree 文件在本地解析功能。
## 快速开发
```bash
# 下载
git clone https://github.com/zlluGitHub/gene-tree.git

# 初始化
cd gene-tree
npm install

# 运行
npm run dev
```
在浏览器中打开: `http://localhost:3000/examples/`

## 快速打包
```bash
npm run build
```
## 部分案例
- **案例1：** 本案例位于 [leafdata](http://localhost:3000/examples/leafdata/) 文件夹下，截图如下：

    ![Alt Text](/images/leafdata.png)

- **案例2：** 本案例位于 [leafdata-legend](http://localhost:3000/examples/leafdata-legend/) 文件夹下，截图如下：

    ![Alt Text](/images/leafdata-legend.jpg)

- **案例3：** 本案例位于 [large-ancestral-structural-viewer](http://localhost:3000/examples/large-ancestral-structural-viewer/) 文件夹下，截图如下：

    ![Alt Text](/images/structure.gif)

- **案例4：** 本案例位于 [phylo-bar](http://localhost:3000/examples/phylo-bar/) 文件夹下，截图如下：

    ![Alt Text](/images/bar.gif)

## 参考资料
Phylotree.js官方文档：[http://phylotree.hyphy.org/documentation](http://phylotree.hyphy.org/documentation/)
