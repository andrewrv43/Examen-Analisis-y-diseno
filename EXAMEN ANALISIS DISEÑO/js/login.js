var current = null;
document.querySelector('#email').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: 0,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
document.querySelector('#password').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -336,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
document.querySelector('#submit').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -730,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '530 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});

//LOGICA DEL LOGIN

async function realizarLogin() {
  const correo = document.querySelector('[name="correo"]').value;
  const password = document.querySelector('[name="password"]').value;

  try {
      const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ correo, password })
      });

      if (!response.ok) {
          throw new Error('Error en el inicio de sesión');
      }

      const user = await response.json();
      sessionStorage.setItem('token', user.token);
      sessionStorage.setItem('permiso', user.permiso); 
      if (user.permiso === '1') {
          window.location.href = 'usuarios.html';
      } else if (user.permiso === '2') {
          window.location.href = 'productos.html'; 
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error en el inicio de sesión');
  }
}


