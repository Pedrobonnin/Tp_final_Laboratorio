export const helphttp = () => {
    const customFetch = (endpoint, options) => {
      const defaultHeader = {//los datos vienen formato JSON
        accept: "application/json",
      };
      //cancela la petición en caso de error en el servidor
      const controller = new AbortController();
      options.signal = controller.signal;
  
      options.method = options.method || "GET"; //Se define GET 
      options.headers = options.headers
        ? { ...defaultHeader, ...options.headers }
        : defaultHeader;
  
      options.body = JSON.stringify(options.body) || false; //Se convierte a texto
      if (!options.body) delete options.body;   //si es falso y se elimina
  
      setTimeout(() => controller.abort(), 3000);//establece 3000 milisegundos de retraso para cancela la peticion  
 
  
      return fetch(endpoint, options)//si la promesa es rechazada retorna alerta de error
        .then((res) =>
          res.ok
            ? res.json()
            : Promise.reject({
                err: true,
                status: res.status || "00",
                statusText:res.statusText || "Ocurrió un error",
              })
        )
        .catch((err) => err);
    };
    //Se declara metodo GET 
    const get = (url, options = {}) => customFetch(url, options);

  //Se declara metodo POST
    const post = (url, options = {}) => {
      options.method = "POST";
      return customFetch(url, options);
    };
  //Se declara metodo PUT 
    const put = (url, options = {}) => {
      options.method = "PUT";
      return customFetch(url, options);
    };
  //Se declara metodo DELETE
    const del = (url, options = {}) => {
      options.method = "DELETE";
      return customFetch(url, options);
    };
  
    return {
      get,
      post,
      put,
      del,
    };
  };