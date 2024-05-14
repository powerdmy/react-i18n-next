# react-i18n-next

react-i18n-next 多语言插件（需要配置远端语料地址）

## 开始

vscode 插件市场搜索 `react-i18n-next`，下载安装

| 命令行                             | 作用                                |
| ---------------------------------- | ----------------------------------- |
| 配置中文语料远端地址(i18nZhConfig) | 配置远端语料地址到项目              |
| 更新中文语料(i18nUpdate)           | 同步远端语料库到项目                |
| 中文语料转换到 key(i18nTransform)  | 中文文本替换成 `t(key)`             |
| 中文定位到 key(i18nSearch)         | 通过中文搜索，查出包含该 key 的文件 |

### 配置

1. 复制多语言平台的中文 cdn 地址到粘贴板，一般是项目测试环境的语料
2. 打开 vscode 命令行，输入 `更新中文语料(i18nUpdate)`，选择此命令
   `<br/>`
   `<img width="452" src="https://user-images.githubusercontent.com/20468805/171149606-d510619c-339d-4e23-8ab4-cfc3acde218c.png" />`
3. 点击去配置
   `<br/>`
   `<img width="452" src="https://user-images.githubusercontent.com/20468805/171149907-3729fee3-7650-4091-83f9-19a505c808d0.png" />`
4. 粘贴刚复制的中文语料链接（json 数据格式）
   `<br/>`
   `<img width="452" src="https://user-images.githubusercontent.com/20468805/171150017-5d34b30c-9aac-42e9-989f-b9ee86e13c2e.png" />`
5. 配置成功

### 同步远端语料

如果多语言远端有更新，打开 vscode 命令行，执行 `更新中文语料(i18nUpdate)`，可以同步刚刚发布的语料到本地

## 特点

### key hover 提示

支持识别 `useTranslation` 和 `useI18n` hook 传入的命名空间，需要使用 `t或者I18n或者i18n`作为转换函数名字

支持通过 react-i18n-next.translateFn 字段配置翻译函数，默认 `t|I18n|i18`

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

光标选中需要转换的代码(cmd+A 全选也可以)，右键选择 `中文语料转换到key(i18nTransform)`，可以将中文替换为对应的 key。
`<br/>`
`<img width="452" alt="tranform" src="https://user-images.githubusercontent.com/20468805/172346393-40d24ba1-11ea-4e57-a13a-05f340a5cf43.png">`

### 通过中文查找 key

打开 vscode 命令行，执行 `中文定位到key(i18nSearch)`，输入想搜索的中文，可查找到该中文对应的文件位置

1. 输入想搜索的中文
   `<br/>`
   `<img width="452" alt="tranform" src="https://user-images.githubusercontent.com/20468805/174032716-cc0ce1f5-0f37-4fc0-ba34-2bbbcade4cdf.png ">`
2. 选择要跳转的文件
   `<br/>`
   `<img width="452" alt="tranform" src="https://user-images.githubusercontent.com/20468805/174034083-46836af9-aa2c-4be8-9276-b9ede0c5be44.jpg"/>`
