import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render(
  // ReactのコンポーネントからReduxのstoreにアクセスするためにはProviderコンポーネントが必要となります。
  // 下記1参照
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// 1
// index.jsファイルのルートコンポーネント<APP />をProviderコンポーネントで包みます。
// さらに作成したstoreをimportしてstoreをpropsとしてProviderコンポーネントに渡します。
// Providerコンポーネントは、ReactのコンポーネントからReduxのデータにアクセスするために必要な要素ですが、
// Providerだけではアクセスすることはできません。
// Reduxで共有化したデータにアクセスするためにconnect関数またはuseSelector Hookを利用します。