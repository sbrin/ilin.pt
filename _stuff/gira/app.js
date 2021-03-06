const GIRA_URL = 'https://emel.city-platform.com/maps/wfs?SERVICE=wfs&REQUEST=GetFeature&VERSION=2.0.0&typeNames=emel_gira_stations&srsName=EPSG:4326&outputFormat=application/json&COUNT=50&cql_filter=DWITHIN%28geom%2C%20POLYGON%28%2838.764775036023224%20-9.111082224423475%2C%2038.76536703602322%20-9.111082224423475%2C%2038.76536703602322%20-9.110490224423474%2C%2038.764775036023224%20-9.110490224423474%2C%2038.764775036023224%20-9.111082224423475%29%29%2C%200%2C%20meters%20%20%29';
const INTERVAL = 30000;

Vue.createApp({
    template: `
        <div>
            <span @click="toggleAlarm" class="gira-button" title="Toggle alarm"> {{ alarm ? "🔔" : "🔕" }} </span>
        </div>
        <div v-show="alarm">
            <h1>I need <input class="gira-input-number" type="number" v-model="min_bikes"/> bike(s)</h1>
        </div>
        <h1>Available: {{ bikes }}</h1>
        <div>{{ isLoaded ? bikes ? bikesAvailable : "😵" : "Loading..." }}</div>
    `,
    data() {
        return {
            isLoaded: false,
            alarm: false,
            bikes: 0,
            min_bikes: 1,
            audio: undefined,
        }
    },
    computed: {
        bikesAvailable() {
            const arr = new Array(this.bikes).fill(" 🚲 ");
            return arr.join("");
        }
    },
    methods: {
        increment() {
            this.min_bikes += 1;
        },
        decrement() {
            if (this.min_bikes > 1) {
                this.min_bikes -= 1;
            }
        },
        toggleAlarm() {
            this.alarm = !this.alarm;
            this.playSound();
        },
        playSound() {
            if (this.alarm && this.bikes >= this.min_bikes) {
                this.audio.play();
            }
        },
        fetchGira() {
            fetch(GIRA_URL)
                .then((result) => result.json())
                .then((json) => {
                    const {
                        properties
                    } = json.features[0];
                    this.bikes = properties.num_bicicletas;
                    this.isLoaded = true;
                });
            this.playSound();
        }
    },
    mounted() {
        this.audio = new Audio("bell.m4a");
        this.fetchGira();
        setInterval(() => {
            this.fetchGira()
        }, INTERVAL);
    },
}).mount("#gira_app");