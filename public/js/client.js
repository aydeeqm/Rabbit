const socket = io();

socket.on('new image', function(data){
  data = JSON.parse(data);
  console.log(data);
  const container = document.querySelector('#imagenes');
  const source = document.querySelector('#image-template').innerHTML;

  const template = Handlebars.compile(source);

  container.innerHTML = template(data) + container.innerHTML;
});
