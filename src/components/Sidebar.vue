<template>
    <div>
    
        <!-- 상단 숨김바 (시계 ) -->
        <div class="square"  v-if="닉네임인풋사라짐 == true" :class="{'square-hide': 시계사라짐}" >
            <div class="cloak">
                <h1 id="clock">{{Time}}</h1>
                <h2 id="greeting" v-if="인사말시작 == true">{{닉네임인풋 + ' ㅎㅇ'}} </h2>
                <form>
                    <!-- 역순 정렬 버튼 -->
                    <input
                        type="submit"
                        class="sort-btn btn"
                        :value="필터내용"
                        @click.prevent="
                            $emit('정렬');
                            스위치 = !스위치;"
                        v-if="스위치
                                == false
                                ? (필터내용 = '최신순')
                                : (필터내용 = '오래된순')
                    "/>
                    <!-- 초기화 버튼 -->
                    <input
                        type="submit"
                        class="reset-btn btn"
                        value="Reset"
                        @click.prevent="$emit('초기화')"
                    />
                </form>
            </div>
        </div>
    
        <!-- 오른쪽 숨김바 -->
        <div class="right" v-if="닉네임인풋사라짐 == true " :class="{'right-opening': 첫진입 } "  >
            <div class="clear-list">
                <h5 id="notepad-heading" style="padding-top: 5px">Scheduler</h5>
                   <div v-for="(할일들, i) in 할일"   :key="i">
                        <p>
                            <button @click.prevent="$emit('할일삭제', i)">{{i+1}}</button>
                            <span :ref="`todo-${i}`"  @click.prevent="취소선(i);" :style="{textDecoration:라인쓰루[i]}">{{할일들}}</span>
                        </p>
                   </div>
            </div>
        </div>
    
        <!-- 알림창 -->
        <div class="alert"  :class="{'alert-show': 할일알림}" >
            <p>
                안 하기만 해봐ㅎ<br>
                <span>{{할일[this.할일.length-1]}}</span>
            </p>
        </div>
    


    </div>  
</template>
<script>
export default {
    name: "Sidebar",
    props: {
        인사말시작: Boolean,
        닉네임인풋: String,
        할일알림: Boolean,
        할일: Array,
        할일스위치: Array,
        라인쓰루: Array,
        닉네임인풋사라짐: Boolean,
        시계사라짐: Boolean,
    },
    data(){
        return {
            Date : new Date(),
            첫진입 : false,
            필터내용: "",
            스위치: false,
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
    computed: {
        Time(){ 
            let 월 = String(this.Date.getMonth()+1);
            let 일 = String(this.Date.getHours()).padStart(2, '0');
            let 시 = String(this.Date.getHours()).padStart(2, '0');
            let 분 = String(this.Date.getMinutes()).padStart(2, '0');
            let 초 = String(this.Date.getSeconds()).padStart(2, '0');
            return 월 + '월 ' + 일 + '일 ' + 시 +':'+ 분
        },
    },
    created(){
        setInterval(()=>{ 
            this.Date = new Date();
        }, 1000);
    },
    watch: {
        닉네임인풋사라짐(){
            if(this.닉네임인풋사라짐==true){
                this.첫진입=true;
                setInterval(()=>{
                    this.첫진입 = false;
                }, 1500);
            }
        }
    },

}



</script>
<style>
.right-opening {
    transform: translateX(7px)
}
#greeting {
    margin: 5px;
}
</style>