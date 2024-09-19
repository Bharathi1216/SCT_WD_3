const nextButton = document.getElementById('nextButton');

nextButton.addEventListener('click', () => {
    const team1 = document.getElementById('team1').value || 'Team 1';
    const team2 = document.getElementById('team2').value || 'Team 2';
    localStorage.setItem('team1', team1);
    localStorage.setItem('team2', team2);
    window.location.href = 'game.html';
});
