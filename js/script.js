// Ambil elemen form dan input
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const alertBox = document.getElementById('alertBox');

// Fungsi validasi email dengan regex
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Fungsi tampilkan alert Bootstrap
function showAlert(message, type = 'success') {
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

// Fungsi reset error
function resetErrors() {
  emailInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');
  emailError.textContent = '';
  passwordError.textContent = '';
  alertBox.innerHTML = '';
}

// Event listener submit form
form.addEventListener('submit', function(e) {
  e.preventDefault(); // mencegah form diproses secara default
  resetErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  let isValid = true;

  // Validasi email
  if (email === '') {
    emailInput.classList.add('is-invalid');
    emailError.textContent = 'Email tidak boleh kosong.';
    isValid = false;
  } else if (!isValidEmail(email)) {
    emailInput.classList.add('is-invalid');
    emailError.textContent = 'Format email tidak valid.';
    isValid = false;
  }

  // Validasi password
  if (password === '') {
    passwordInput.classList.add('is-invalid');
    passwordError.textContent = 'Password tidak boleh kosong.';
    isValid = false;
  } else if (password.length < 8) {
    passwordInput.classList.add('is-invalid');
    passwordError.textContent = 'Password minimal 8 karakter.';
    isValid = false;
  }

  // Jika valid, tampilkan pesan sukses
  if (isValid) {
    showAlert(`✅ Login berhasil! Selamat datang, <strong>${email}</strong>.`, 'success');
    form.reset();
  } else {
    showAlert('❌ Gagal login. Periksa kembali input Anda.', 'danger');
  }
});

// Real-time validation saat user mengetik
emailInput.addEventListener('input', function() {
  if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
    emailInput.classList.add('is-invalid');
    emailError.textContent = 'Format email tidak valid.';
  } else {
    emailInput.classList.remove('is-invalid');
    emailError.textContent = '';
  }
});

passwordInput.addEventListener('input', function() {
  if (passwordInput.value.trim() !== '' && passwordInput.value.trim().length < 8) {
    passwordInput.classList.add('is-invalid');
    passwordError.textContent = 'Password minimal 8 karakter.';
  } else {
    passwordInput.classList.remove('is-invalid');
    passwordError.textContent = '';
  }
});