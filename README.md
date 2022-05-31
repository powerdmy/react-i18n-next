# react-i18n-next

react-i18next 多语言中文提示插件，根据多语言 key 提示中文（只支持中文语料不存储在本地的项目）

- 支持识别 `useTranslation` 和 `useI18n` hook

```javascript
export const Test = () => {
  const { t } = useTranslation();
  return <div>{t("key")}</div>;
};
```

```javascript
export const Test = () => {
  const { t } = useI18n();
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
  const { t } = useI18n("namespace");
  return <div>{t("key")}</div>; // // namespace.key
};
```

## 开始

1. 打开 vscode 命令行，输入 `更新中文语料`，选择此命令
   ![WX20220531-163757](https://user-images.githubusercontent.com/20468805/171149606-d510619c-339d-4e23-8ab4-cfc3acde218c.png)
2. 点击去配置
   ![WX20220531-163832](https://user-images.githubusercontent.com/20468805/171149907-3729fee3-7650-4091-83f9-19a505c808d0.png)
3. 输入远端的中文语料链接（json 数据格式）
   ![WX20220531-163908](https://user-images.githubusercontent.com/20468805/171150017-5d34b30c-9aac-42e9-989f-b9ee86e13c2e.png)
4. 配置成功

## 特点

### 1.key hover 提示

![pic](https://user-images.githubusercontent.com/20468805/171150219-f9991216-025b-45dc-9add-46fdee75899e.png)
