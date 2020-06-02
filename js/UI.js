class UI {
    constructor() {
           //instanceando la api
           this.api = new Api();

           //creando markers con el constructor Layer Group 
           this.markers = new L.LayerGroup();

         // Iniciar el mapa apenas se instance la clase UI
         this.mapa = this.inicializarMapa();
      
    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }
    mostrarEstablecimientos(){
        this.api.getData() 
            .then(res=>{
                const resultado = res.results;
                //funcion para mostrar pines
                this.mostrarPines(resultado)
            })
    }
    mostrarPines(datos){
        //cada que se llame este metodo los pines se limpiaran;
         this.markers.clearLayers();
        datos.forEach(dato => {
            const {latitude, longitude,calle,regular,premium} = dato;
            
            //creando el popup para el marker
            const opcpopup = L.popup().setContent(`
                <p>Se encuentra en la <b>Calle</b>: ${calle}</p>
                <p>Precio <b>Regular</b>: ${regular}</p>
                <p>Precio <b>Premium</b>: ${premium}</p>
            `)

            //agregar el pin
            const marker = new L.marker([
                Number(latitude),
                Number(longitude)
            ]).bindPopup(opcpopup)
            //agrega cada marker a el grupo de markers 
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa)
        

    }
    obtenerDatosFiltrar(datos){
        this.api.getData()
            .then(resultado=>{
            //llamando la api para obtener los datos
            const response = resultado.results;
            this.filtrarDatos(response, datos)
            })
    }
    //metodo para filtrar el resultado en base a los datos obtenenidos de la api
    filtrarDatos(resultado, busqueda){
        //usar .filter para filtrar los resultados
        const filtrado = resultado.filter((filtro)=>filtro.calle.indexOf(busqueda) !== -1)

        this.mostrarPines(filtrado)
    }

}