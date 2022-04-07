<template >

    <!-- 컴퍼넌트들 -->
    <router-view></router-view>


</template>
<script>
// # Import 구역
// import MemoAll from "./components/MemoAll.vue";

// # export 구역
export default {
    name: "App",
    components: {
        // MemoAll,    라우터로 연결해놔서 끔
    },

    data() {  /* 데이터 시작돼요 */
        return {
            
        };
    },  /* 데이터 끝나요 */



    methods: {  /* 메쏘드 시작돼요 */

    },  /* 메쏘드 끝나요 */



    computed: {
    
    },



    created() {
    
    },



    mounted(){  /* 마운티드 시작돼요 */
        
    }  /* 마운티드 끝나요 */

};



</script>
<style>
#app {
    width: 100%;
    height: 100vh;
    text-align: center;
}

/* 마우스 커서 */
html, body, textarea {
	cursor:url('./assets/cursor.png'),auto;
}
a:hover, button, input {
	cursor:url('./assets/cursor_hover.png'),auto;
}

/* 웹폰트 */
@font-face { 
    font-family: "GangwonEdu_OTFBoldA";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff")
        format("woff");
    font-weight: normal;
    font-style: normal;
}

/* 프리셋 */
* { box-sizing: border-box; }
body { margin: 0 }
h1 { text-shadow: 1px 1px 3px rgba(49, 33, 33, 0.575);}
ul { list-style-type: none; text-align: right; display: flex; flex-direction: column;  justify-content: right; }
h1, h2, h3, p, div, input, button, ul, li, textarea { font-family: "GangwonEdu_OTFBoldA"; }
p, textarea { line-height: 1.64; font-size: 14px; }
a:hover { outline: none; }
::selection { color: #fff; background: #000; }

/* 모달 배경 */
.black-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;  left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 5;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
}
.white-bg {
    width: 80%;
    max-width: 400px;
    max-height: 250px;
    background: white;
    border-radius: 10px;
    margin: 300px auto;
    padding: 20px;
    font-size: 30px;
}
.modal-show {
    visibility: visible;
    opacity: 1;
}

/* 모달 버튼 두개 */
#send, #close {
    background: black;
    color: white;
    border-radius: 14px;
    border: none;
    width: 65px;
    height: 45px;
    margin: 30px;
    font-size: 16px;
}
#send { 
    background: rgba(191, 20, 20, 0.916);
 }


</style>