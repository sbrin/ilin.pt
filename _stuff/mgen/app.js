const API_KEY = 'AIzaSyDdAvWkT3pmqkFhbb6Cte4jx0DZfRzQfNY';
let googleMarkers = [];

function prepareMarker(icon) {
    return (item) => ({
        position: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
        },
        title: item.name,
        label: {
            text: icon,
            fontSize: '18px',
        },
        dataRecords: {
            name: item.name,
            providerType: item.providerType.description,
            city: item.city,
            address: item.address,
            phone: item.phone,
        },
    });
}

Vue.createApp({
    template: `
        <div v-if="!loaded">Loading...</div>
        <div v-show="loaded">
            <div class="mgen-filters">
                <div class="mgen-filter">
                    <label for="city">City: </label>
                    <select v-model="filter_city" @change="updateMarkers" id="city" class="mgen-filter__select">
                        <option v-for="(item, index) in cities" :value="item" :key="index">{{ item }}</option>
                    </select>
                </div>

                <div class="mgen-filter">
                    <input type="checkbox" id="clinics" @change="updateMarkers" v-model="filter_clinics">
                    <label class="mgen-filter__label" for="clinics">Clinics</label>
                </div>

                <div class="mgen-filter">
                    <input type="checkbox" id="wellBeing" @change="updateMarkers" v-model="filter_wellBeing">
                    <label class="mgen-filter__label" for="wellBeing">WellBeing</label>
                </div>

                <div class="mgen-filter">
                    <input type="checkbox" id="optics" @change="updateMarkers" v-model="filter_optics">
                    <label class="mgen-filter__label" for="optics">Optics</label>
                </div>

                <div class="mgen-filter">
                    <input type="checkbox" id="medics" @change="updateMarkers" v-model="filter_medics">
                    <label class="mgen-filter__label" for="medics">Medics</label>
                </div>
            </div>
            <div class="mgen-filters">
                <div class="mgen-filter">
                    <label for="providerType" v-show="providerType.length > 0">Provider Type: </label>
                    <select v-show="providerType.length > 1" v-model="filter_providerType" @change="updateMarkersProvider" id="providerType" class="mgen-filter__select">
                        <option value="">All</option>
                        <option v-for="(item, index) in providerType" :value="item" :key="index">{{ item }}</option>
                    </select>
                    <span v-show="providerType.length === 1">{{ providerType[0] }}</span>
                </div>
            </div>
            <div ref="map" class="mgen-map"></div>
            <div class="mgen-list">
                <ul>
                    <li v-for="(item, index) in markersFiltered" :key="index">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.dataRecords.city }} - {{ item.dataRecords.address }}</p>
                        <p><a :href="'tel:' + item.dataRecords.phone">{{ item.dataRecords.phone }}</a></p>
                    </li>
                </ul>
            </div>
        </div>
        `,
    data() {
        return {
            loaded: false,
            center: { lat: 38.72513113018396, lng: -9.139959957734094 },
            clinics: [],
            medics: [],
            wellBeing: [],
            optics: [],
            filter_city: 'Lisboa',
            filter_clinics: true,
            filter_wellBeing: false,
            filter_optics: false,
            filter_medics: false,
            filter_providerType: '',
        };
    },
    computed: {
        markers() {
            const result = [
                ...(this.filter_clinics ? this.clinics : []),
                ...(this.filter_optics ? this.optics : []),
                ...(this.filter_wellBeing ? this.wellBeing : []),
                ...(this.filter_medics ? this.medics : []),
            ].sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            return result;
        },
        markersFiltered() {
            return this.markers
                .filter((item) => item.dataRecords.city === this.filter_city)
                .filter((item) =>
                    this.filter_providerType ? item.dataRecords.providerType === this.filter_providerType : true
                );
        },
        cities() {
            return this.markers
                .map((item) => item.dataRecords.city)
                .filter((value, index, self) => {
                    return self.indexOf(value) === index;
                })
                .sort();
        },
        providerType() {
            return this.markers
                .map((item) => item.dataRecords.providerType)
                .filter((value, index, self) => {
                    return self.indexOf(value) === index;
                })
                .sort();
        },
    },
    methods: {
        resetMarkers() {
            for (let i = 0; i < googleMarkers.length; i++) {
                googleMarkers[i].setMap(null);
            }
            googleMarkers = [];
        },
        updateMarkers() {
            this.resetMarkers();
            this.filter_providerType = null;
            this.createMarkers();
        },
        updateMarkersProvider() {
            this.resetMarkers();
            this.createMarkers();
        },
        createMarkers() {
            this.markersFiltered.forEach((item) => {
                const marker = new google.maps.Marker({
                    map: this.map,
                    ...item,
                });
                marker.addListener('click', () => {
                    if (this.infowindow) {
                        this.infowindow.close();
                    }
                    this.infowindow = new google.maps.InfoWindow({
                        content: this.getContentString(marker.dataRecords),
                    });
                    this.infowindow.open({
                        anchor: marker,
                        map: this.map,
                        shouldFocus: false,
                    });
                });
                googleMarkers.push(marker);
            });
            if (this.markersFiltered[0]) this.map.setCenter(this.markersFiltered[0].position);
        },
        getContentString(data) {
            return `
                <h4>${data.name}</h4>
                <p>${data.city} - ${data.address}
                <br/>
                ☎️ <a href="tel: ${data.phone}">${data.phone}</a></p>
            `;
        },
    },
    mounted() {
        this.map = new google.maps.Map(this.$refs.map, {
            zoom: 12,
            center: this.center,
        });

        fetch('mgen.json')
            .then((result) => result.json())
            .then((json) => {
                this.clinics = json.clinics.clinics.map(prepareMarker('🏥'));
                this.optics = json.optics.clinics.map(prepareMarker('👓'));
                this.wellBeing = json.wellBeing.clinics.map(prepareMarker('💊'));
                this.medics = json.wellBeing.clinics.map(prepareMarker('🧑🏻‍⚕️'));
                this.loaded = true;
            })
            .then(this.createMarkers);
    },
}).mount('#mgen_app');
