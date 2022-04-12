<template >
    <div class="back" :class="{ curtain:!닉네임인풋사라짐 || 암전 }"></div>
    <div id="wrap">

        <!-- 모달창 UI -->
        <Modal
            :삭제인덱스="삭제인덱스"
            :모달띄움="모달띄움"
            @모달창닫아줘="모달창닫기"
            @삭제해줘="삭제확인버튼(삭제인덱스)"
            @리셋해줘="리셋확인버튼"
        />

        <!-- 로그인 UI -->
        <Login
            :닉네임인풋사라짐="닉네임인풋사라짐"
            @인사말="닉네임경고"
            @닉네임변경="닉네임추가($event)"
        />

        <!-- 숨김바 -->
        <Sidebar
            :닉네임인풋="닉네임인풋"
            :닉네임인풋사라짐="닉네임인풋사라짐"
            :인사말시작="인사말시작"
            :시계사라짐="시계사라짐"
            :할일알림="할일알림"
            :할일="할일"
            :암전="암전"
            @할일삭제="할일삭제버튼($event)"
            @초기화="모달창열기"
            @정렬="역순정렬"
        />

        <!-- 다크모드 스위치 -->
        <DarkMode />

        <!-- 메모 보드 -->
        <Memo
            :닉네임인풋사라짐="닉네임인풋사라짐"
            :암전="암전"
            :메모="메모"
            :할일="할일"
            @메모입력="메모인풋 = $event"
            @메모추가="메모추가"
            @할일="할일추가"
            @제목수정="제목수정($event)"
            @내용수정="내용수정($event)"
            @메모삭제="
                모달창열기($event);
                삭제인덱스 = $event
            "
            @암전="암전=true"
            @암전끄기="암전=false"
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
            메모: { 내용:['1. 여기를 눌러서 바로 수정하세요\n2. 자동으로 저장됩니다'], 제목: ['제목은 여기에'] },
            할일: {
                내용: [
                    "클릭하면 줄이 그어져요",
                    "브라우저를 닫아도 내용이 유지돼요",
                    "삭제는 숫자버튼을 누르세요",
                ],
                할일스위치: [0, 0, 0],
                라인쓰루: [],
            },
            삭제인덱스: null,
            할일알림: false,
            시계사라짐: false,
            암전: false,
            모달띄움: false,
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
                alert("👾🤖👾🤖👾🤖👾🤖👾💩🤖");
            }
        },
        메모추가() {
            if (this.메모인풋 !== "") {
                this.메모.내용.push(this.메모인풋);
                this.메모.제목.push('');
                this.메모인풋 = "";
                this.메모스토리지저장();
            } else {
                alert("글써 짜쉭아");
            }
        },
        할일추가() {
            if (this.메모인풋 !== "") {
                this.할일.내용.push(this.메모인풋);
                this.할일.할일스위치.push(0);
                this.할일.라인쓰루.push("none");
                this.할일알림 = true;
                this.메모인풋 = "";
                this.투두스토리지저장();
            } else {
                alert("글 남겨");
            }
        },
        삭제확인버튼(i) {
            this.메모.내용.splice(i, 1);
            this.메모.제목.splice(i, 1);
            localStorage.setItem("memo", JSON.stringify(this.메모.내용));
            localStorage.setItem("title", JSON.stringify(this.메모.제목));
            document.querySelector("#send").disabled = true;
            this.모달창닫기();
        },
        할일삭제버튼(굳) {
            this.할일.내용.splice(굳, 1);
            this.할일.할일스위치.splice(굳, 1);
            this.할일.라인쓰루.splice(굳, 1);
            localStorage.setItem("todo", JSON.stringify(this.할일.내용));
            localStorage.setItem("todoSwitch", JSON.stringify(this.할일.할일스위치));
            localStorage.setItem("lineThrough", JSON.stringify(this.할일.라인쓰루));
        },
        리셋확인버튼() {
            this.모달창닫기();
            this.메모.내용 = [];
            this.메모.제목 = [];
            this.할일.내용 = [];
            this.할일.할일스위치 = [];
            this.할일.라인쓰루 = [];
            this.닉네임인풋 = "";
            this.인사말시작 = false,
            this.시계사라짐 = false,
            this.닉네임인풋사라짐 = false,
            this.스토리지리셋();
        },
        제목수정(i) {
            // Fixme: 결과는 제대로 출력되나 event가 정확한 파라미터를 입력받은 것이 아니라 취소선이 그인다.
            // Fixme: 핸들러 안에 event를 넣을 수가 없다. 머리로는 되는데 여러 수 넣어봐도 자꾸 엉킴. 다수의 Payload를 싣는 내 과정에 문제가 있는 듯하다ㅜ 
            this.메모.제목.splice(i, 1, event.target.value);
            localStorage.setItem("title", JSON.stringify(this.메모.제목));
        },
        내용수정(수정될) {
            // Fixme: 미봉책 => Payload들을 오브젝트 하나로 묶어 값을 가져왔다. 잘 되고, 더 편한 것도 같지만...
            this.메모.내용.splice(수정될.인덱스, 1, 수정될.내용);
            localStorage.setItem("memo", JSON.stringify(this.메모.내용));
        },

        // # 모달창 함수
        모달창열기() {
            this.모달띄움 = true;
        },
        모달창닫기() {
            this.모달띄움 = false;
            setTimeout(() => {
                this.삭제인덱스 = null;
            }, 400);
        },

        // # 필터 함수
        역순정렬() {
            this.메모.내용.reverse();
            this.메모.제목.reverse();
            this.메모스토리지저장();
        },

        // # 로컬스토리지 함수
        메모스토리지저장() {
            var 임시저장소 = JSON.stringify(this.메모.내용);
            localStorage.setItem("memo", 임시저장소);
            localStorage.setItem("title", JSON.stringify(this.메모.제목));
        },
        투두스토리지저장() {
            localStorage.setItem("todo", JSON.stringify(this.할일.내용));
            localStorage.setItem("todoSwitch", JSON.stringify(this.할일.할일스위치));
        },
        스토리지리셋() {
            localStorage.clear();
        },
    } /* 메쏘드 끝나요 */,

    mounted() {  /* 마운티드 시작돼요 */
        // 재접할 때마다 로컬스트리지의 데이터를 내 데이터 통으로 가져옴 (동기화)
        if (typeof localStorage.name !== "undefined") {
            this.닉네임인풋사라짐 = true;
            this.인사말시작 = true;
            this.닉네임인풋 = localStorage.getItem("name");
        }
        if (typeof localStorage.memo !== "undefined") {
            this.메모.내용 = JSON.parse(localStorage.getItem("memo"));
        }
        if (typeof localStorage.title !== "undefined") {
            this.메모.제목 = JSON.parse(localStorage.getItem("title"));
        }
        if (typeof localStorage.todo !== "undefined") {
            this.할일.내용 = JSON.parse(localStorage.getItem("todo"));
            this.할일.할일스위치 = JSON.parse(localStorage.getItem("todoSwitch"));
        }
        if (typeof localStorage.lineThrough !== "undefined") {
            this.할일.라인쓰루 = JSON.parse(localStorage.getItem("lineThrough"));
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
<style>@import url("../assets/css/main.css");</style>