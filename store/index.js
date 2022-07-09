import Vuex from 'vuex';
// import { mutations } from './todos';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todoList: [
        {
          //id: 0,
          content: 'タスク例',
          status: '完了済',
          created: { date: '2020年04月30日', time: '17:00' },
        },
        /**
         * ↓下記のような形でどんどんタスクが追加されてく仕組み
         *  {
         *    content: '',
         *    created: { date: '', time: '' },
         *    status: '',
         *  }
         **/
      ],

      statusList: [
        { id: 0, label: '作業前' },
        { id: 1, label: '作業中' },
        { id: 2, label: '完了済' },
      ],
    }),

    mutations: {
      //タスクの作成・登録
      taskCreate: (state, obj) => {
        const dateObj = new Date();
        const weekList = ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'];

        //日付管理
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const date = dateObj.getDate();
        const weekday = weekList[dateObj.getDay()];

        //時間【0を付けて２桁に揃える】
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');

        //タスクを追加する
        state.todoList.unshift({
          content: obj.content,
          status: obj.status,
          created: {
            date: `${year}年${month}月${date}日${weekday}`,
            time: `${hours}:${minutes}`,
          },
        });
      },

      //作成したタスク内容を削除する
      remove: (state, obj) => {
        state.todoList.forEach((todo, index) => {
          if (todo.content == obj.content && todo.created == obj.created) {
            confirm(`${todo.content}を削除してよろしいですか？？`)

            //タスクのリストから一件のみ削除する
            return state.todoList.splice(index, 1);
          }
        })
      },

      /*
       * ↓for文だとこんな感じになる（forEachとの比較）
       * for (let i = 0; i < state.todoList.length; i++) {
       *   const todo = state.todoList[i];
       * }
       *
       * ↓微妙なif文分岐。。。
       * if ( todo.content == obj.content
       *  && todo.created == obj.created
       *  && todo.state == obj.state )
       */

      //状態タスクの切り替え
      changeState: (state, obj) => {
        state.todoList.forEach((todo) => {
          //todoListの内容とobjectの状態が一致していたら処理を実行する
          if (todo === obj) {
            let nowStatus;

            //ステータスリストと実際の作業状態が一致しているかをチェックする
            state.statusList.forEach((state, key) => {
              if (state.label == todo.status) {
                nowStatus = state.id;
              }
            })

            //チェックしたら次の作業状態に変更する
            nowStatus++;

            //idが3以上の場合は0からのスタートにする
            if (nowStatus >= state.statusList.length) {
              nowStatus = 0;
            }

            //次の作業状態に変更した値をobject側に返す
            obj.status = state.statusList[nowStatus].label;
            console.log(obj.status)
            return;
          }
        })
      }
    }
  })
}

export default createStore;
