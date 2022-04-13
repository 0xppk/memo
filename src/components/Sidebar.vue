<template>


    <div>
        <!-- 상단 숨김바 (시계 ) -->
        <div class="square"  v-if="닉네임인풋사라짐 == true" :class="{'square-hide': 시계사라짐}" >
            <div class="cloak">
                <h1 id="clock">{{Time}}</h1>
                <h2 id="greeting" v-if="인사말시작 == true">{{닉네임인풋}}님 ㅎㅇ </h2>
                <form>
                    <!-- 역순 정렬 버튼 -->
                    <input
                        type="submit"
                        class="sort-btn btn"
                        :value="필터내용"
                        @click.prevent="
                            $emit('정렬');
                            필터스위치 = !필터스위치;"
                        v-if="필터스위치
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
        <div class="right" v-if="닉네임인풋사라짐 == true " :class="{'right-opening': 애니메이션.첫진입, 'when-added': 할일알림, 'pin-fixed': 애니메이션.핀클릭, 'when-added-fixed': 애니메이션.핀클릭&&할일알림 }" >
            <div class="clear-list">
                <h5 id="notepad-heading" >
                    <img src="../assets/pin-green@2x.png" class="pin" :class="{'pin-click': 애니메이션.핀클릭 }" @click.prevent="애니메이션.핀클릭=!애니메이션.핀클릭">
                </h5>
                   <div v-for="(할일들, i) in 할일.내용"   :key="i">
                        <p>
                            <button @click.prevent="$emit('할일삭제', i)">{{i+1}}</button>
                            <span :class="{ lineThrough: 할일.할일스위치[i]}"  @click.prevent="취소선(i);" >{{할일들}}</span>
                        </p>
                   </div>
            </div>
        </div>
    
        <!-- 알림창 -->
        <div class="alert"  :class="{'alert-show': 할일알림}" >
            <p>
                The Item is added in<br>
                <span>{{할일.내용[this.할일.내용.length-1]}}</span>
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
        할일: Object,
        닉네임인풋사라짐: Boolean,
        시계사라짐: Boolean,
        암전: Boolean,
    },
    data(){
        return {
            Date : new Date(),
            필터스위치: false,
            필터내용: "",
            애니메이션: { 첫진입: false, 핀클릭: false }
        }
    },
    
    methods: {
        취소선(i){
            if(this.할일.할일스위치[i] == 0){
                this.할일.할일스위치[i] = 1;
                localStorage.setItem("todoSwitch", JSON.stringify(this.할일.할일스위치));
            } else if(this.할일.할일스위치[i]==1){
                this.할일.할일스위치[i] = 0;
                localStorage.setItem("todoSwitch", JSON.stringify(this.할일.할일스위치));
            }
        }
    },

    computed: {
        Time(){ 
            let 월 = String(this.Date.getMonth()+1);
            let 일 = String(this.Date.getHours())
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
                this.애니메이션.첫진입=true;
                setInterval(()=>{
                    this.애니메이션.첫진입 = false;
                }, 1600);
            }
        }
    },

}



</script>
<style>

</style>