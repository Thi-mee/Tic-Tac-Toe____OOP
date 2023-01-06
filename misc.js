const mover = document.querySelector('.mover');

document.body.addEventListener('mousemove', (e) => {
  mover.style.left = e.pageX + 'px';
  mover.style.top = e.pageY + 'px';

})