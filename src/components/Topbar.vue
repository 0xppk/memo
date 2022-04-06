<template>
<div>
    
        <!-- 상단 숨김바 (시계 ) -->
        <div class="square" >
            <div class="cloak">
                <h1 id="clock">{{Time}}</h1>
                <h1 id="greeting" v-if="인사말시작 == true">{{닉네임인풋}} ㅎㅇ</h1>
            </div>
        </div>
    
        <!-- 알림창 -->
        <div class="alert"  :class="{'alert-show': 할일알림}" >
            <p>
                안 하기만 해봐<br>
                <span>{{할일[this.할일.length-1]}}</span>
            </p>
        </div>
    
        <!-- 오른쪽 숨김바 -->
        <div class="right">
            <div id="clear-list" class="clear-list">
                <h5 id="notepad-heading" style="padding-top: 5px">Scheduler</h5>
                <p v-for="(할일들, i) in 할일"   :key="i">
                    <button @click.prevent="$emit('할일삭제', i)">{{i+1}}</button>
                    <span :class="`todo-${i}`"  @click.prevent="취소선(i);">{{할일들}}</span>
                </p>
            </div>
        </div>
    
        

</div>  
</template>
<script>
export default {
    // eslint-disable-next-line
    name: "Topbar",
    props: {
        인사말시작: Boolean,
        닉네임인풋: String,
        할일알림: Boolean,
        할일: Array,
        할일체크: Array,
    },
    data(){
        return {
            Date : new Date(),
        }
    },

    methods: {
        취소선(i){
            if(this.할일체크[i] == 0){
                document.querySelector(`.todo-${i}`).style.textDecoration = 'line-through';
                this.할일체크[i] = 1;
                localStorage.setItem("todoSwitch", JSON.stringify(this.할일체크));
            } else if(this.할일체크[i]==1){
                document.querySelector(`.todo-${i}`).style.textDecoration = 'none';
                this.할일체크[i] = 0;
                localStorage.setItem("todoSwitch", JSON.stringify(this.할일체크));
            }
        }
    },

    watch:{

    },

    computed: {
        Time(){ 
            let 시 = String(this.Date.getHours()).padStart(2, '0');
            let 분 = String(this.Date.getMinutes()).padStart(2, '0');
            let 초 = String(this.Date.getSeconds()).padStart(2, '0');
            return 시 +'시 '+ 분 +'분 '+ 초 +'초' 
        },
    },

    created(){
        setInterval(()=>{ 
            this.Date = new Date();
        }, 1000);
    },



}



</script>
<style>
/* 상단바 UI */
.square {
    height: 140px;
    max-width: 400px;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    margin: auto;
    padding-top: 10px;
    transition: all 0.7s;
}
.square-hide {
    transform: translateY(-110px);
}
.square-hide:hover {
    transform: translateY(0px);
}

/* 할일 알림창 */
.alert {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 230px;
    height: 80px;
    right: 7px;
    top: 50px;
    border-radius: 30px;
    margin: 35px;
    z-index: 10;
    background: white;
    transform: translateX(300px);
    transition: all 1s;
}
.alert-show {
    transform: translateX(0px);
}
.alert span {
    color : rgb(23, 23, 204);
    font-size: 18px;
}

/* 오른쪽 숨김바 */
.right {
    width: 240px;
    height: 110%;
    position: fixed;
    /* opacity: 0.3; */
    top: -30px;
    right: 0;
    z-index: 20;
    transform: translateX(215px);
    transition: all 0.6s ease-out;
}
.right:hover {
    transform: translateX(7px)
}
#clear-list {
    height: 1000px;
    padding-left: 0px;
    padding-top: 5px;
    margin-top: 200px
}
.clear-list > p {
    color:black;
    text-align:left;
    margin:0;
}
.clear-list > span {
    margin-left : 5px;
}
.line {
    text-decoration: line-through;
}

</style>