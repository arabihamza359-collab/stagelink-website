// ===== StageLink Registration JS =====
document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  let selectedType = '';
  let selectedSectors = [];

  const steps = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3')];
  const progressSteps = [document.getElementById('ps1'), document.getElementById('ps2'), document.getElementById('ps3')];
  const progressLines = [document.getElementById('pl1'), document.getElementById('pl2')];

  // --- Type Card Selection ---
  document.querySelectorAll('.type-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedType = card.dataset.type;
      document.getElementById('next1').disabled = false;
    });
  });

  // --- Sector Chip Selection ---
  document.querySelectorAll('#sectors .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const val = chip.dataset.val;
      if (selectedSectors.includes(val)) {
        selectedSectors = selectedSectors.filter(s => s !== val);
      } else {
        selectedSectors.push(val);
      }
    });
  });

  function goToStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    steps[step - 1].classList.add('active');
    progressSteps.forEach((ps, i) => {
      ps.classList.remove('active', 'done');
      if (i + 1 < step) ps.classList.add('done');
      else if (i + 1 === step) ps.classList.add('active');
    });
    progressLines.forEach((pl, i) => {
      pl.classList.toggle('active', i + 1 < step);
    });
    currentStep = step;
  }

  // --- Navigation ---
  document.getElementById('next1').addEventListener('click', () => goToStep(2));
  document.getElementById('next2').addEventListener('click', () => {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!fname || !email) {
      alert('Veuillez remplir au moins le prénom et l\'email.');
      return;
    }
    goToStep(3);
  });
  document.getElementById('back2').addEventListener('click', () => goToStep(1));
  document.getElementById('back3').addEventListener('click', () => goToStep(2));

  // --- Submit ---
  document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    
    // Extract data from form
    const userData = {
      type: selectedType,
      fname: document.getElementById('fname').value.trim(),
      lname: document.getElementById('lname').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      city: document.getElementById('city').value,
      sectors: selectedSectors,
      duration: document.getElementById('duration').value,
      start: document.getElementById('start').value
    };

    // --- Submit to Backend ---
    const submitBtn = document.querySelector('.btn-primary[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Inscription en cours...';

    const registrationData = {
      email: userData.email,
      password: 'password123', // Default password for now
      role: userData.type,
      first_name: userData.fname,
      last_name: userData.lname,
      phone: userData.phone,
      city: userData.city,
      education_level: userData.duration,
      field_of_study: userData.sectors.join(', ')
    };

    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        localStorage.setItem('stagelink_token', data.data.token);
        localStorage.setItem('stagelink_user', JSON.stringify(data.data.user));
        
        alert('Inscription réussie ! Redirection vers votre tableau de bord...');
        window.location.href = 'dashboard.html';
      } else {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Erreur: ' + error.message);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
  });
});
