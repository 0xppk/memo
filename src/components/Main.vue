<template >
    <div class="back" :class="{ curtain: !닉네임인풋사라짐 }"></div>
    <div id="wrap">

        <!-- 로그인 UI -->
        <Login
            :닉네임인풋사라짐="닉네임인풋사라짐"
            @인사말="닉네임경고"
            @닉네임변경="닉네임추가($event)"
        />

        <!-- 모달창 UI -->
        <Modal
            :삭제인덱스="삭제인덱스"
            @모달창닫아줘="모달창닫기"
            @삭제해줘="삭제확인버튼(삭제인덱스)"
            @리셋해줘="리셋확인버튼"
        />

        <!-- 숨김바 -->
        <Sidebar
            :닉네임인풋="닉네임인풋"
            :닉네임인풋사라짐="닉네임인풋사라짐"
            :인사말시작="인사말시작"
            :시계사라짐="시계사라짐"
            :할일알림="할일알림"
            :할일="할일"
            :할일스위치="할일스위치"
            :라인쓰루="라인쓰루"
            @할일삭제="할일삭제버튼($event)"
            @초기화="모달창열기"
            @정렬="역순정렬"
        />

        <!-- 다크모드 스위치 -->
        <DarkMode />

        <!-- 메모 보드 -->
        <Memo
            :닉네임인풋사라짐="닉네임인풋사라짐"
            :메모="메모"
            :할일="할일"
            @메모입력="메모인풋 = $event"
            @메모추가="메모추가"
            @할일="할일추가"
            @할일삭제="할일삭제버튼($event)"
            @수정="수정($event)"
            @메모삭제="
                모달창열기($event);
                삭제인덱스 = $event"
        />

    </div>
</template>
<script>
// # Import 구역
import Sidebar from "./Sidebar.vue";
import Modal from "./Modal.vue";
import DarkMode from "./DarkMode.vue";
import Login from "./Login.vue";
import Memo from "./Memo.vue";

// # export 구역
export default {
    name: "Main",
    components: {
        Sidebar,
        Modal,
        DarkMode,
        Login,
        Memo,
    },

    data() {  /* 데이터 시작돼요 */
        return {
            닉네임인풋: "",
            닉네임인풋사라짐: false,
            인사말시작: false,
            메모인풋: "",
            메모: [],
            할일: ['클릭하면 줄이 그어져요', '브라우저를 끄거나 새로고침 해도', '내용이 유지됩니다', '삭제는 숫자버튼 클릭'],
            로컬저장소: [],
            할일저장소: [],
            삭제인덱스: null,
            할일알림: false,
            할일스위치: [0, 0, 0, 0],
            라인쓰루: [],
            시계사라짐: false,
        };
    } /* 데이터 끝나요 */,

    methods: {  /* 메쏘드 시작돼요 */
        // # 버튼 함수
        닉네임추가(e) {
            this.닉네임인풋 = e;
            localStorage.setItem("name", this.닉네임인풋);
        },
        닉네임경고() {
            if (this.닉네임인풋 !== "") {
                this.닉네임인풋사라짐 = true;
                this.인사말시작 = true;
            } else {
                alert("👾🤖👾🤖👾🤖👾🤖👾🤖👾🤖👾🤖👾🤖👾💩🤖");
            }
        },
        메모추가() {
            if (this.메모인풋 !== "") {
                this.메모.push(this.메모인풋);
                this.메모인풋 = "";
                this.메모스토리지저장();
            } else {
                alert("글써 짜쉭아");
            }
        },
        할일추가() {
            if (this.메모인풋 !== "") {
                this.할일.push(this.메모인풋);
                this.할일스위치.push(0);
                this.라인쓰루.push("none");
                this.할일알림 = true;
                this.메모인풋 = "";
                this.투두스토리지저장();
            } else {
                alert("글 남겨");
            }
        },
        삭제확인버튼(i) {
            this.메모.splice(i, 1);
            localStorage.setItem("memo", JSON.stringify(this.메모));
            document.querySelector("#send").disabled = true;
            this.모달창닫기();
        },
        할일삭제버튼(굳) {
            this.할일.splice(굳, 1);
            this.할일스위치.splice(굳, 1);
            this.라인쓰루.splice(굳, 1);
            localStorage.setItem("todo", JSON.stringify(this.할일));
            localStorage.setItem("todoSwitch", JSON.stringify(this.할일스위치));
            localStorage.setItem("lineThrough", JSON.stringify(this.라인쓰루));
        },
        리셋확인버튼() {
            this.모달창닫기();
            this.메모 = [];
            this.할일 = [];
            this.할일스위치 = [];
            this.라인쓰루 = [];
            this.닉네임인풋 = "";
            this.인사말시작 = false,
            this.시계사라짐 = false,
            this.닉네임인풋사라짐 = false,
            this.스토리지리셋();
            document.querySelector(".square").classList.remove("square-hide");
        },
        수정(i) {
            var 수정인풋 = document.querySelectorAll("textarea")[i].value;
            this.메모.splice(i, 1, 수정인풋);
            localStorage.setItem("memo", JSON.stringify(this.메모));
        },

        // # 모달창 함수
        모달창열기() {
            document.querySelector(".black-bg").classList.add("modal-show");
        },
        모달창닫기() {
            document.querySelector(".black-bg").classList.remove("modal-show");
            setTimeout(() => {
                this.삭제인덱스 = null;
            }, 400);
        },

        // # 필터 함수
        역순정렬() {
            this.메모.reverse();
            this.메모스토리지저장();
        },

        // # 로컬스토리지 함수
        메모스토리지저장() {
            var 임시저장소 = JSON.stringify(this.메모);
            localStorage.setItem("memo", 임시저장소);
        },
        투두스토리지저장() {
            localStorage.setItem("todo", JSON.stringify(this.할일));
            localStorage.setItem("todoSwitch", JSON.stringify(this.할일스위치));
        },
        스토리지리셋() {
            localStorage.clear();
        },
    } /* 메쏘드 끝나요 */,

    mounted() {  /* 마운티드 시작돼요 */
        // 재접할 때마다 로컬스트리지에 남은 데이터를 내 데이터 통으로 가져옴 (일종의 동기화)
        if (typeof localStorage.name !== "undefined") {
            this.닉네임인풋사라짐 = true;
            this.인사말시작 = true;
            this.닉네임인풋 = localStorage.getItem("name");
        }
        if (typeof localStorage.memo !== "undefined") {
            this.메모 = JSON.parse(localStorage.getItem("memo"));
        }
        if (typeof localStorage.todo !== "undefined") {
            this.할일 = JSON.parse(localStorage.getItem("todo"));
            this.할일스위치 = JSON.parse(localStorage.getItem("todoSwitch"));
        }
        if (typeof localStorage.lineThrough !== "undefined") {
            this.라인쓰루 = JSON.parse(localStorage.getItem("lineThrough"));
        }
    } /* 마운티드 끝나요 */,

    watch: {  /* 왓치 시작돼요 */
        닉네임인풋사라짐() {
            if (this.닉네임인풋사라짐 == true) {
                setTimeout(() => {
                    this.인사말시작 = false;
                }, 2200);
                setTimeout(() => {
                    this.시계사라짐 = true;
                }, 1500);
            }
        },
        할일알림() {
            if (this.할일알림 == true) {
                setTimeout(() => {
                    this.할일알림 = false;
                }, 3000);
            }
        },
    } /* 왓치 끝나요 */,
};
</script>
<style>@import url('../css/main.css');</style>