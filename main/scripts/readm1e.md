# 热加载
    边开发边玩模式。用编好的代码即时去玩儿。
    两台 电脑

- script放node端（避免webpack端刷新）
= 浏览器端不提供 script.start(),全部用热加载驱动。
    window.dm = dm 不需要remote.require。

## 好处
    连图片刚存上去就能生效。