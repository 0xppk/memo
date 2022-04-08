<template >
    <div id="back"></div>
    <div id="hyezomemo">

        <!-- 로그인 커튼 -->


        <!-- 모달창 UI -->
        <Modal
            :삭제인덱스="삭제인덱스"
            @모달창닫아줘="모달창닫기"
            @삭제해줘="삭제확인버튼(삭제인덱스)"
            @리셋해줘="리셋확인버튼"
        />

        <!-- 숨김바 -->
        <Topbar :닉네임인풋="닉네임인풋" :인사말시작="인사말시작"  :할일알림="할일알림"  :할일="할일"  :할일스위치="할일스위치" :라인쓰루="라인쓰루" @할일삭제="할일삭제버튼($event)" />

        <!-- 다크모드 스위치 -->
        <DarkMode />

        <!-- 메모 보드 -->
        <Login
            :닉네임인풋사라짐="닉네임인풋사라짐"
            @인사말="인사말시작 = true; 닉네임인풋사라짐 = true;"
            @닉네임변경="닉네임추가($event)"
        />
        <Memo
            :인사말시작="인사말시작"
            :메모="메모"
            :할일="할일"
            @메모입력="메모인풋 = $event"
            @메모추가="메모추가"
            @할일="할일추가"
            @할일삭제="할일삭제버튼($event)"
            @수정="수정($event)"
            @메모삭제="모달창열기($event); 삭제인덱스 = $event;"
            @초기화="모달창열기"
            @정렬="역순정렬"
        />




    </div>
</template>
<script>
// # Import 구역
import Topbar from "./Topbar.vue";
import Modal from "./Modal.vue";
import DarkMode from "./DarkMode.vue";
import Login from "./Login.vue";
import Memo from "./Memo.vue";

// # export 구역
export default {
    // eslint-disable-next-line
    name: "MemoAll",
    components: {
        Topbar,
        Modal,
        DarkMode,
        Login,
        Memo,
    },

    data() {
        /* 데이터 시작돼요 */
        return {
            닉네임인풋: "손놈",
            닉네임인풋사라짐: false,
            인사말시작: false,
            메모인풋: "",
            메모: [],
            할일: [],
            로컬저장소: [],
            할일저장소: [],
            삭제인덱스: null,
            할일알림: false,
            할일스위치: [],
            라인쓰루: [],
        };
    } /* 데이터 끝나요 */,

    methods: {
        /* 메쏘드 시작돼요 */

        // # 버튼 함수
        닉네임추가(e) {
            this.닉네임인풋 = e;
            localStorage.setItem("name", this.닉네임인풋);
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
                this.라인쓰루.push('none');
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


    mounted() {   /* 마운티드 시작돼요 */
        // 재접할 때마다 로컬스트리지에 남은 데이터를 내 데이터 통으로 가져옴 (일종의 동기화)
        if (typeof localStorage.name !== "undefined" && localStorage.name.length) {
            this.닉네임인풋사라짐 = true;
            this.인사말시작 = true;
            this.닉네임인풋 = localStorage.getItem("name");
        }
        if (typeof localStorage.memo !== "undefined" && localStorage.memo.length) {
            this.메모 = JSON.parse(localStorage.getItem("memo"));
        }
        if (typeof localStorage.todo !== "undefined" && localStorage.todo.length && localStorage.todoSwitch) {
            this.할일 = JSON.parse(localStorage.getItem("todo"));
            this.할일스위치 = JSON.parse(localStorage.getItem("todoSwitch"));
            this.라인쓰루 = JSON.parse(localStorage.getItem("lineThrough"));
        }
    } /* 마운티드 끝나요 */,


    watch: {  
        인사말시작() {
            if (this.인사말시작 == true) {
                setTimeout(() => {
                    document.querySelector(".square").classList.add("square-hide");
                }, 1000);
                setTimeout(() => {
                    document.querySelector("#greeting").innerHTML = "";
                }, 2500);
            }
        },
        할일알림(){
            if(this.할일알림 == true){
                setTimeout(()=>{
                    this.할일알림=false;
                }, 3000)
            }
        },

    }
};




</script>
<style>
#hyezomemo {
    width: 100%;
    height: 100vh;
    padding-top: 30px;
    overflow: auto;
    text-align: center;
    position: fixed;
}
#back {
    position: fixed;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(../assets/Traub-64.jpg);
    filter:  brightness(85%);
    z-index: -1;
}

/* 메모 UI */


.memo {
    position: relative;
    height: 140px;
    margin: 50px 10px 10px;
    padding: 7px 10px 10px;
    background-color: rgba(255, 255, 255, 0.95);
}

textarea {
    color: rgb(21, 20, 20);
    border: none;
    background: transparent;
    padding: 0px;
    padding-right: 15px;
    margin: 0;
    margin-left: 20px;
    width: 100%;
    height: 100%;
    resize: none;
}

#memo-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 700px;
    margin: auto;
    justify-content: center;
}

#memo-btn {
    background: white;
    color: rgba(12, 12, 163, 0.842);
}

#memo-btn:hover {
    background-color: rgba(12, 12, 163, 0.842);
    color: white;
}

/* 메모, 닉네임 쓰는 인풋 */
.login,
#memo-input {
    border: hidden;
    border-bottom: 1px orange solid;
    height: 25px;
    margin-bottom: 15px;
    font-size: 17px;
    background-color: transparent;
}

#post-btn:hover {
    background-color: lightskyblue;
}

#reset-btn:hover {
    background-color: rgba(180, 32, 32, 0.954);
    color: whitesmoke;
}

/* type이 submit이거나 button인 버튼들 */
input:is([type="submit"], [type="button"]),
button {
    background-color: white;
    border-radius: 100px 0px 100px 80px;
    border: 1px solid black;
    color: black;
    margin: 2px;
    transition: all 0.3s;
}

/* input:is([type="submit"]:hover, [type="button"]):hover,
button:hover {
    background-color: black;
    color: white;
} */

/* 메모 스크롤바 셋팅 */
textarea:focus {
    outline: none;
}
textarea::-webkit-scrollbar,
#todo-board::-webkit-scrollbar {
    width: 3px;
}
textarea::-webkit-scrollbar-thumb,
#todo-board::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
}
textarea::-webkit-scrollbar-track,
#todo-board::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
}

/* 메모삭제 & 삭제취소 버튼 */
#del-btn {
    position: absolute;
    top: 1px;
    right: 0px;
}

#del-btn:hover {
    color: orange;
    background: black;
}

/* 리셋버튼 & 정렬버튼 */
#memo-form {
    position: relative;
}

#reset-btn {
    position: absolute;
    right: 45px;
}

#sort-btn {
    position: absolute;
    right: 88px;
}

/* 할일 */

#todo-btn:hover {
    background-color: rgb(17, 138, 51);
    color: white;
}


</style>