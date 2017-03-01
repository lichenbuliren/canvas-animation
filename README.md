### canvas 动画练习

``` javascript
// 三维左边转换为二维坐标公式
x1 = x * cos(angleZ) - y * sin(angleZ)
y1 = y * cos(angleZ) + x * sin(angleZ)

x1 = x * cos(angleY) - z * sin(angleY)
z1 = z * cos(angleY) + x * sin(angleY)

y1 = y * cos(angleX) - z * sin(angleX)
z1 = z * cos(angleX) + y * sin(angleX)
```
#### 安装依赖
 进入到项目文件夹
``` shell
npm install
```