<template>
    <div  v-if="닉네임인풋사라짐 == true" >
        <form id="memo-form" :class="{curtain: 암전}"  >
            <!-- 메모에 들어갈 말 -->
            <input
                type="text"
                id="memo-input"
                placeholder="type here"
                spellcheck="false"
                autofocus="true"
                style="transition: all 0.5s"
                :style="{ 'background-color': 스타일.애니메이션 }"
                :value="인풋공백으로"
                @input="$emit('메모입력', $event.target.value)"
                @focus="스타일.애니메이션 = 'white'"
                @blur="스타일.애니메이션 = 'transparent'"
            />
            <br />
            <!-- 메모 제출 버튼 -->
            <input
                type="submit"
                class="memo-btn btn"
                value="memo"
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
        <div id="memo-board" >
            <div
                class="memo"
                v-for="(메모들, i) in 메모.내용"
                :key="i"
                :style="{ transform: 스타일.애니메이션2[i] }"
                @mouseenter="스타일.애니메이션2[i] = 'scale(1.1)'"
                @mouseleave="스타일.애니메이션2[i] = 'none'"
            >
                <div id="notepad-heading">
                    <textarea
                        class="memo-title"
                        spellcheck="false"
                        :value="메모.제목[i]"
                        :maxlength="메모.제목글자수제한[i]"
                        @keyup="$emit('제목수정', i, $event.target.value)"
                        @focus="$emit('암전')"
                        @blur="$emit('암전끄기')"    
                    ></textarea>
                    <form>
                        <input
                            type="submit"
                            class="del-btn"
                            value="x"
                            @click.prevent="$emit('메모삭제', i)"
                        />
                    </form>
                </div>
                <textarea
                    class="memo-content"
                    spellcheck="false"
                    :value="메모들"
                    @input="$emit('내용수정', { 인덱스: i, 내용: $event.target.value })"
                    @focus="$emit('암전')"
                    @blur="$emit('암전끄기')"
                >
                </textarea>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Memo",
    props: {
        닉네임인풋사라짐: Boolean,
        암전: Boolean,
        메모: Object,
    },
    data() {
        /* 데이터 시작돼요 */
        return {
            체크확인: false,
            인풋공백으로: "",
            스타일: { 애니메이션: "", 애니메이션2: [] },
        };
    } /* 데이터 끝나요 */,

};
</script>
<style></style>