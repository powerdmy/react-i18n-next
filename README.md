# react-i18n-next

react-i18n-next 多语言插件（需要配置远端语料地址）

## 开始

### 配置

1. 复制多语言平台的中文 cdn 地址到粘贴板，一般是项目测试环境的语料

2. 打开 vscode 命令行，输入 `更新中文语料(i18nUpdate)`，选择此命令
   <br/>
   <img width="452" src="https://user-images.githubusercontent.com/20468805/171149606-d510619c-339d-4e23-8ab4-cfc3acde218c.png" />
3. 点击去配置
   <br/>
   <img width="452" src="https://user-images.githubusercontent.com/20468805/171149907-3729fee3-7650-4091-83f9-19a505c808d0.png" />
4. 粘贴刚复制的中文语料链接（json 数据格式）
   <br/>
   <img width="452" src="https://user-images.githubusercontent.com/20468805/171150017-5d34b30c-9aac-42e9-989f-b9ee86e13c2e.png" />
5. 配置成功

### 同步远端语料

如果多语言远端有更新，打开 vscode 命令行，执行 `更新中文语料(i18nUpdate)`，可以同步刚刚发布的语料到本地

## 特点

### key hover 提示

支持识别 `useTranslation` 和 `useI18n` hook 传入的命名空间，需要使用`t`作为转换函数名字

```javascript
export const Test = () => {
  const { t } = useTranslation();
  return <div>{t("key")}</div>;
};
```

```javascript
export const Test = () => {
  const t = useI18n();
  return <div>{t("key")}</div>;
};
```

- 支持传入命名空间

```javascript
export const Test = () => {
  const { t } = useTranslation("namespace");
  return <div>{t("key")}</div>; // namespace.key
};
```

```javascript
export const Test = () => {
  const t = useI18n("namespace");
  return <div>{t("key")}</div>; //  namespace.key
};
```

![pic](https://user-images.githubusercontent.com/20468805/171150219-f9991216-025b-45dc-9add-46fdee75899e.png)

### 中文转换成多语言 key

光标选中需要转换的代码(cmd+A 全选也可以)，右键选择`中文语料转换成key`，可以将中文替换为对应的 key。
<br/>
<img width="580" alt="tranform" src="https://user-images.githubusercontent.com/20468805/172346393-40d24ba1-11ea-4e57-a13a-05f340a5cf43.png">

### 通过中文查找 key

打开 vscode 命令行，执行 `中文定位到key(i18nSearch)`，输入想搜索的中文，可定位到具体的文件位置
