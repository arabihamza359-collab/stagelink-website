// ===== StageLink Dashboard JS =====
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('stagelink_user') || '{}');
  const type = user.type || 'etudiant';
  const name = user.fname || 'Utilisateur';

  // Greeting
  document.getElementById('dashGreeting').textContent = `Bienvenue, ${name} 👋`;

  // Adapt dashboard based on user type
  if (type === 'entreprise') {
    document.getElementById('dashSub').textContent = 'Gérez vos offres de stage et trouvez les meilleurs talents.';
    document.getElementById('navAction').textContent = 'Publier une offre';
    document.getElementById('navDocs').textContent = 'Candidatures reçues';
    document.getElementById('stat1Label').textContent = 'Offres publiées';
    document.getElementById('stat1Value').textContent = '5';
    document.getElementById('stat2Label').textContent = 'Candidatures reçues';
    document.getElementById('stat2Value').textContent = '34';
    document.getElementById('stat3Label').textContent = 'Entretiens planifiés';
    document.getElementById('stat3Value').textContent = '8';
    document.getElementById('stat4Label').textContent = 'Taux de réponse';
    document.getElementById('stat4Value').textContent = '92%';
    document.getElementById('listTitle').textContent = 'Dernières candidatures';
  } else if (type === 'universite') {
    document.getElementById('dashSub').textContent = 'Suivez le placement de vos étudiants.';
    document.getElementById('navAction').textContent = 'Mes étudiants';
    document.getElementById('navDocs').textContent = 'Conventions';
    document.getElementById('stat1Label').textContent = 'Étudiants suivis';
    document.getElementById('stat1Value').textContent = '245';
    document.getElementById('stat2Label').textContent = 'Stages en cours';
    document.getElementById('stat2Value').textContent = '67';
    document.getElementById('stat3Label').textContent = 'Taux de placement';
    document.getElementById('stat3Value').textContent = '78%';
    document.getElementById('stat4Label').textContent = 'Partenaires';
    document.getElementById('stat4Value').textContent = '32';
    document.getElementById('listTitle').textContent = 'Étudiants récents';
  }

  // Sidebar toggle for mobile
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  if (toggle) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Close sidebar on clicking outside (mobile)
  document.querySelector('.dash-main').addEventListener('click', () => {
    sidebar.classList.remove('open');
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('stagelink_user');
    window.location.href = 'index.html';
  });
});
