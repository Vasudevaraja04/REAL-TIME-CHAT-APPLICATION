const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            ws: null,
            messages: [],
            newMessage: ""
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== "") {
                this.ws.send(this.newMessage);
                this.newMessage = ""; // Avoid duplicate messages
            }
        }
    },
    mounted() {
        this.ws = new WebSocket("ws://localhost:3000");

        this.ws.onmessage = async (event) => {
            let text = event.data;
            if (event.data instanceof Blob) {
                text = await event.data.text();
            }
            this.messages.push({ text, isSent: false });
        };
    }
});

app.mount("#app");
