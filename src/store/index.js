import { createStore } from 'redux'

const initialState = {
  lists: [
    {
      name: "ブログを確認",
      complete: false,
    },
    {
      name: "メールの返信",
      complete: true,
    },
  ],
};

// createStoreの引数にはreducerが必須なのでreducerを作成します。
// その他下記1参照
const reducer = (state = initialState, action) => {
  return state
}
// createStore関数を使ってstoreの作成を行います。
const store = createStore(reducer)



export default store

// getStateメソッドによりstateにアクセスすることが可能.stateの状態を確認できます。
// console.log(store.getState());

// 1
// createStoreの引数にはreducerという関数が必須です。
// reducerは引数に現在のデータの状態を保持するstateを持ちます。
// 共有化したデータstateは唯一reducer関数の中だけで変更することが可能です。
// 引数のstateには初期値が必要となりreducer関数を実行すると必ずstateを戻します。
// reducerの中でstateを変更すると変更が反映された新しいstateが戻されることになります。





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