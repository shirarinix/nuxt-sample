<template>
  <section class="container">
    <h1>TodoList</h1>

    <div class="addArea">
      <!--
        /** 直接ラベル入力する形 **/
        <input
          type="text"
          id="addStatus"
          v-model="status"
          placeholder="ステータス"
        />
      -->
      <input
        type="text"
        id="addTask"
        v-model="content"
        placeholder="タスクを入力"
      />

      <select v-on:change="selected_state" class="selected">
        <option value="" disabled selected style="display: none">
          <span style="color: red">ステータス選択</span>
        </option>
        <option>{{ state.before.label }}</option>
        <option>{{ state.working.label }}</option>
        <option>{{ state.completion.label }}</option>
      </select>

      <button id="addButton" class="button button--add" @click="input_task()">
        追加
      </button>
    </div>

    <div class="filter">
      <!--
        /** 直接ラベル入力する形 **/
        <button
          class="button button--gray"
          v-bind:class="{ 'is-active': id === 0 ? true : false }"
          @click="status_label(state.reset)"
        >
          リセット
        </button>
      -->
      <div class="sortStatus">【ステータス検索】</div>

      <button
        class="button button--gray"
        v-bind:class="{ 'is-active': is_active && id === 0 }"
        @click="find_status(is_active, state.reset)"
      >
        全て
      </button>

      <button
        class="button button--gray"
        v-bind:class="{ 'is-active': is_active && id == 1 }"
        @click="find_status(is_active, state.before)"
      >
        作業前
      </button>

      <button
        class="button button--gray"
        v-bind:class="{ 'is-active': is_active && id == 2 }"
        @click="find_status(is_active, state.working)"
      >
        作業中
      </button>

      <button
        class="button button--gray"
        v-bind:class="{ 'is-active': is_active && id == 3 }"
        @click="find_status(is_active, state.completion)"
      >
        完了済
      </button>
    </div>

    <div>{{ status }}</div>

    <table class="lists">
      <thead>
        <tr>
          <th>タスク</th>
          <th>登録日時</th>
          <th>作業状態</th>
          <th>↓削除</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in displayTodoList" v-bind:key="index">
          <td>{{ item.content }}</td>
          <td>
            {{ item.created.date }}<br />
            {{ item.created.time }}
          </td>
          <td>
            <button
              class="button"
              v-bind:class="{
                'button--before': item.status == '作業前',
                'button--working': item.status == '作業中',
                'button--completion': item.status == '完了済',
              }"
              @click="changeState(item)"
            >
              {{ item.status }}
            </button>
          </td>
          <td>
            <button class="button button--delete" @click="remove(item)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
// import { Select } from "element-ui";
import { mapState } from "vuex";

export default {
  data() {
    return {
      //選ラベルのフラグ
      is_active: false,

      //タスクを追加した際の入力値
      id: "",
      content: "",
      status: "",
      created: { date: "", time: "" },

      //タスクの状態を表わすラベル
      state: {
        reset: { id: 0, label: false },
        before: { id: 1, label: "作業前" },
        working: { id: 2, label: "作業中" },
        completion: { id: 3, label: "完了済" },
      },
    };
  },

  computed: {
    //スプレッド演算子
    ...mapState(["todoList"]),

    //作業状態を検索する機能
    displayTodoList() {
      //作業タスクを検索した際のリスト
      let findStatusList = [];

      if (this.is_active && this.id !== 0) {
        this.todoList.forEach((elem) => {
          //一致した作業状態のみ表示させる処理
          if (elem.status == this.status) {
            findStatusList.push(elem);
            console.log(findStatusList);
          }
        });
        return findStatusList;
      } else {
        return this.todoList;
      }
    },
  },

  methods: {
    selected_state(event) {
      this.status = event.target.value;
    },

    input_task() {
      if (!this.content) {
        alert("タスクを入力してください！");
      } else {
        this.$store.commit("taskCreate", {
          content: this.content,
          status: this.status || this.state.before.label,
        });
      }
    },

    remove(todo) {
      this.$store.commit("remove", todo);
    },

    changeState(todo) {
      this.$store.commit("changeState", todo);
    },

    /*
     * 直接ラベルから入力する形
     * status_label(state) {
     * this.id = state.id;
     * this.status = state.label;
     *   if (state.id == 0) {
     *     setTimeout(() => {
     *       this.id = "";
     *     }, 1000);
     *   }
     * },
     */

    find_status(flag, state) {
      this.is_active = true;

      this.id = state.id;
      this.status = state.label;

      if (this.id === 0) {
        setTimeout(() => {
          this.is_active = this.status;
        }, 2000);
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.addArea {
  width: 100%;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addArea #addTask {
  width: 70%;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
  border: 2px solid #6fa291;
}
/* .addArea #addStatus {
  width: 20%;
  height: 30px;
  text-align: center;
  margin-right: 10px;
  border-radius: 5px;
  border: 2px solid #6fa291;
} */
.selected {
  width: 20%;
  height: 35px;
  text-align: center;
  margin-right: 10px;
  border-radius: 5px;
  border: 2px solid #6fa291;
}
.button {
  width: 100px;
  height: 35px;
  margin: 5px;
  padding: 5px;
  border: 2px solid;
  border-radius: 5px;
}
.button:hover {
  opacity: 0.3;
}
.button.button--add {
  color: #6fa291;
  border-radius: 5px;
}
.button.button--delete {
  color: #d37276;
  border-radius: 5px;
}
.button.button--gray {
  border-radius: 5px;
  background: #fff;
  border: 2px solid black;
}
.button.button--gray.is-active {
  color: #ff9ca0;
  font-weight: bold;
  background: #efefef;
}
.button.button--before {
  color: #fff;
  font-weight: bold;
  background: #ff9ca0;
  border: 2px solid black;
}
.button.button--working {
  color: #fff;
  font-weight: bold;
  background: #e6a23c;
  border: 2px solid black;
}
.button.button--completion {
  color: #fff;
  font-weight: bold;
  background: #6fa291;
  border: 2px solid black;
}
.filter {
  margin-bottom: 20px;
}
.sortStatus {
  text-align: center;
}
.lists {
  width: 100%;
  border-spacing: 0px;
}
.lists th {
  border-bottom: 3px solid black;
}
.lists td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
}
</style>
