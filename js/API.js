  class Api{
    async getData(){
        const total = 100;
        const url = `https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`;
        const res = await fetch(url);
        const data = await res.json()
        return data

    }
}
