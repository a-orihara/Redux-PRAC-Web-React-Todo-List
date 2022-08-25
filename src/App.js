import React, { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {

  // useSelectorはstoreに保存されているstateデータの中から
  // 必要なデータを選択して取り出すことができます。
  // 下記1参照
  const lists = useSelector((state) => state.lists);

  // Storeに保管されているデータを変更する必要があるので、dispatch関数を利用してreducedrにACTIONを通知します
  const dispatch = useDispatch();

  // dispatch関数でreducerにACTIONの”DONE_LIST”を実行するように通知
  const doneList = (name) => {
    // dispatch関数の引数にはACTIONを設定する必要があります。
    // { type: "DONE_LIST", playload: name} = Action。Actionはtypeを持つオブジェクト。
    // 下記2参照
    // payloadにはdoneListメソッドから渡されるnameを設定。nameはリストを特定する際に利用。
    dispatch({ type: "DONE_LIST", payload: name });
  };

  const deleteList = (name) => {
    dispatch({ type: "DELETE_LIST", payload: name });
  };

  // useStateを利用することでFunctionコンポーネントにデータ(変数)を保持することができます。
  // TodoリストのプロパティであるnameとcompleteをuseStateを使って、変数として宣言し入力フォームで入力した値を保持。
  const [name, setName] = useState("");
  const [complete, setComplete] = useState(false);

  const inputText = (e) => {
    setName(e.target.value);
  };

  const addList = () => {
    // もしnameに値がない場合はdispatchは行いません。
    if (!name) return;
    // payloadにはオブジェクトでnameとcompoleteの値を入れます。
    // nameには入力フォームで入力した値、completeはfalseが入っています。
    setComplete(false);
    dispatch({type: "ADD_LIST", payload: {name, complete},});
    setName("");
  };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  
  return (
    <div className="App">
      <h1>ReduxでTodoリスト作成</h1>
      {/* value={name}:入力された値valueはnameという変数で受けとれる */}
      <input type="text" value={name} onChange={inputText} />
      <button onClick={addList}>追加</button>
      <h2>未完了のTodoリスト</h2>
      <ul>
        {/* useSelectorを利用してlistsの値を取得できたのでmap関数で展開し、ブラウザ上に表示させます。 */}
        {lists
          .filter((list) => list.complete === false)
          .map((list, index) => (
            <div key={index}>
              {list.name}
              <button onClick={() => doneList(list.name)}>完了</button>
              <button onClick={() => deleteList(list.name)}>削除</button>
            </div>
          ))}
      </ul>
      <h2>完了したTodoリスト</h2>
      <ul>
        {/* useSelectorを利用してlistsの値を取得できたのでmap関数で展開し、ブラウザ上に表示させます。 */}
        {lists
          .filter((list) => list.complete === true)
          .map((list, index) => (
            <div key={index}>{list.name}</div>
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

// 2
// Actionとはtypeプロパティを持っているJavaScriptのオブジェクトです。
// Actionはpayloadプロパティも持たせることができpayloadを使ってreducerに値を渡すことができます。
// reducerはその受け取った値を使って処理を行います。
// reducerがActionを受け取ってStoreのデータに対して変更を加えます。
// ActionはオブジェクトなのでACTION自体が何かの処理を行うことはありません。






// iimport React, { useState } from "react";
// import "./App.css";
// import { useSelector, useDispatch } from "react-redux";

// function App() {
//   const lists = useSelector((state) => state.lists);
//   const dispatch = useDispatch();
//   const doneList = (name) => {
//     dispatch({ type: "DONE_LIST", payload: name });
//   };
//   const deleteList = (name) => {
//     dispatch({ type: "DELETE_LIST", payload: name });
//   };

//   const [name, setName] = useState("");
//   const [complete, setComplete] = useState(false);

//   const inputText = (e) => {
//     setName(e.target.value);
//   };

//   const addList = () => {
//     if (!name) return;

//     setComplete(false);

//     dispatch({
//       type: "ADD_LIST",
//       payload: {
//         name,
//         complete,
//       },
//     });
//     setName("");
//   };
//   return (
//     <div className="App">
//       <h1>ReduxでTodoリスト作成</h1>
//       <input type="text" value={name} onChange={inputText} />
//       <button onClick={addList}>追加</button>
//       <h2>未完了のTodoリスト</h2>
//       <ul>
//         {lists
//           .filter((list) => list.complete === false)
//           .map((list, index) => (
//             <div key={index}>
//               {list.name}
//               <button onClick={() => doneList(list.name)}>完了</button>
//               <button onClick={() => deleteList(list.name)}>削除</button>
//             </div>
//           ))}
//       </ul>
//       <h2>完了したTodoリスト</h2>
//       <ul>
//         {lists
//           .filter((list) => list.complete === true)
//           .map((list, index) => (
//             <div key={index}>{list.name}</div>
//           ))}
//       </ul>
//     </div>
//   );
// }

// export default App;