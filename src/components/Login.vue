<template>


    <div class="login-wrap"  v-if="닉네임인풋사라짐 == false"  >
        <form id="login-form">
            <input
                type="text"
                class="login-input"
                placeholder="Create ID"
                autofocus="true"
                spellcheck="false"
                :style="{backgroundColor: 배경색}"
                @input="$emit('닉네임변경', $event.target.value)"
                @focus="배경색 = 'transparent'"
                @blur="배경색 = 'transparent'"
            /><br>
            <input
                type="submit"
                class="login-btn btn"
                value="Join"
                @click.prevent="$emit('인사말')"
            />
        </form>
    </div>



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
<style></style>