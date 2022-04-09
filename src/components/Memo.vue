<template>
<div>
        <form id="memo-form" v-if="닉네임인풋사라짐 == true" >
            <!-- 메모에 들어갈 말 -->
            <input
                type="text"
                id="memo-input"
                placeholder="type here"
                spellcheck="false"
                autofocus="true"
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
                class="memo-btn btn"
                value="post-it !!"
                @click.prevent="$emit('메모추가'), (인풋공백으로 = '')"
            />
            <!-- 할일 제출 버튼 -->
            <input
                type="submit"
                class="todo-btn btn"
                value="두잇!"
                @click.prevent="$emit('할일'), (인풋공백으로 = '')"
            />
        </form>


        <!-- 메모들 넣는 프레임 -->
        <div id="memo-board">
            <div class="memo" v-for="(메모들, i) in 메모" :key="i">
                <div id="notepad-heading">
                    <!-- <textarea value="메모"> </textarea> -->
                    <form>
                        <input
                            type="submit"
                            class="del-btn btn"
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
    name: "Memo",
    props: {
        닉네임인풋사라짐: Boolean,
        메모: Array,
        할일: Array,
    },

    data() {  /* 데이터 시작돼요 */
        return {
            체크확인: false,
            인풋공백으로: "",
            애니메이션: "",
        };
    },   /* 데이터 끝나요 */
};


</script>
<style></style>