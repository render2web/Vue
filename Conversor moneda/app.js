new Vue({
    el: "#app",
    data: {
        monedas: {},
        cantidad: 0,
        from: 'EUR',
        to: 'USD',
        result: null
    },
    mounted (){
        this.getMonedas()
    },

    computed:{
        formatearMonedas(){
            return Object.values(this.monedas);
        },

        calcularResultado(){
            return (Number(this.cantidad) * this.result).toFixed(3);
        },
        deshabilitado(){
            return this.cantidad === 0 || !this.cantidad;
        }
    },
    methods:{
        getMonedas(){
            const monedas = localStorage.getItem("monedas");

            if(monedas){
                this.monedas = JSON.parse(monedas);

                return;
            }
            axios.get("https://free.currencyconverterapi.com/api/v6/currencies?apiKey=sample-api-key")
            .then(response => {
                this.monedas = response.data.results;
                localStorage.setItem('monedas', JSON.stringify(response.data.results));
                console.log(response);
            });
        },

        convertirMoneda(){

            const busqueda = `${this.from}_${this.to}`;
            axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${busqueda}&apiKey=0f7f99acd78ed6777f5a`) 
            
          
            .then((response) => {
                console.log(response)
                this.result = response.data.results[busqueda].val;
            })
        }


    }
})