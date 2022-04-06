<template>

    <div class="black-bg">
        <div class="white-bg">
            <h4 style="color:black">ㄹㅇ?</h4>
            <form>
                <button type="button" id="close"  @click="$emit('모달창닫아줘')">ㄴㄴ</button>
                <button type="submit" id="send" @click.prevent="$emit('삭제해줘')" v-if="삭제인덱스!==''">ㅇㅇ</button>
                <button type="submit" id="send" @click.prevent="$emit('리셋해줘')" v-if="삭제인덱스===''">ㅇㅇ</button>
            </form>
        </div>
    </div>

</template>

<script>
export default {
    // eslint-disable-next-line
    name: "Modal",
    props: {
        삭제인덱스: String,
    }
};
</script>
<style>
</style>