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
                안 하기만 해봐ㅎ<br>
                <span>{{할일[this.할일.length-1]}}</span>
            </p>
        </div>
    
        <!-- 오른쪽 숨김바 -->
        <div class="right">
            <div class="clear-list">
                <h5 id="notepad-heading" style="padding-top: 5px">Scheduler</h5>
                   <div v-for="(할일들, i) in 할일"   :key="i">
                        <p>
                            <button @click.prevent="$emit('할일삭제', i)">{{i+1}}</button>
                            <span :ref="`todo-${i}`"  @click.prevent="취소선(i);" :style="{textDecoration:라인쓰루[i]}"    >{{할일들}}</span>
                        </p>
                   </div>
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
        할일스위치: Array,
        라인쓰루: Array,
    },
    data(){
        return {
            Date : new Date(),
        }
    },

    methods: {
        취소선(i){
            if(this.할일스위치[i] == 0){
                this.할일스위치[i] = 1;
                this.라인쓰루[i] = 'line-through'
                localStorage.setItem("todoSwitch", JSON.stringify(this.할일스위치));
                localStorage.setItem("lineThrough", JSON.stringify(this.라인쓰루));
            } else if(this.할일스위치[i]==1){
                this.할일스위치[i] = 0;
                this.라인쓰루[i] = 'none'
                localStorage.setItem("todoSwitch", JSON.stringify(this.할일스위치));
                localStorage.setItem("lineThrough", JSON.stringify(this.라인쓰루));
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
    top: 65px;
    border-radius: 30px;
    margin: 10px;
    z-index: 30;
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
    top: -30px;
    right: 0;
    z-index: 20;
    transform: translateX(210px);
    transition: all 0.6s ease-out;
}
.right:hover {
    transform: translateX(7px)
}
.clear-list p {
    color:black;
    margin:0 0 -1px 0;
    line-height: 1.7;
}
.clear-list span {
    position: relative;
    left: 30px;
    margin: -30px;
}
.clear-list button {
    position: relative;
    bottom: 0px;
    left : -5px;
    width: 25px;
    font-size: 14px;
    margin-left: 3px;
    border: none;
    border-radius: 3px;
    background: transparent;
    color: rgb(223, 17, 76);
}
.clear-list {
    height: 1000px;
    position: relative;
    padding-top: 5px;
    margin: 200px 10px 10px;
    text-align: left;
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

</style>