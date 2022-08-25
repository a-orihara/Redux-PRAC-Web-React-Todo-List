import { createStore } from 'redux'

const initialState = {
  lists: [
    {
      name: "ブログを確認",
      complete: false,
    },
    {
      name: "メールの返信",
      complete: false,
    },
    {
      name: "ラジオ体操",
      complete: true,
    },
  ],
};

// const a = [{papa: 'teru'}, {papa: 'ruru'}];
// console.log(a)
// const b = {papa: 'sasa'};
// const c = [...a, b]
// console.log(c)

// createStoreの引数にはreducerが必須なのでreducerを作成します。
// 下記1参照
const reducer = (state = initialState, action) => {
  // Actionとはtypeプロパティ、playloadプロパティを持っているJavaScriptのオブジェクトです。
  // ref:{ type: "DONE_LIST", playload: name} = Action。
  // 下記2参照
  switch (action.type) {
    // reducerではstateそのものを変更するのではなく,
    // 現在のstateを元に新しいstateを作成する必要があるため下記のようなコードとなります。

    // reducerでは現在のstateに対してACTION内に記述されている処理を適用し、新しいstateを作成します。
    case "ADD_LIST":
      return {
        // action.payload=payload: {name,complete}
        lists: [...state.lists, action.payload],
      };

    case "DONE_LIST":
      // listsのオブジェクトを返却
      // payloadのname(選択されたlista.name)と異なるリストはそのまま戻し、payloadのnameと一致するリスト名を持つリストを取り出して、
      // completeプロパティの値をtrueに設定して新しいstateとして戻しています。
      return {
        lists: state.lists.map((list) =>{
          // 厳密不等価 (!==):2つのオペランドが等しくないことを検査し、論理値で結果を返します。
          if (list.name !== action.payload) return list;
          return {
            // コピー元のプロパティも書き変わってしまうので、値のみをコピーするようにしたい場合はスプレッド構文を使います。
            // 下記3参照
            // list={name:,complete:}をcomplete:だけtrueにして戻す
            ...list,
            complete: true,
          };
        }),
      };
    
    case "DELETE_LIST":
      // state.listsからpayloadで受け取ったnameを持つリストを削除するのではなく、
      // 現在のstate.listsの中からfilterを使ってpayloadのnameを持たないリストのみを取り出して新しいstateにしています。
      // ここでも既存のstateを更新するのではなく既存のstateから新しいstateを作成しています。
      return {
        lists: state.lists.filter((list) => list.name !== action.payload),
      };
      
    default:
      return state;
  }
}
// createStore関数を使ってstoreの作成を行います。
const store = createStore(reducer)



export default store

// getStateメソッドによりstateにアクセスすることが可能.stateの状態を確認できます。
// console.log(store.getState());

// 1
// createStoreの引数にはreducerという関数が必須です。
// reducerは引数に現在のデータの状態を保持するstateとactionを引数にとることができます。
// 共有化したデータstateは唯一reducer関数の中だけで変更することが可能です。
// 引数のstateには初期値が必要となりreducer関数を実行すると必ずstateを戻します。
// reducerの中でstateを変更すると変更が反映された新しいstateが戻されることになります。

// 2
// action.typeをチェックすることでtypeによって異なる処理を行えるように設定を行います。
// typeによって異なる処理を行わせるためにswitch関数を使って分岐させます。
// Actionのtypeによりreducerでどのような処理を行うかを設定した後はActionをreducerに伝える方法が必要となります。
// ACTIIONをreducerに伝えるための方法がdispatch関数です。

// 3
// let sweets1 = { cookie:'クッキー', chocolate:'チョコレート', candy:'飴'};
// let sweets2 = { poteto:'ポテチ', ...sweets1, poteto_stick:'じゃがりこ'};
// console.log(sweets2); 
// 結果：{ poteto: 'ポテチ', cookie: 'クッキー',　chocolate: 'チョコレート', candy: '飴', poteto_stick: 'じゃがりこ'}
// 値だけコピーされるので、sweets2.cookie = "Cookie!!"などと変更しても、sweets1は変わりません。

// // 分けたreducerを一緒に利用するためにcombineReducersを利用します。
// // combineReducersの引数のオブジェクトには作成したreducerを設定します。
// const rootReducer = combineReducers({countReducer, postReducer}); 

// // createStore関数を使ってstoreの作成を行います。
// const store = createStore(rootReducer);
// // getStateメソッドによりstateにアクセスすることが可能.stateの状態を確認できます。
// console.log(store.getState());

// export default store;

// createStoreの引数にはreducerという関数が必須です。
// 共有化したデータstateは唯一reducer関数の中だけで変更することが可能です。
// reducerは引数に現在のデータの状態を保持するstateを持ちます。
// 引数のstateには初期値が必要となりreducer関数を実行すると必ずstateを戻します。
// reducerの中でstateを変更すると変更が反映された新しいstateが戻されることになります。