<template >
    <div id="hyezomemo">
        
        <!-- 모달창 UI -->
        <Modal
            :삭제인덱스="삭제인덱스"
            @모달창닫아줘="모달창닫기"
            @삭제해줘="삭제확인버튼(삭제인덱스)"
            @리셋해줘="리셋확인버튼"
        />

        <!-- 숨김바 -->
        <Topbar :닉네임인풋="닉네임인풋" :인사말시작="인사말시작"  :할일알림="할일알림"  :할일="할일"  :할일체크="할일체크"  @할일삭제="할일삭제버튼(i)" />

        <!-- 다크모드 스위치 -->
        <DarkMode />

        <!-- 컴퍼넌트들 -->
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
            @할일삭제="할일삭제버튼(i)"
            @수정="수정($event)"
            @메모삭제="모달창열기($event); 삭제인덱스 = $event;"
            @초기화="모달창열기"
            @정렬="역순정렬"
        />




    </div>
</template>
<script>
// Todo      7) 그리드 레이아웃 말고,,, 모바일     
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
            메모: [
                "자고로 메모는 바로바로 수정되고",
                "저장돼야 쓸모가 있는 것",
                "폰트는 강원교육체",
            ],
            할일: [],
            수정인풋: "",
            로컬저장소: [],
            할일저장소: [],
            삭제인덱스: "",
            할일알림: false,
            할일체크: [],
            할일인덱스: [],
            index: 0,
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
                this.할일체크.push(0);
                this.할일인덱스.push(this.index);
                this.index++;
                this.할일알림 = true;
                this.메모인풋 = "";
                this.투두스토리지저장();
                // 취소선 기능 추가중..
            } else {
                alert("글 남겨");
            }
        },
        삭제확인버튼(i) {
            this.메모.splice(i, 1);
            var 임시저장소 = JSON.stringify(this.메모);
            localStorage.setItem("memo", 임시저장소);
            document.querySelector("#send").disabled = true;
            this.모달창닫기();
        },
        할일삭제버튼(굳) {
            this.할일.splice(굳, 1);
            this.할일체크.splice(굳, 1);
            var 임시저장소 = JSON.stringify(this.할일);
            localStorage.setItem("todo", 임시저장소);
            localStorage.setItem("todoSwitch", JSON.stringify(this.할일체크));
        },
        리셋확인버튼() {
            this.모달창닫기();
            this.메모 = [];
            this.할일 = [];
            this.닉네임인풋 = "";
            this.인사말시작 = false,
            this.닉네임인풋사라짐 = false,
            this.스토리지리셋();
            document.querySelector(".square").classList.remove("square-hide");
        },
        수정(i) {
            this.수정인풋 = document.querySelectorAll("textarea")[i].value;
            this.메모.splice(i, 1, this.수정인풋);
            var 임시저장소 = JSON.stringify(this.메모);
            localStorage.setItem("memo", 임시저장소);
        },

        // # 모달창 함수
        모달창열기() {
            document.querySelector(".black-bg").classList.add("modal-show");
        },
        모달창닫기() {
            document.querySelector(".black-bg").classList.remove("modal-show");
            setTimeout(() => {
                this.삭제인덱스 = "";
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
            var 임시저장소 = JSON.stringify(this.할일);
            localStorage.setItem("todo", 임시저장소);
            localStorage.setItem("todoSwitch", JSON.stringify(this.할일체크));
        },
        스토리지리셋() {
            return localStorage.clear();
        },
    } /* 메쏘드 끝나요 */,


    mounted() {   /* 마운티드 시작돼요 */
        // 재접할 때마다 로컬스트리지 데이터를 내 데이터 통으로 가져옴 (... 일종의 동기화)
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
            this.할일체크 = JSON.parse(localStorage.getItem("todoSwitch"));
        }
        for ( let i=0; i<this.할일체크.length; i++ ){
            if(this.할일체크[i]==1 && this.할일체크.length){
                document.querySelector(`.todo-${i}`).style.textDecoration = 'line-through';
            }
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
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(../assets/Traub-64.jpg);
}

/* 메모 UI */
.clear-list {
    position: relative;
    height: 140px;
    margin: 50px 10px 10px;
    padding: 7px 10px 10px;
    background-color: white;
    background-image: -webkit-linear-gradient(#f6abca 1px, transparent 1px),
        -webkit-linear-gradient(#f6abca 1px, transparent 1px),
        -webkit-linear-gradient(#e8e8e8 1px, transparent 1px);
    background-image: -moz-linear-gradient(#f6abca 1px, transparent 1px),
        -moz-linear-gradient(#f6abca 1px, transparent 1px),
        -moz-linear-gradient(#e8e8e8 1px, transparent 1px);
    background-image: -o-linear-gradient(#f6abca 1px, transparent 1px),
        -o-linear-gradient(#f6abca 1px, transparent 1px),
        -o-linear-gradient(#e8e8e8 1px, transparent 1px);
    background-image: linear-gradient(#f6abca 1px, transparent 1px),
        linear-gradient(#f6abca 1px, transparent 1px),
        linear-gradient(#e8e8e8 1px, transparent 1px);
    background-size: 1px 1px, 1px 1px, 23px 23px;
    background-repeat: repeat-y, repeat-y, repeat;
    background-position: 22px 0, 24px 0, 0 50px;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15),
        0 0 4px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 4px rgba(0, 0, 0, 0.5);
}

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

input:is([type="submit"]:hover, [type="button"]):hover,
button:hover {
    background-color: black;
    color: white;
}

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
#todo-board {
    position: fixed;
    top: 35px;
    right: 35px;
    height: 130px;
    max-width: 200px;
    overflow-y: scroll;
}

#todo-board > li {
    color: black;
    margin-top: 10px;
    font-size: 13px;
    margin-right: 5px;
}

#todo-board button, #clear-list button {
    font-size: 14px;
    margin-left: 3px;
    margin-right: 5px;
    border: none;
    border-radius: 3px;
    background: transparent;
    color: rgb(223, 17, 76);
    position: relative;
    bottom: 0px
}

#todo-btn:hover {
    background-color: rgb(17, 138, 51);
    color: white;
}
</style>