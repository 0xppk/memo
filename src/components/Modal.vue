<template>

    <div class="black-bg">
        <div class="white-bg">
            <h6 style="color:black" v-if="삭제인덱스!==null">지울까요?</h6>
            <h6 style="color:black" v-if="삭제인덱스===null">다 지움</h6>
            <form>
                <button type="button" id="close"  @click.prevent="$emit('모달창닫아줘')">아뇨</button>
                <button type="submit" id="send" @click.prevent="$emit('삭제해줘')" v-if="삭제인덱스!==null">네</button>
                <button type="submit" id="send" @click.prevent="$emit('리셋해줘')" v-if="삭제인덱스===null">네</button>
            </form>
        </div>
    </div>



</template>
<script>
export default {
    // eslint-disable-next-line
    name: "Modal",
    props: {
        삭제인덱스: Number,
    }
};
</script>
<style></style>