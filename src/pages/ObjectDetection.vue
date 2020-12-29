<template>
    <section class="flex w-full">
        <div class="m-auto">
            <div class="mt-10">
                <h1 class="text-2xl my-4">Object Detection</h1>
                <div class="flex flex-wrap justify-center w-full">
                    <button v-if="!isStreaming" @click="openCamera" class="justify-center my-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
                        Open Camera
                    </button>
                    <div v-else>
                        <button @click="stopStreaming" class="justify-center my-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
                            Stop Streaming
                        </button>

                        <button @click="snapShot" class="justify-center mx-2 my-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
                            Take picture
                        </button>
                    </div>
                    
                </div>
                <div class="flex flex-wrap justify-center w-full">
                    <video ref="videoRef" autoplay="true" width="200"></video>
                </div>
                <div class="flex flex-wrap justify-center">
                    
                    <img
                        ref = "imgRef"
                        src="https://images.unsplash.com/photo-1550355291-bbee04a92027?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80" 
                        width="200" 
                        crossorigin="anonymous"
                    />                    
                </div>
                <div class="flex flex-wrap justify-center w-full">
                    <button @click="detectObject" class="my-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
                        <span v-if="isLoading">
                            Detecting...
                        </span>
                        <span v-else>
                            Detect Object
                        </span>
                        
                    </button>
                </div>
                <div v-if="result.length > 0" class="w-full text-center">
                    <div v-if="result.value == 'NOT FOUND'">
                        <p>NOT FOUND</p>
                    </div>
                    <div v-else>
                        <p>{{result[0].class}}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");

export default {
    setup() {
        const imgRef = ref('');
        const result = ref([]);
        const videoRef = ref('');
        const isStreaming = ref(false);
        const isLoading = ref(false);

        async function detectObject() {
            console.log("herer");
            isLoading.value = true;
            const img = imgRef.value;
            const model = await cocoSsd.load();
            const predictions = await model.detect(img);
            console.log(predictions.length);
            if (predictions.length==0) {
                console.log("herere");
                result.value = "NOT FOUND";
            } else {
                result.value = predictions;
            }
            console.log("Predictions: ");
            console.log(result.value);
            
            isLoading.value = false;
        }

        async function openCamera() {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cams = devices.filter((device => device.kind == "videoinput"));
            const camID = cams[0].deviceId;
            if(navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:camID}}}).then(stream => {
                    this.isStreaming = true;
                    videoRef.value.srcObject = stream;
                })
            }
        }

        function stopStreaming() {
            const stream = videoRef.value.srcObject;
            const tracks = stream.getTracks();
            tracks.map((track) => track.stop());
            isStreaming.value = false;
        }

        function snapShot() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoRef.value, 0, 0, 200, 200);
            const data = canvas.toDataURL("image/png");
            imgRef.value.setAttribute("src", data);
        }

        return {
            imgRef,
            result,
            detectObject,
            isLoading,
            openCamera,
            videoRef,
            isStreaming,
            stopStreaming,
            snapShot
        };

    }
    

}
</script>

<style>

</style>