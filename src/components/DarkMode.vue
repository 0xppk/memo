<template>
		<!-- # 다크모드 스위치 -->
		<div class="switch-container" >
			<div class="switch-bg">
				<div class="onoff-switch-bg">
                    <div style="height: 24px; width: 26px; position: relative; opacity: 1; pointer-events: none; transition: opacity 0.3s;">
                        <div class="icon">
                            <p>🌙</p>
                        </div>
                    </div>
                    <div style="height: 24px; width: 26px; position: absolute; opacity: 1; top: 0; right: 0; pointer-events: none; transition: opacity 0.3s;">
                        <div class="icon">
                            <p>☀️</p>
                        </div>
                    </div>
                </div>
                <div class="onoff-switch-handle">
                </div>
                <input type="checkbox" role="switch" id="normal-switch" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px;">
			</div>
		</div>




</template>
<script>
export default {
    name: "DarkMode",
    methods: {
        다크모드(){
            let count = 0;
            document.querySelector('.onoff-switch-handle').addEventListener('click', function(e){
                let 스위치 = e.currentTarget;
                count++;
                if ( count%2 == 1 ){
                    document.querySelector('.onoff-switch-handle').style.backgroundColor = 'black'
                    스위치.style.transform = 'translateX(25px)'
                    document.querySelector('body').classList.add('dark-mode')
                } else {
                    스위치.style.transform = 'translateX(1px)'
                    document.querySelector('body').classList.remove('dark-mode')
                }
            })
        }
    },

    mounted() {
        let count = 0;
        document.querySelector('.onoff-switch-handle').addEventListener('click', function(e){
            let 스위치 = e.currentTarget;
            count++;
            if ( count%2 == 1 ){
                스위치.style.transform = 'translateX(25px)'
                document.querySelector('body').classList.add('dark-mode')
            } else {
                스위치.style.transform = 'translateX(1px)'
                document.querySelector('body').classList.remove('dark-mode')
            }
        })
    },
};


</script>
<style>
.switch-bg {
    position: absolute;
    top: 20px;
    right: 40px;
    text-align: left;
    opacity: 1;
    direction: ltr;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    transition: opacity 0.3s;
    touch-action: none;
    z-index: 10; 
}

.onoff-switch-bg {
    height: 24px;
    width: 48px;
    position: relative;
    background-color: rgb(220, 223, 226);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    cursor: pointer;
    transition: background 0.3s;
}

.switch-container {
    text-align: center;
    color: #222;
    font-size: 12px;
    margin-bottom: 5px;
}

.onoff-switch-handle {
    height: 22px;
    width: 22px;
    background-color: white;
    display: inline-block;
    cursor: pointer;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    position: absolute;
    transform: translateX(1px);
    top: 1px;
    outline: 0px;
    border: 0px;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.15s;
}

.switch-container .icon {
    width: 24px;
    height: 24px;
    margin: 0 3px;
    padding: 2px;
}

.dark-mode {
    color: white;
    background-color: black;
}

.switch-bg p {
    margin: 0px;
    padding: 0 ;
}


</style>