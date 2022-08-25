import React from "react";
import "./App.css";
import { useSelector } from "react-redux";

function App() {

  // useSelectorはstoreに保存されているstateデータの中から必要なデータを選択して取り出すことができます。
  // 下記1参照
  const lists = useSelector((state) => state.lists)

  return (
    <div className="App">
      <h1>ReduxでTodoリスト作成</h1>
      <h2>Todoリスト</h2>
      <ul>
      {/* useSelectorを利用してlistsの値を取得できたのでmap関数で展開し、ブラウザ上に表示させます。 */}
        {lists.map((list, index) => (
          <li key={index}>{list.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// 1
// Reduxのデフォルトの機能(mapStateToProps, connect)を利用してReduxのデータにアクセスを行ってきましたが、
// 新たにReact Hooksが登場し、redux-reactのuseSelector Hooksを利用することができます。
// useSelectorを利用するとmapStateToPropsとconnect関数をuseSelectorに置き換えることができるので、
// コードがすっきりします。