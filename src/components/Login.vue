<template>
    <form id="login-form" v-if="닉네임인풋사라짐 == false ">
        <input
            type="text"
            class="login"
            placeholder="와츄얼 네임?"
            spellcheck="false"
            style="transition: all 0.5s"
            :style="{backgroundColor: 배경색}"
            @input="$emit('닉네임변경', $event.target.value)"
            @focus="배경색 = 'white'"
            @blur="배경색 = 'transparent'"
        />
        <input
            type="submit"
            id="post-btn"
            value="포스팃~"
            @click="$emit('인사말');"
        />
    </form>
</template>

<script>
export default {
    // eslint-disable-next-line
    name: "Login",
    props: {
        닉네임인풋사라짐 : Boolean,
    },
    data(){
        return {
            배경색: '',
        }
    },
};
</script>
<style>
#login-form {
    margin-top: 120px;
}
</style>