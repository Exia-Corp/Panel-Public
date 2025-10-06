const params = new URLSearchParams(window.location.search);
const userId = params.get('user');

if (!userId) {
	document.body.innerHTML = `<h2>Utilisateur non identifié</h2>`;
} else {
	fetch(`http://localhost:3000/dashboard/auth/user/${userId}`)
		.then(res => res.json())
		.then(data => {
			document.getElementById('username').textContent = data.username;
            const avatarExtension = data.avatar.startsWith('a_') ? 'gif' : 'png';
			document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${data.discord_id}/${data.avatar}.${avatarExtension}`;
		})
		.catch(err => {
			console.error(err);
			document.body.innerHTML = '<h2>Erreur lors du chargement des ressources</h2>';
		});
}

const profilDiv = document.getElementsByClassName('user-menu')

profilDiv.addEventListener('')