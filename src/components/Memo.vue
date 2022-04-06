<template>
    <div>
        <form id="memo-form" v-if="인사말시작 == true" >
            <!-- 메모에 들어갈 말 -->
            <input
                type="text"
                id="memo-input"
                placeholder="안 쓰면 안 넘어감"
                spellcheck="false"
                style="transition: all 0.5s"
                :value="인풋공백으로"
                @input="$emit('메모입력', $event.target.value)"
                @focus="애니메이션 = 'white'"
                @blur="애니메이션 = 'transparent'"
                :style="{ 'background-color': 애니메이션 }"
            />
            <br>
            <!-- 메모 제출 버튼 -->
            <input
                type="submit"
                id="memo-btn"
                value="post-it !!"
                @click.prevent="$emit('메모추가'), (인풋공백으로 = '')"
            />
            <!-- 할일 제출 버튼 -->
            <input
                type="submit"
                id="todo-btn"
                value="두잇!"
                @click.prevent="$emit('할일'), (인풋공백으로 = '')"
            />
            <!-- 역순 정렬 버튼 -->
            <input
                type="submit"
                id="sort-btn"
                :value="필터내용"
                @click.prevent="
                    $emit('정렬');
                    스위치 = !스위치;
                "
                v-if="스위치
                        == false
                        ? (필터내용 = '최신순')
                        : (필터내용 = '오래된순')
                "/>
            <!-- 초기화 버튼 -->
            <input
                type="submit"
                id="reset-btn"
                value="Reset"
                @click.prevent="$emit('초기화')"
            />
        </form>
    
        <!-- 할일들 넣는 줄 -->
<!--         <ul id="todo-board">
            <li v-for="(할일들, i) in 할일" :key="i"      >
                <span>{{ 할일들 }}</span>    
                <button @click="$emit('할일삭제', i)">{{i+1}}</button>
            </li>
        </ul> -->

        <!-- 메모들 넣는 프레임 -->
        <div id="memo-board">
            <div class="memo" v-for="(메모들, i) in 메모" :key="i">
                <div id="notepad-heading">
                    <!-- <textarea value="메모"> </textarea> -->
                    <form>
                        <input
                            type="submit"
                            id="del-btn"
                            value="x"
                            @click.prevent="$emit('메모삭제', i)"
                        />
                    </form>
                </div>
                <textarea :value="메모들"  spellcheck = "false" @keyup="$emit('수정', i)"> </textarea>
            </div>
        </div>

    </div>

</template>
<script>
export default {
    // eslint-disable-next-line
    name: "Memo",
    props: {
        인사말시작: Boolean,
        메모: Array,
        할일: Array,
    },

    data() {  /* 데이터 시작돼요 */
        return {
            체크확인: false,
            인풋공백으로: "",
            애니메이션: "",
            필터내용: "",
            스위치: false,
        };
    },   /* 데이터 끝나요 */

    methods: {  /* 메쏘드 시작돼요 */ 

    },   /* 메쏘드 끝나요 */
};


</script>
<style>
#notepad-heading {
    position: absolute;
    text-align: center;
    margin: auto;
    top: -24px;
    left: 0;
    right: 0;
    height: 24px;
    color: white;
	border-radius: 2px 2px 0 0;
	background-image: -webkit-linear-gradient(top, #3a3a3a, #31363a);
	box-shadow: inset 0 1px #000, 0 2px 1px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.5), 0 1px black;
}
#notepad-heading > h5 {
	font-size: 13px;
	color: white;
	text-align: center;
	text-shadow: 0 -1px rgba(0, 0, 0, 0.7);
	margin-top: 2px;
}
#memo-form {
    margin-top : 120px;
}
.cloak > h1 {
    margin: 13px;
}


</style>