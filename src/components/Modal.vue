<template>

    <div class="black-bg">
        <div class="white-bg">
            <h4 style="color:black">ㄹㅇ?</h4>
            <form>
                <button type="button" id="close"  @click="$emit('모달창닫아줘')">ㄴㄴ</button>
                <button type="submit" id="send" @click.prevent="$emit('삭제해줘')" v-if="삭제인덱스!==null">ㅇㅇ</button>
                <button type="submit" id="send" @click.prevent="$emit('리셋해줘')" v-if="삭제인덱스===null">ㅇㅇ</button>
            </form>
        </div>
    </div>



</template>
<script>
// fixme: 모달창 어느 디바이스에서든 정중앙에 뜨게 CSS 수정 필요
export default {
    // eslint-disable-next-line
    name: "Modal",
    props: {
        삭제인덱스: Number,
    }
};
</script>
<style>

</style>