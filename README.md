# react-i18n-next

react-i18next 多语言中文提示插件，根据多语言 key 提示中文（需要配置远端语料地址）

[插件下载](https://git.duowan.com/dengmingyu1/vscode-react-i18n-next/-/raw/master/react-i18n-next-0.0.1.vsix?inline=false)

- 支持识别 `useTranslation` 和 `useI18n` hook，需要使用`t`作为转换函数名字

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

## 开始

### 安装

下载文件，选择从 VSIX 安装，选择刚下载的 VSIX 文件
<br/>
<img width="452" alt="install" src="https://user-images.githubusercontent.com/20468805/171160229-7c7e1aeb-e28d-4788-a56b-c19cb888214e.png">

### 配置

1. 打开 vscode 命令行，输入 `更新中文语料`，选择此命令
   <br/>
   <img width="452" src="https://user-images.githubusercontent.com/20468805/171149606-d510619c-339d-4e23-8ab4-cfc3acde218c.png" />
2. 点击去配置
   <br/>
   <img width="452" src="https://user-images.githubusercontent.com/20468805/171149907-3729fee3-7650-4091-83f9-19a505c808d0.png" />
3. 输入远端的中文语料链接（json 数据格式）
   <br/>
   <img width="452" src="https://user-images.githubusercontent.com/20468805/171150017-5d34b30c-9aac-42e9-989f-b9ee86e13c2e.png" />
4. 配置成功

## 特点

### key hover 提示

![pic](https://user-images.githubusercontent.com/20468805/171150219-f9991216-025b-45dc-9add-46fdee75899e.png)
